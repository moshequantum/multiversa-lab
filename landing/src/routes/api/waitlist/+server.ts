import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createWaitlistBackend } from '$lib/server/waitlist-insforge';
import { isHoneypotFilled, validateWaitlistSubmission } from '$lib/domain/waitlist';

const MAX_BODY_BYTES = 4096;
const DEFAULT_INBOXES = ['hola@multiversa.group'];

function respond(payload: Record<string, unknown>, status: number, requestId: string) {
  return json(payload, {
    status,
    headers: {
      'cache-control': 'no-store',
      'x-request-id': requestId,
      vary: 'Origin'
    }
  });
}

function log(event: string, requestId: string, details: Record<string, unknown> = {}) {
  console.info(JSON.stringify({ event, requestId, ...details }));
}

export const POST: RequestHandler = async ({ request, url }) => {
  const requestId = crypto.randomUUID();
  const origin = request.headers.get('origin');

  if (!origin || origin !== url.origin) {
    log('lab.waitlist.rejected', requestId, { reason: 'origin' });
    return respond({ ok: false, error: 'Origen no autorizado.' }, 403, requestId);
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return respond({ ok: false, error: 'Content-Type no compatible.' }, 415, requestId);
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return respond({ ok: false, error: 'Solicitud demasiado grande.' }, 413, requestId);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return respond({ ok: false, error: 'Solicitud demasiado grande.' }, 413, requestId);
    }
    body = JSON.parse(raw);
  } catch {
    return respond({ ok: false, error: 'JSON inválido.' }, 400, requestId);
  }

  // Bots que completan campos invisibles reciben una respuesta neutra y no escriben datos.
  if (isHoneypotFilled(body)) {
    log('lab.waitlist.accepted', requestId, { outcome: 'honeypot' });
    return respond({ ok: true }, 202, requestId);
  }

  const validation = validateWaitlistSubmission(body);
  if (!validation.ok) {
    return respond({ ok: false, error: validation.error }, 400, requestId);
  }

  const baseUrl = env.INSFORGE_API_BASE_URL;
  const apiKey = env.INSFORGE_API_KEY;
  if (!baseUrl || !apiKey) {
    log('lab.waitlist.unavailable', requestId, { reason: 'backend_config' });
    return respond(
      { ok: false, error: 'Backend no disponible. Escríbenos a hola@multiversa.group.' },
      503,
      requestId
    );
  }

  const inboxes = (env.LAB_LEAD_INBOXES ?? '')
    .split(',')
    .map((inbox) => inbox.trim())
    .filter(Boolean);
  const backend = createWaitlistBackend({
    baseUrl,
    apiKey,
    inboxes: inboxes.length > 0 ? inboxes : DEFAULT_INBOXES
  });
  const lead = {
    ...validation.lead,
    source: 'lab.multiversa.group' as const,
    createdAt: new Date().toISOString()
  };

  try {
    await backend.save(lead);
  } catch {
    log('lab.waitlist.failed', requestId, { stage: 'storage' });
    return respond(
      { ok: false, error: 'No pudimos registrarte ahora. Escríbenos a hola@multiversa.group.' },
      502,
      requestId
    );
  }

  try {
    const failedNotifications = await backend.notify(lead);
    if (failedNotifications > 0) {
      log('lab.waitlist.notification_partial', requestId, { failedNotifications });
    }
  } catch {
    log('lab.waitlist.notification_failed', requestId);
  }

  log('lab.waitlist.saved', requestId, { interest: lead.interest });
  return respond({ ok: true }, 201, requestId);
};

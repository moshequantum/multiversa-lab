import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@insforge/sdk';

// ============================================================
// Server-side InsForge client using the admin/service API key.
// Runs ONLY in Vercel serverless functions — never in the browser.
//
// 🚨 NEVER hardcode any key here as a fallback. If the env vars are
//    missing, fail loudly. A broken endpoint is better than a leaked
//    key in source control.
// ============================================================

const baseUrl = env.INSFORGE_API_BASE_URL;
const apiKey = env.INSFORGE_API_KEY;

if (!baseUrl || !apiKey) {
  console.error(
    '[waitlist] Missing INSFORGE_API_BASE_URL or INSFORGE_API_KEY in environment. ' +
      'Set them in .env locally and in Vercel project settings.'
  );
}

const insforge =
  baseUrl && apiKey ? createClient({ baseUrl, anonKey: apiKey }) : null;

// Bandejas donde se capturan los leads. Todo registro notifica aquí, siempre.
const LEAD_INBOXES = ['multiversagroup@gmail.com', 'moshequantum@gmail.com'];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const VALID_PLANS = new Set([
  'Construir con Lab',
  'Explorar acompañamiento de Group'
]);

export const POST: RequestHandler = async ({ request }) => {
  if (!insforge) {
    return json(
      { ok: false, error: 'Backend no configurado. Avisanos por correo.' },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; plan_interest?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const plan = (body.plan_interest ?? '').trim();

  if (!name || name.length > 200) {
    return json({ ok: false, error: 'Nombre requerido.' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ ok: false, error: 'Email inválido.' }, { status: 400 });
  }
  if (!VALID_PLANS.has(plan)) {
    return json({ ok: false, error: 'Ruta de interés desconocida.' }, { status: 400 });
  }

  const { error } = await insforge.database.from('founders_waitlist').insert([
    {
      name,
      email,
      plan_interest: plan,
      source: 'lab.multiversa.group',
      created_at: new Date().toISOString()
    }
  ]);

  if (error) {
    console.error('[waitlist] InsForge insert failed', error);
    return json(
      {
        ok: false,
        error:
          'No pudimos registrarte ahora. Si persiste, escríbenos a hola@multiversa.group.'
      },
      { status: 500 }
    );
  }

  // Notificación interna (no bloqueante) — cada lead del lab también se captura.
  try {
    const html = `
      <div style="background:#0a0a0f;color:#fafce8;font-family:Arial,sans-serif;padding:28px">
        <div style="max-width:600px;margin:0 auto;background:#111118;border:1px solid #bdeb34;border-radius:14px;padding:28px">
          <h1 style="color:#bdeb34;font-size:20px;margin:0 0 16px">[LEAD · Lab] Nuevo registro</h1>
          <p style="margin:6px 0"><strong style="color:#bdeb34">Nombre:</strong> ${escapeHtml(name)}</p>
          <p style="margin:6px 0"><strong style="color:#bdeb34">Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:6px 0"><strong style="color:#bdeb34">Ruta de interés:</strong> ${escapeHtml(plan)}</p>
          <p style="margin:6px 0"><strong style="color:#bdeb34">Origen:</strong> lab.multiversa.group</p>
        </div>
      </div>`;
    const results = await Promise.allSettled(
      LEAD_INBOXES.map((inbox) =>
        insforge.emails.send({
          to: inbox,
          subject: `[LEAD · Lab] ${name}`,
          html,
          from: 'Multiversa Lab',
          replyTo: email
        })
      )
    );
    for (const r of results) {
      if (r.status === 'rejected') console.error('[waitlist] lab briefing rejected', r.reason);
      else if ((r.value as { error?: unknown })?.error) console.error('[waitlist] lab briefing failed', (r.value as { error?: unknown }).error);
    }
  } catch (emailError) {
    console.error('[waitlist] Non-blocking lab notification error', emailError);
  }

  return json({ ok: true });
};

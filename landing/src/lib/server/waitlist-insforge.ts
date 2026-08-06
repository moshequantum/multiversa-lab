import { createClient } from '@insforge/sdk';
import type { WaitlistLead } from '$lib/domain/waitlist';

export type WaitlistBackendConfig = {
  baseUrl: string;
  apiKey: string;
  inboxes: string[];
};

type StoredLead = WaitlistLead & {
  source: 'lab.multiversa.group';
  createdAt: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function createWaitlistBackend(config: WaitlistBackendConfig) {
  // @insforge/sdk 1.x accepts the server API key through `anonKey`.
  // This adapter is server-only; the key never crosses into the browser bundle.
  const client = createClient({ baseUrl: config.baseUrl, anonKey: config.apiKey });

  return {
    async save(lead: StoredLead): Promise<void> {
      const { error } = await client.database.from('founders_waitlist').insert([
        {
          name: lead.name,
          email: lead.email,
          plan_interest: lead.interest,
          source: lead.source,
          created_at: lead.createdAt
        }
      ]);

      if (error) throw new Error('WAITLIST_SAVE_FAILED');
    },

    async notify(lead: StoredLead): Promise<number> {
      const html = `
        <div style="background:#050505;color:#fafce8;font-family:Arial,sans-serif;padding:28px">
          <div style="max-width:600px;margin:0 auto;background:#121217;border:1px solid #bdeb34;border-radius:28px;padding:28px">
            <h1 style="color:#bdeb34;font-size:20px;margin:0 0 16px">[LEAD · Lab] Nuevo registro</h1>
            <p style="margin:6px 0"><strong style="color:#bdeb34">Nombre:</strong> ${escapeHtml(lead.name)}</p>
            <p style="margin:6px 0"><strong style="color:#bdeb34">Email:</strong> ${escapeHtml(lead.email)}</p>
            <p style="margin:6px 0"><strong style="color:#bdeb34">Área de interés:</strong> ${escapeHtml(lead.interest)}</p>
            <p style="margin:6px 0"><strong style="color:#bdeb34">Origen:</strong> ${lead.source}</p>
          </div>
        </div>`;

      const results = await Promise.allSettled(
        config.inboxes.map((inbox) =>
          client.emails.send({
            to: inbox,
            subject: `[LEAD · Lab] ${lead.name}`,
            html,
            from: 'Multiversa Lab',
            replyTo: lead.email
          })
        )
      );

      return results.filter(
        (result) => result.status === 'rejected' || Boolean(result.value?.error)
      ).length;
    }
  };
}

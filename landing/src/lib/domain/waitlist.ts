export const WAITLIST_INTERESTS = [
  { value: 'Probar Multiversa CLI', label: 'Probar Multiversa CLI' },
  { value: 'Contribuir al Lab', label: 'Contribuir al Lab' },
  { value: 'Seguir los releases', label: 'Seguir los releases' }
] as const;

export type WaitlistInterest = (typeof WAITLIST_INTERESTS)[number]['value'];

export type WaitlistLead = {
  name: string;
  email: string;
  interest: WaitlistInterest;
};

export type WaitlistValidation =
  | { ok: true; lead: WaitlistLead }
  | { ok: false; error: string };

const INTEREST_VALUES = new Set<string>(WAITLIST_INTERESTS.map(({ value }) => value));
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;

function asRecord(input: unknown): Record<string, unknown> | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  return input as Record<string, unknown>;
}

function cleanText(value: unknown): string {
  return typeof value === 'string'
    ? value.normalize('NFKC').replace(CONTROL_CHARACTERS, '').trim()
    : '';
}

export function validateWaitlistSubmission(input: unknown): WaitlistValidation {
  const record = asRecord(input);
  if (!record) return { ok: false, error: 'Solicitud inválida.' };

  const name = cleanText(record.name);
  const email = cleanText(record.email).toLowerCase();
  const interest = cleanText(record.plan_interest);

  if (!name || name.length > 120) {
    return { ok: false, error: 'Nombre requerido (máximo 120 caracteres).' };
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Correo electrónico inválido.' };
  }

  if (!INTEREST_VALUES.has(interest)) {
    return { ok: false, error: 'Área de interés desconocida.' };
  }

  return {
    ok: true,
    lead: { name, email, interest: interest as WaitlistInterest }
  };
}

export function isHoneypotFilled(input: unknown): boolean {
  const record = asRecord(input);
  return Boolean(record && cleanText(record.website));
}

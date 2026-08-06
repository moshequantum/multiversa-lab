import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, status, message }) => {
  const incidentId = crypto.randomUUID();
  const errorName = error instanceof Error ? error.name : 'UnknownError';

  // PII y payloads quedan fuera del evento. Vercel captura este JSON estructurado.
  console.error(
    JSON.stringify({ event: 'lab.client.error', incidentId, status, message, errorName })
  );

  return {
    message: 'La interfaz encontró un error inesperado.',
    incidentId
  };
};

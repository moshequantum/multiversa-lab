import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, status, message, event }) => {
  const incidentId = crypto.randomUUID();
  const errorName = error instanceof Error ? error.name : 'UnknownError';

  console.error(
    JSON.stringify({
      event: 'lab.server.error',
      incidentId,
      status,
      message,
      errorName,
      method: event.request.method,
      path: event.url.pathname
    })
  );

  return {
    message: 'El servidor encontró un error inesperado.',
    incidentId
  };
};

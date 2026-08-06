import installer from '../../../../multiversa-installer.sh?raw';

export const prerender = true;

export function GET() {
  return new Response(installer, {
    headers: {
      'content-type': 'text/x-shellscript; charset=utf-8',
      'content-disposition': 'inline; filename="install.sh"',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-content-type-options': 'nosniff'
    }
  });
}

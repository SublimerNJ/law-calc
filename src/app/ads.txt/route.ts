/**
 * Explicit ads.txt route so AdSense crawlers always get plain text
 * at the apex origin, with crawl-friendly headers.
 */
const BODY = 'google.com, pub-4876717805321792, DIRECT, f08c47fec0942fa0\n';

export function GET() {
  return new Response(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

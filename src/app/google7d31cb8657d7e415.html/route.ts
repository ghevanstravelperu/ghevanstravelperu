export function GET() {
  return new Response("google-site-verification: google7d31cb8657d7e415.html\n", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

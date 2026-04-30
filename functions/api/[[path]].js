export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const apiUrl = `https://api.ryzumi.net${url.pathname}${url.search}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Cloudflare-Worker)',
        'Accept': '*/*'
      }
    });

    // Proxy response directly (preserve content-type)
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

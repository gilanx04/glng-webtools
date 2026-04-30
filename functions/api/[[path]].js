export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Proxy to api.ryzumi.net with same path + query
  const apiUrl = `https://api.ryzumi.net${url.pathname}${url.search}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Cloudflare-Worker)',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

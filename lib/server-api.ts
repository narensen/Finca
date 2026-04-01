const placeholderApiUrl = "https://your-render-url.onrender.com/api/v1";

function getServerApiUrl() {
  const configuredUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!configuredUrl || configuredUrl === placeholderApiUrl) {
    throw new Error("API_URL is missing. Configure API_URL or NEXT_PUBLIC_API_URL on the server.");
  }

  return configuredUrl.replace(/\/+$/, "");
}

export async function forwardBlockchainPost(request: Request, path: string) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "The request body must be valid JSON." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${getServerApiUrl()}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const raw = await upstream.text();
    const contentType = upstream.headers.get("content-type") ?? "application/json";

    return new Response(raw, {
      status: upstream.status,
      headers: {
        "Content-Type": contentType
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The blockchain service could not be reached.";

    return Response.json(
      {
        message
      },
      { status: 502 }
    );
  }
}

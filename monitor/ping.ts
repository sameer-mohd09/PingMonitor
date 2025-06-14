export async function pingURL(config: {
  url: string;
  method: string;
  headers?: Record<string, string>;
  timeout?: number;
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout ?? 3000);

  const start = performance.now();

  try {
    const res = await fetch(config.url, {
      method: config.method || "GET",
      headers: config.headers,
      signal: controller.signal
    });

    const end = performance.now();
    return {
      url: config.url,
      status: res.status,
      responseTime: Math.round(end - start),
      success: res.ok
    };
  } catch (err) {
    const error=err as Error;
    return {
      url: config.url,
      status: null,
      responseTime: null,
      success: false,
      error: error.name === "AbortError" ? "Timeout" : error.message
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

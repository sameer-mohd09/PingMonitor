import { SiteSetting } from "../types.ts";

export async function pingURL(setting: SiteSetting) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), setting.timeout ?? 3000);

  const start = performance.now();

  try {
    const res = await fetch(setting.url, {
      method: "GET",
      signal: controller.signal
    });

    const end = performance.now();
    return {
      url: setting.url,
      status: res.status,
      responseTime: Math.round(end - start),
      success: res.ok
    };
  } catch (err) {
    const error=err as Error;
    return {
      url: setting.url,
      status: null,
      responseTime: null,
      success: false,
      error: error.name === "AbortError" ? "Timeout" : error.message
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

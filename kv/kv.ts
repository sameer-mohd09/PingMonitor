import { SiteSetting } from "../types.ts";

const kv = await Deno.openKv();

export async function saveSetting(key: string, value: SiteSetting) {
  await kv.set(["settings", key], value);
}

export async function getSetting(key: string): Promise<SiteSetting> {
  const result = await kv.get(["settings", key]);
  return result.value as SiteSetting;
}

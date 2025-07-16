//only file which is connexted to config

import config from "../config/default.json" with { type: "json" };
import { getAllSettings, saveSetting, deleteSettings } from "../kv/kv.ts";

async function updateSettingsToKV() {


  const configUrls = new Set(config.map(site => site.url));
  const kvSettings = await getAllSettings();
  const kvUrls = new Set(kvSettings.map(site => site.url));



  for (const url of kvUrls) {
    if (!configUrls.has(url)) {
      await deleteSettings(url);
      console.log(`deleted: ${url}`);
    }
  }

  for (const site of config) {
    await saveSetting(site.url, site);
    console.log(`saved: ${site.url}`);
  }

  console.log("Kv sync complete");
}

await updateSettingsToKV();

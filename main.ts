import { saveSetting,  getAllSettings } from "./kv/kv.ts";
import { monitorSite } from "./utils/monitor.ts";
import config from "./config/default.json" with { type: "json" };



for (const site of config) {
  await saveSetting(site.url, site);
}

const allSettings=await getAllSettings();

for (const site of allSettings) {
  setInterval(() => monitorSite(site), site.interval);
}

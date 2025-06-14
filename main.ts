import config from "./config/default.json" with { type: "json" };
import { saveSetting, getSetting } from "./kv/kv.ts";
import { pingURL } from "./monitor/ping.ts";
import {join} from "https://deno.land/std@0.203.0/path/join.ts";


const baseInterval = 5000;

function sanitizeFilename(name: string) {
  return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

// Save config in KV
for (const site of config) {
  await saveSetting(site.url, site);
}

async function monitorSite(siteConfig: typeof config[number]) {
  const settings = await getSetting(siteConfig.url);
  const resultRaw = await pingURL(settings);

const result = {
  ...resultRaw,
  timestamp: new Date().toISOString(),
  statusMatch: resultRaw.status === settings.expectedStatusCode,
  timeWithinLimit: (resultRaw.responseTime ?? Infinity) <= (settings.maxResponseTime ?? Infinity)
};


//   result.timestamp = new Date().toISOString();
//   result.statusMatch = result.status === settings.expectedStatusCode;
//   result.timeWithinLimit = (result.responseTime ?? Infinity) <= settings.maxResponseTime;

  const filename = settings.outputFileName || sanitizeFilename(settings.url) + ".json";
  const filepath = join("output", filename);

  const existingResults = JSON.parse(await Deno.readTextFile(filepath).catch(() => "[]"));
  existingResults.push(result);
  await Deno.writeTextFile(filepath, JSON.stringify(existingResults, null, 2));

  console.log(`[${new Date().toLocaleTimeString()}] Checked ${settings.url} | OK: ${result.success}`);
}

// Launch interval for each site based on priority
for (const site of config) {
  const interval = baseInterval / site.priority;
  setInterval(() => monitorSite(site), interval);
}


import { pingURL } from "../monitor/ping.ts";
import { SiteSetting } from "../types.ts";
import { sanitizeFilename } from "./string.ts";
import { join } from "https://deno.land/std@0.203.0/path/mod.ts";



export async function monitorSite(settings:SiteSetting) {
 try{ const resultRaw = await pingURL(settings);

const result = {
  ...resultRaw,
  timestamp: new Date().toISOString(),
  statusMatch: resultRaw.status === settings.expectedStatusCode,
  timeWithinLimit: (resultRaw.responseTime ?? Infinity) <= (settings.maxResponseTime ?? Infinity)
};

  const filename = settings.name || sanitizeFilename(settings.url) + ".json";
  const filepath = join("output", filename);

  const existingResults = JSON.parse(await Deno.readTextFile(filepath).catch(() => "[]"));
  existingResults.push(result);
  await Deno.writeTextFile(filepath, JSON.stringify(existingResults, null, 2));

  console.log(`[${new Date().toLocaleTimeString()}] Checked ${settings.url} | OK: ${result.success}`);
}
  catch(err ){
    if (err instanceof Error) {
      console.error(`Error fetching settins for ${settings.url}:`, err.message);
    } else {
      console.error(`Error fetching settins for ${settings.url}:`, err);
    }
  }
}
                           
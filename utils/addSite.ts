
import { saveSetting } from "../kv/kv.ts";

const site = {
  url: "https://example.com",
  timeout: 2000,
  expectedStatusCode: 200,
  maxResponseTime: 1000,
  interval: 3000,
  name: "example.json",
};

await saveSetting(site.url, site);
console.log(`ssaved: ${site.url}`);

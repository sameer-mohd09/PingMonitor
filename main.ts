import {  getAllSettings } from "./kv/kv.ts";
import { monitorSite } from "./utils/monitor.ts";


const allSettings=await getAllSettings();

for (const site of allSettings) {
  setInterval(() => monitorSite(site), site.interval || 3000);
}

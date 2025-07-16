
import { getAllSettings } from "../kv/kv.ts";

const settings = await getAllSettings();
console.log("urrls present in kv:");
for (const site of settings) {
  console.log( site.url);
}


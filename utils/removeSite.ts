
import { getAllSettings, deleteSettings } from "../kv/kv.ts";

const sites = await getAllSettings();

if (sites.length === 0) {
  console.log("No sites found in KV.");
  Deno.exit(0);
}

console.log("Sites stored in KV:");
sites.forEach((site, index) => {
  console.log(`${index + 1}. ${site.url}`);
});

const input = prompt("Enter the number of the site to delete:");
const index = parseInt(input || "", 10) - 1;

if (isNaN(index) || index < 0 || index >= sites.length) {
  console.error("Invalid selection. Aborting.");
  Deno.exit(1);
}

const urlToDelete = sites[index].url;
await deleteSettings(urlToDelete);

console.log(` Deleted site: ${urlToDelete}`);

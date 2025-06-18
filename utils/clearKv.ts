import { getAllSettings, deleteSettings } from "../kv/kv.ts";

async function clearKV() {
  const all = await getAllSettings();
  for (const setting of all) {
    await deleteSettings(setting.url);
    console.log(`Deleted: ${setting.url}`);
  }
  console.log("All settings cleared.");
}

await clearKV();

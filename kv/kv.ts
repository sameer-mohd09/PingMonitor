// import { assert } from "https://deno.land/std@0.203.0/assert/assert.ts";
import { SiteSetting } from "../types.ts";


const kv = await Deno.openKv(".data/kv");
// const kv = await Deno.openKv();

export async function saveSetting(key: string, value: SiteSetting) {
  await kv.set(["settings", key], value);
}

// export async function getSetting(key: string): Promise<SiteSetting> {
//   const result = await kv.get<SiteSetting>(["settings", key]);
//   assert(result.value, `Setting not found for key: ${key}`);
//   return result.value;

// }

export async function getAllSettings(): Promise<SiteSetting[]>{
   const settings=[];

 try { 
  for await (const iter of kv.list<SiteSetting>({prefix:["settings"]})){
    settings.push(iter.value );
   }
  }
  catch(err){
    if (err instanceof Error) {
      console.error("Failed to fetch all settings from KV:", err.message);
    } else {
      console.error("Failed to fetch all settings from KV:", err);
    }
   }
  return settings;
} 


export async function deleteSettings(key:string){
  await kv.delete(["settings",key]);
}

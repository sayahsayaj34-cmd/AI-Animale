import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvrqkozzfdtgbramxlfi.supabase.co";
const supabaseKey = "sb_publishable_GE9R-P7zpTgENsz0aHkPPg_LqmcCfGn"; // paste from Settings → API

export const supabase = createClient(supabaseUrl, supabaseKey);

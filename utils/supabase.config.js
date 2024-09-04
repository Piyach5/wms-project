import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xczkcjhnyqvfopquprtm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(file, upc) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`product_images/${upc}`, file, {
      upsert: true,
      contentType: "image/jpeg",
    });
  if (error) {
    return { success: false, error };
  } else {
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`product_images/${upc}`);
    return { success: true, data };
  }
}

export { uploadFile };

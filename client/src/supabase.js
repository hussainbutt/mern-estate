import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwpqfzclqfvlievyikxq.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHFmemNscWZ2bGlldnlpa3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjkwMjYsImV4cCI6MjA1NDQ0NTAyNn0.PdRpzBuD_vokKtgJYqYcMPczLVl45jJIsrPSc5x_ME8"; // Replace with your Supabase API Key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

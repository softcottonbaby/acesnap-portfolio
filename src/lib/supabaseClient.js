import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zsxlwuzyxankzzwxtall.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeGx3dXp5eGFua3p6d3h0YWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4Njc4MDQsImV4cCI6MjA3MTQ0MzgwNH0.yfqG53vkfnuUPtDHVSPiXUMWsWqDWFmf3sz0FVe-Zcs";
export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from '@supabase/supabase-js';

// Environment variables will be set by user later
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are set
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Type definitions for our database
export interface DiagnosisResult {
    uuid?: string;
    readable_id: string;
    name: string;
    profile: any;
    scores: any;
    tags?: string[];
    catchphrase?: string;
    created_at?: string;
}

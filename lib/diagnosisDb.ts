import { supabase, DiagnosisResult } from './supabase';
import { generateReadableId } from './idGenerator';

/**
 * Save diagnosis result to Supabase and return the generated ID
 * Retries up to 3 times if ID collision occurs
 */
export async function saveDiagnosisResult(
    name: string,
    profile: any,
    scores: any,
    tags?: string[],
    catchphrase?: string
): Promise<string | null> {
    // Skip if Supabase not configured
    if (!supabase) {
        console.warn('Supabase not configured, skipping save');
        return null;
    }

    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const readableId = generateReadableId();

        const result: DiagnosisResult = {
            readable_id: readableId,
            name,
            profile,
            scores,
            tags,
            catchphrase,
        };

        try {
            const { data, error } = await supabase
                .from('diagnosis_results')
                .insert([result])
                .select()
                .single();

            if (error) {
                // If unique constraint violation, retry
                if (error.code === '23505') {
                    console.log(`ID collision on attempt ${attempt + 1}, retrying...`);
                    continue;
                }
                throw error;
            }

            // Success - save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('urapro_my_id', readableId);
            }

            return readableId;
        } catch (err) {
            console.error('Error saving diagnosis:', err);
            if (attempt === maxRetries - 1) {
                return null;
            }
        }
    }

    return null;
}

/**
 * Fetch diagnosis result by ID
 */
export async function getDiagnosisById(readableId: string): Promise<DiagnosisResult | null> {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from('diagnosis_results')
            .select('*')
            .eq('readable_id', readableId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching diagnosis:', err);
        return null;
    }
}

/**
 * Get user's own ID from localStorage
 */
export function getMyId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('urapro_my_id');
}

import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request, locals }) {    
    const userId = locals.userId;

    try {
        const body = await request.json();
        console.log("3. Request body:", "body");
        
        const { current, moveHistory, chrono } = body;

        const { data, error } = await supabase
            .from('sudoku_completions')
            .insert({
                user_id: userId,
                current_state: current,
                move_history: moveHistory,
                time_elapsed: chrono,
                completed_at: new Date(),
                is_completed: true
            })
            .select();

        if (error) throw error;

        return json({ 
            success: true,
            data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('6. Detailed error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
        });
        
        return json({ 
            success: false, 
            error: 'Failed to store completion data',
            details: error.message
        }, { 
            status: 500 
        });
    }
}
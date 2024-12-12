import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request, locals }) {
    console.log("1. API endpoint reached");
    
    const userId = locals.userId;
    console.log("2. User ID:", userId);

    try {
        const body = await request.json();
        console.log("3. Request body:", "body");
        
        const { current, moveHistory, chrono } = body;

        console.log("4. Attempting database insert with:", {
            user_id: userId,
            current_state: current,
            move_history: moveHistory,
            time_elapsed: chrono
        });

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

        console.log("5. Database response:", { data, error });

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
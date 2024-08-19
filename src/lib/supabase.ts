import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://intuprgcfuokaozzrnmk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHVwcmdjZnVva2Fvenpybm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4ODI3MTksImV4cCI6MjAzODQ1ODcxOX0.ltYTy1FUFY1D88LzILGGWwDIjnjdwSekieRtoh8YS8M')

interface SudokuData {
    puzzle: string;
    solution: string;
}
  
async function fetchTodaysSudoku(): Promise<SudokuData | null> {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const { data, error, count } = await supabase
        .from('daily_sudoku')
        .select('puzzle, solution') // to add "reward" column
        .eq('day', today)
        .limit(1);
    
    if (error) {
        console.error('Error fetching today\'s Sudoku:', error);
    } else if (count && count > 1) {
        console.warn('Multiple rows found for today\'s date. Using the first one.');
    }

    return data ? data[0] : null;
}

export { fetchTodaysSudoku };
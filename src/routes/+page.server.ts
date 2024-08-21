import { supabase } from "$lib/supabase";


export async function load() {
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

    if (data === null || data.length === 0) {
        console.error("data empty");
        return { 
            sudoku: [], 
            solution: [] 
        }; // or handle the empty case differently
    };
    let sudoku: string = data[0].puzzle;
    let solution: string = data[0].solution
    return {
        sudoku: sudoku ?? [],
        solution: solution ?? []
    };
  }
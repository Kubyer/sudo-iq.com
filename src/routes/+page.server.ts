import { supabase } from "$lib/supabase";

export async function load({ locals }) {
    const userId = locals.userId; // Access the userId from locals
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const { data:puzzleData, error:puzzleError, count:puzzleCount } = await supabase
        .from('daily_sudoku')
        .select('puzzle, solution') // to add "reward" column
        .eq('day', today)
        .limit(1);

    if (puzzleError) {
        console.error('Error fetching today\'s Sudoku:', puzzleError);
    } else if (puzzleCount && puzzleCount > 1) {
        console.warn('Multiple rows found for today\'s date. Using the first one.');
    }

    if (puzzleData === null || puzzleData.length === 0) {
        console.error("data empty");
        return { 
            sudoku: [], 
            solution: [] 
        }; // or handle the empty case differently
    };

    const { data: gameData, error: gameError } = await supabase
    .from('user_games')
    .select('current_state, moves')
    .eq('user_id', userId)
        .eq('date', today)
        .single();

    if (!gameData && !gameError) {
        // Create new game session if none exists
        await supabase
            .from('user_games')
            .insert({
                user_id: userId,
                date: today,
                current_state: puzzleData[0].puzzle,
                moves: []
            });
    }

    let sudoku: string = puzzleData[0].puzzle;
    let solution: string = puzzleData[0].solution
    let gameState: string = gameData?.current_state ?? null;
    let moveHistory: string[] = gameData?.moves ?? [];

    console.log("from page.server userId:", userId)
    return {
        sudoku: sudoku ?? [],
        solution: solution ?? [],
        gameState: gameState ?? null,
        moveHistory: moveHistory ?? []
    };
  }
<script lang="ts">
    import '../app.css'
    import Timer from './Timer.svelte';
    import SudokuGrid from './SudokuGrid.svelte';
    import NumberGrid from './NumberGrid.svelte';
    import ButtonCommands from './ButtonCommands.svelte';
    import { onMount } from 'svelte';
    import SuccessScreen from './SuccessScreen.svelte';
    import LoadingGrid from './LoadingGrid.svelte';
    export let data: { sudoku: string; solution: string };

    import { inject } from '@vercel/analytics'
    import { dev } from '$app/environment';

    inject({ mode: dev ? 'development' : 'production' });

    interface CellData {
        value: string;
        draft: string[];
    }

    interface Move {
        index: number;
        oldCell: CellData;
        newCell: CellData;
    }

    let initial: string[] = [];
    let current: CellData[] = [];
    let final: CellData[] = [];
    let isLoading = true;
    let moveHistory: Move[] = [];

    onMount(() => {
        if (data.sudoku && data.solution) {
            initial = data.sudoku.split('')
            current = initial.map(n => ({ value: n, draft: [] }));
            final = data.solution.split('').map(n => ({ value: n, draft: [] }));
            isLoading = false;
        } else {
        console.error('Invalid data format. Expected an array of 2 strings.');
        }
        initial = reorderElements(initial) as string[];
        current = reorderElements(current) as CellData[];
        final = reorderElements(final) as CellData[];

        window.addEventListener('keydown', handleKeyDown);
    });
    
    function updateCell(index: number, value: string): void {
        const oldCell: CellData = {
            value: current[index].value,
            draft: [...current[index].draft]
        };

        if (initial[index] === '.') {
            if (value === "X") {
                current[index].value = ".";
                current[index].draft = [];
            } else if (current[index].value === value) {
                current[index].value = ".";
            } else {
                current[index].value = value;
                current[index].draft = [];
            }
            
            const oldCell: CellData = {
                value: current[index].value,
                draft: [...current[index].draft]
            };

            const newCell: CellData = {
                value: current[index].value,
                draft: [...current[index].draft]
            };

            moveHistory.push({ index, oldCell, newCell });
            console.log("New item in hist")
            current = [...current];
            checkSolution();
        }
    }

    function handleKeyDown(event: KeyboardEvent): void {
        if (selectedCellIndex === null) return;

        if (event.key >= '1' && event.key <= '9') {
            updateCell(selectedCellIndex, event.key);
        } else if (event.key === 'Backspace' || event.key === 'Delete') {
            updateCell(selectedCellIndex, 'X');
        } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            navigateGrid(event.key);
            console.log(selectedCellIndex)

        }
    }

    function navigateGrid(direction: string): void {
        if (selectedCellIndex === null) return;

        let newIndex = selectedCellIndex;
        const maxTries = 9; // Avoid infinite scroll

        for (let i = 0; i < maxTries; i++) {
            const currentSubgrid = Math.floor(newIndex / 9);
            const subgridRow = Math.floor(currentSubgrid / 3);
            const subgridCol = currentSubgrid % 3;
            const cellInSubgrid = newIndex % 9;
            const rowInSubgrid = Math.floor(cellInSubgrid / 3);
            const colInSubgrid = cellInSubgrid % 3;

            let newSubgridRow = subgridRow;
            let newSubgridCol = subgridCol;
            let newRowInSubgrid = rowInSubgrid;
            let newColInSubgrid = colInSubgrid;

            switch (direction) {
                case 'ArrowUp':
                    if (rowInSubgrid > 0) {
                        newRowInSubgrid--;
                    } else {
                        newSubgridRow = (subgridRow - 1 + 3) % 3;
                        newRowInSubgrid = 2;
                    }
                    break;
                case 'ArrowDown':
                    if (rowInSubgrid < 2) {
                        newRowInSubgrid++;
                    } else {
                        newSubgridRow = (subgridRow + 1) % 3;
                        newRowInSubgrid = 0;
                    }
                    break;
                case 'ArrowLeft':
                    if (colInSubgrid > 0) {
                        newColInSubgrid--;
                    } else {
                        newSubgridCol = (subgridCol - 1 + 3) % 3;
                        newColInSubgrid = 2;
                    }
                    break;
                case 'ArrowRight':
                    if (colInSubgrid < 2) {
                        newColInSubgrid++;
                    } else {
                        newSubgridCol = (subgridCol + 1) % 3;
                        newColInSubgrid = 0;
                    }
                    break;
            }

            const newSubgrid = newSubgridRow * 3 + newSubgridCol;
            const newCellInSubgrid = newRowInSubgrid * 3 + newColInSubgrid;
            newIndex = newSubgrid * 9 + newCellInSubgrid;

            // If the new cell is editable, update selectedCellIndex and exit
            if (initial[newIndex] === '.') {
                selectedCellIndex = newIndex;
                break;
            }
            // If not editable, continue to the next cell in the same direction
        }
    }

    let selectedNumber: string | null = null;
    let selectedCellIndex: number | null = null;
    let isDraftMode: boolean = false;

    function toggleDraftMode(): void {
        isDraftMode = !isDraftMode;
    }

    let newOrder: number[] = [1, 2, 3, 10, 11, 12, 19, 20, 21, 4, 5, 6, 13, 14, 15, 22, 23, 24, 7, 8, 9, 16, 17, 18, 25, 26, 27, 28, 29, 30, 37, 38, 39, 46, 47, 48, 31, 32, 33, 40, 41, 42, 49, 50, 51, 34, 35, 36, 43, 44, 45, 52, 53, 54, 55, 56, 57, 64, 65, 66, 73, 74, 75, 58, 59, 60, 67, 68, 69, 76, 77, 78, 61, 62, 63, 70, 71, 72, 79, 80, 81];
    function reorderElements(inputArray: any[]): any[] {
        return newOrder.map(index => inputArray[index - 1]);
    }

    function handleNumberClick(number: string): void {
        if (selectedNumber === number) {
            selectedNumber = null;
        } else {
            selectedNumber = number;
            if (selectedCellIndex !== null && !isDraftMode) {
                current[selectedCellIndex].value = selectedNumber;
                selectedCellIndex = null;
                checkSolution()
            }
        }
    }

    function handleCellClick(index: number): void {
        if (selectedCellIndex === index) {
            selectedCellIndex = null;
        } else {
            if (initial[index] === '.') {
                if (isDraftMode) {
                    if (selectedNumber === "X") {
                        current[index].draft = [];
                    } else if (selectedNumber) {
                        const draftIndex = current[index].draft.indexOf(selectedNumber);
                        if (draftIndex === -1) {
                            current[index].draft.push(selectedNumber);
                        } else {
                            current[index].draft.splice(draftIndex, 1);
                        }
                        current = [...current]; // Trigger reactivity
                    }
                } else {
                    if (selectedNumber === "X") {
                        current[index].value = ".";
                        current[index].draft = [];
                    } else if (selectedNumber === null) {
                        selectedCellIndex = index;
                    } else if (current[index].value === selectedNumber) {
                        current[index].value = ".";
                        selectedCellIndex = null;
                    } else {
                        current[index].value = selectedNumber;
                        current[index].draft = [];
                        selectedCellIndex = null;
                    }
                }

                current = [...current];
                checkSolution()
            }
        }
    }
    
    function undoLastMove(): void {
        if (moveHistory.length > 0) {
            const lastMove = moveHistory.pop();
            if (lastMove) {
                current[lastMove.index] = { ...lastMove.oldCell };
                current = [...current];
            }
        }
    }
    let showSuccess: boolean = false;

    function checkSolution(): void {
        const currentValues = current.map(cell => cell.value).join('');
        if (currentValues === final.map(cell => cell.value).join('')) {
            stopTimer();
            showSuccess = true;
            selectedNumber = null;
            selectedCellIndex = null;
        }
    }

    function adminTest(): void {
        current = [...final];
    }

    function handleClear(): void {
        current = initial.map(n => ({ value: n, draft: [] }));
    }

    // update quand on reconnait un user unique
    let startTime: Date = new Date();
    let elapsedTime: number = 0;
    let timerInterval: ReturnType<typeof setInterval> | undefined; 
    let chrono: string = '0:00';

    function startTimer(): void {
        timerInterval = setInterval(() => {
            elapsedTime = Math.floor((Number(new Date()) - Number(startTime)) / 1000);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            chrono = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    function stopTimer(): void {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }

    $: if (!isLoading) {
        startTimer();
    }

    const successResult = 'Sudoku #n /n {chrono} /n {reward} /n sodu-iq.com';
</script>

<main>
    <div class="flex justify-center items-center space-x-4 mx-auto p-2">
        <h1 class="text-xl text-center">Sudo Q</h1>
        <Timer {chrono}/>
        <img src="/info.svg" class='flex items-center justify-center h-12 w-12 hover:bg-gray-300 drop-shadow-2xl' alt="info Icon"/>
    </div>
    
    {#if isLoading}
        <LoadingGrid/>
        <ButtonCommands
                {handleClear}
                {toggleDraftMode}
                {adminTest}
                {isDraftMode}
                {undoLastMove}/>
        <NumberGrid
        {selectedNumber}
        {handleNumberClick}/>
    {:else}
        <SudokuGrid
            {current}
            {initial}
            {selectedNumber}
            {selectedCellIndex}
            {handleCellClick}/>
        
        {#if showSuccess}
            <SuccessScreen
                {chrono}
                {successResult}/>
        {:else}
            <ButtonCommands
                {handleClear}
                {toggleDraftMode}
                {adminTest}
                {isDraftMode}
                {undoLastMove}/>

            <NumberGrid
            {selectedNumber}
            {handleNumberClick}/>
        {/if}
    {/if}
</main>
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

    interface CellData {
        value: string;
        draft: string[];
    }

    let initial: string[] = [];
    let current: CellData[] = [];
    let final: CellData[] = [];
    let isLoading = true;

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

        console.log(current)
    });
    
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
            }
        }
    }

    let showSuccess: boolean = false;

    function handleSubmit(): void {
        const currentValues = current.map(cell => cell.value).join('');
        if (currentValues === final.map(cell => cell.value).join('')) {
            stopTimer();
            showSuccess = true;
            selectedNumber = null;
            selectedCellIndex = null;
        } else {
            alert("Sudoku is not solved yet.");
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

<main class="w-full max-w-[430px] mx-auto flex flex-col items-center">
    <h1 class="text-xl text-center">Sudo Q</h1>
    <Timer {chrono}/>
    {#if isLoading}
        <LoadingGrid/>
        <ButtonCommands
                {handleClear}
                {handleSubmit}
                {toggleDraftMode}
                {adminTest}
                {isDraftMode}/>
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
                {handleSubmit}
                {toggleDraftMode}
                {adminTest}
                {isDraftMode}/>

            <NumberGrid
            {selectedNumber}
            {handleNumberClick}/>
        {/if}
    {/if}
</main>
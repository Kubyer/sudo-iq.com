<script lang="ts">
    export let handleClear: () => void;
    export let handleSubmit: () => void;
    export let toggleDraftMode: () => void;
    export let adminTest: () => void;
    export let isDraftMode: boolean;
</script>

<div class="text-center mx-auto p-2">
    <button on:click={handleClear} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl">
    Reset
    </button>
    <button on:click={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl">
    Submit
    </button>
    <button 
        on:click={toggleDraftMode} 
        class={`
        font-bold py-2 px-4 rounded
        transition-all
        ${isDraftMode 
            ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-2xl' 
            : 'bg-gray-400 hover:bg-gray-500 text-white shadow-inner-2xl' 
        }
        `}
    >
        {isDraftMode ? 'Draft On' : 'Draft Off'} 
    </button>
    <!-- <button on:click={adminTest}>test</button> -->
</div>
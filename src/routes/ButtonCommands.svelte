<script lang="ts">
    export let handleClear: () => void;
    export let toggleDraftMode: () => void;
    export let adminTest: () => void;
    export let isDraftMode: boolean;
</script>

<div class="flex justify-center items-center space-x-4 mx-auto p-2">
    <button on:click={handleClear} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl">
    Reset
    </button>
    <button 
        on:click={toggleDraftMode} 
        class='flex items-center justify-center h-12 w-12 hover:bg-gray-300 drop-shadow-2xl'>
    {#if isDraftMode}
        <img src="src/lib/draft_on.svg" alt="Button Icon"/>
    {:else}
        <img src="src/lib/draft_off.svg" alt="Button Icon"/>
    {/if}
    </button>
    <!-- <button on:click={adminTest}
        class="w-12 h-12 ">
        admin
    </button> -->
    <img src="src/lib/undo.svg" class='flex items-center justify-center h-12 w-12 hover:bg-gray-300 drop-shadow-2xl' alt="Button Icon"/>
</div>
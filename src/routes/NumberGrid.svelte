<script lang="ts">
    let int_buttons: string[] = "123456789X".split("");

    export let selectedNumber: string | null;
    export let handleNumberClick: (index: string) => void;
</script>

<div class="grid grid-rows-2 grid-cols-5 w-max text-center gap-0.5 container mx-auto">
    {#each int_buttons as number}
    <button 
        on:click={() => handleNumberClick(number)}
        class:selected={selectedNumber === number}
        class="rounded-xl bg-gray-200 hover:bg-gray-500 place-content-center h-12 w-12">
        {number}
    </button>
    {/each}
</div>
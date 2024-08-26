<script lang="ts">
  interface CellData {
      value: string;
      draft: string[];
  }

  export let current: CellData[];
  export let initial: string[];
  export let selectedNumber: string | null;
  export let selectedCellIndex: number | null;
  export let handleCellClick: (index: number) => void;
  //export let handleNumberClick: (index: number) => void; prochaine update où click une cell change le number selected

</script>

<div class="w-full aspect-square">
  <div class="grid grid-cols-3 gap-1 w-full h-full">
    {#each Array(9) as _, subgrid}
      <div class="grid grid-cols-3">
        {#each current.slice(subgrid * 9, (subgrid + 1) * 9) as cell, i}
          {#if initial[subgrid * 9 + i] === '.'}
            <button
              on:click={() => handleCellClick(subgrid * 9 + i)}
              class="rounded-xl bg-gray-200 hover:bg-gray-500 text-center h-10 w-10 relative 
                    {(selectedNumber === cell.value) || (selectedNumber && cell.draft.includes(selectedNumber)) ? 'hovered' : ''}"
              class:selected={selectedCellIndex === (subgrid * 9 + i)}>
              {#if cell.value !== '.'}
                <span class="text-lg">{cell.value}</span>
              {:else}
                <div class="grid grid-cols-3 gap-0 absolute inset-0 text-xs p-0.5">
                  {#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as num}
                    <span class={cell.draft.includes(num) ? 'opacity-100' : 'opacity-0'}>{num}</span>
                  {/each}
                </div>
              {/if}
            </button>
          {:else}
            <div
              class="rounded-xl bg-gray-300 place-content-center h-10 w-10 flex items-center justify-center
                    {selectedNumber === cell.value ? 'hovered' : ''}">
              {cell.value}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
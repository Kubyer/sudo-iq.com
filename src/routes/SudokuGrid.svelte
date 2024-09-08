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
</script>

<div class="grid grid-cols-3 gap-2 w-max mx-auto p-2">
  {#each Array(9) as _, subgrid}
    <div class="grid grid-cols-3">
      {#each current.slice(subgrid * 9, (subgrid + 1) * 9) as cell, i}
        {#if initial[subgrid * 9 + i] === '.'}
          <button
            on:click={() => handleCellClick(subgrid * 9 + i)}
            class="rounded-xl bg-gray-200 hover:bg-gray-500 text-center h-10 w-10 relative font-black
                   {(selectedNumber === cell.value) || (selectedNumber && cell.draft.includes(selectedNumber)) ? 'hovered' : ''}"
            class:selected={selectedCellIndex === (subgrid * 9 + i)}>
            {#if cell.value !== '.'}
              <span class="text-lg">{cell.value}</span>
            {:else}
              <div class="text-xs font-thin	flex flex-wrap justify-center items-center text-center overflow-hidden leading-tight">
                {#each cell.draft.slice().sort() as num,j}
                  <span class="mr-0.5">
                    {num}
                    {#if (j + 1) % 3 === 0}<br>{/if}</span>
                {/each}
              </div>
            {/if}
          </button>
        {:else}
          <div
            class="rounded-xl bg-gray-400 place-content-center h-10 w-10 flex items-center justify-center font-black
                  {selectedNumber === cell.value ? 'hovered' : ''}">
            {cell.value}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
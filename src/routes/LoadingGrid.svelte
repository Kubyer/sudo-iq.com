<script lang="ts">

</script>

<div class="grid grid-cols-3 gap-2 w-max mx-auto p-2">
{#each Array(9) as _, subgrid}
    <div class="grid grid-cols-3">
    {#each Array(81).slice(subgrid * 9, (subgrid + 1) * 9) as cell, i}
        <div
            class="rounded-xl bg-gray-200 hover:bg-gray-500 text-center h-12 w-12 relative">
        </div>
    {/each}
    </div>
{/each}
</div>
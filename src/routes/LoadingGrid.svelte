<script lang="ts">

</script>
<div class="w-full aspect-square">
    <div class="grid grid-cols-3 gap-1 w-full h-full">
    {#each Array(9) as _, subgrid}
        <div class="grid grid-cols-3">
        {#each Array(81).slice(subgrid * 9, (subgrid + 1) * 9) as cell, i}
            <div
                class="rounded-xl bg-gray-200 hover:bg-gray-500 text-center h-10 w-10 relative">
            </div>
        {/each}
        </div>
    {/each}
    </div>
</div>
<!-- InstructionsModal.svelte -->
<script lang="ts">
    export let isOpen: boolean;
    export let onClose: () => void;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            onClose();
        }
    }
</script>

{#if isOpen}
    <!-- Overlay -->
    <button 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 w-full h-full"
        on:click={onClose}
        on:keydown={handleKeydown}
        aria-label="Close modal"
    />

    <!-- Modal content -->
    <div 
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg mx-4 z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
    >
        <h2 id="modal-title" class="text-xl font-bold mb-4">How to Play Sudo Q</h2>
        
        <div class="space-y-4">
            <section>
                <h3 class="font-semibold">Basic Rules</h3>
                <ul class="list-disc pl-5">
                    <li>Fill in the grid with numbers 1-9</li>
                    <li>Each row must contain numbers 1-9 without repetition</li>
                    <li>Each column must contain numbers 1-9 without repetition</li>
                    <li>Each 3x3 box must contain numbers 1-9 without repetition</li>
                </ul>
            </section>

            <section>
                <h3 class="font-semibold">Game Features</h3>
                <ul class="list-disc pl-5">
                    <li>Press 'D' or click Draft Mode to toggle pencil marks</li>
                    <li>Use arrow keys to navigate the grid</li>
                    <li>Click numbers or use keyboard (1-9) to input values</li>
                    <li>Timer tracks your solving speed</li>
                </ul>
            </section>

            <section>
                <h3 class="font-semibold">Daily Challenge</h3>
                <p>New puzzle available every day at midnight. Share your completion time with friends!</p>
            </section>
        </div>

        <button
            class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            on:click={onClose}
            on:keydown={handleKeydown}
        >
            Got it!
        </button>
    </div>
{/if}
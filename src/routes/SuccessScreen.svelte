<script lang="ts">
  export let chrono: string;
  export let successResult:string;

  //export let sudokuNumber: number;  // Assuming you're passing the Sudoku number

  function copyToClipboard(content: string): void {
    navigator.clipboard.writeText(content)
      .then(() => {
        // Optionally, you could add some feedback here, like a toast notification
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  $: successResult = `Sudoku #\n${chrono}\sudo-iq.com`;
</script>
<div class="text-center mt-4">
    <h2 class="text-2xl text-green-500">Yay, you won!</h2>
    <p class="text-gray-600">Time: {chrono}</p>
    <button on:click={() => copyToClipboard(successResult)}>
        Copy to Clipboard
    </button>
</div>
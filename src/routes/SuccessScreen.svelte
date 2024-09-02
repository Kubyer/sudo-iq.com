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

  $: successResult = `Sudoku # ${chrono} sudo-iq.com`;
</script>
<div class="justify-center">
  <h2 class="text-2xl justify-center text-green-500">Yay, you won!</h2>
  <div class="flex justify-center items-center space-x-4 mx-auto p-2">
    <p class="text-gray-600">Time: {chrono}</p>
    <button on:click={() => copyToClipboard(successResult)}
      class='flex items-center justify-center h-12 w-12 hover:bg-gray-300 drop-shadow-2xl'>
      <img src="/copy.svg" alt="Button Icon"/>
    </button>
    <p>Share!</p>
  </div>
</div>

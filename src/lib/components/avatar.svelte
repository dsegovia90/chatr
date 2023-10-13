<script lang="ts">
  export let displayName: string
  export let iconOverride: string | null = null
</script>

<div class="flex flex-col items-center">
  <button on:click class="block bg-white rounded-full h-16 w-16">
    {iconOverride ?? displayName[0]}
  </button>
  {displayName}
</div>
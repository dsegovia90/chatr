<script lang="ts">
	let currentMessage = '';
</script>

<div class="flex flex-col h-full">
	<div class="flex-grow">Top</div>
	<div class="p-4 border-t bg-slate-200">
		<form>
			<input class="px-8 py-4 w-full rounded" type="text" bind:value={currentMessage} placeholder="" />
		</form>
	</div>
</div>

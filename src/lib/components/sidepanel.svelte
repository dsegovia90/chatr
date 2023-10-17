<script lang="ts">
	import { createChannel } from '$lib/models/channel';
	import { user } from '$lib/store/user';
	import { channels } from '$lib/store/channels';

	const handleCreateChannel = async () => {
		let lastChannel = 'Channel1';
		if ($channels.size) {
			const [, last] = Array.from($channels.entries())[$channels.size - 1];
			const int = parseInt(last.name.replace(/[^0-9]/g, ''));
			lastChannel = `Channel${int + 1}`;
		}

		await createChannel({ name: lastChannel });
	};
</script>

<div class="w-[300px] p-6">
	<h1 class="text-center mb-4 text-4xl">Chatr</h1>
	<p class="mb-10">Hello {$user.name.first}!</p>

	<div class="">
		<div class="flex items-center justify-between">
			<h2>Channels</h2>
			<button class="p-2" on:click={handleCreateChannel}>+</button>
		</div>
		{#each $channels as [id, channel] (id)}
			<a class="block underline" href="/app/{id}">{channel.name}</a>
		{/each}
	</div>
</div>

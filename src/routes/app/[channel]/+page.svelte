<script lang="ts">
	import { createMessage } from '$lib/models/message';
	import { onMount, tick } from 'svelte';
	import type { PageData } from './$types';
	import { channelUid, messages } from '$lib/store/messages';
	import { user } from '$lib/store/user';
	import { channels } from '$lib/store/channels';
	import { browser } from '$app/environment';

	export let data: PageData;

	let currentMessage = '';
	let input: HTMLInputElement;
	let sendingMessage = false;

	let scroller: HTMLDivElement;
	let firstScroll = true;

	$: $channelUid = data.channelUid;

	const scrollToBottom = async () => {
		await tick();
		scroller?.scroll({ top: scroller.scrollHeight, behavior: firstScroll ? 'instant' : 'smooth' });
		firstScroll = false;
	};

	$: {
		$messages;
		if (browser && $messages.size > 0) {
			scrollToBottom();
		}
	}

	onMount(() => {
		input.focus();
	});

	const parseDate = (dateString: string): string => {
		const date = new Date(dateString);
		return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
	};

	const handleSendMessage = async () => {
		if (sendingMessage) return;
		sendingMessage = true;

		createMessage({ text: currentMessage, channel: data.channelUid });
		currentMessage = '';
		sendingMessage = false;
	};
</script>

<div class="flex flex-col h-full">
	<div class="m-4 pb-4 border-b">
		<h2 class=" text-2xl">
			{$channels.get($channelUid)?.name}
		</h2>
	</div>

	<div bind:this={scroller} class="flex-grow p-6 overflow-y-auto">
		<div class="flex justify-end flex-col">
			{#each $messages as [id, message] (id)}
				<div class="flex {message.createdBy.id === $user.id ? 'justify-end' : 'justify-start'}">
					<div
						class="px-4 py-2 my-2 rounded max-w-[80%] {message.createdBy.id === $user.id
							? 'bg-blue-300'
							: 'bg-green-300'}"
					>
						{#if message.createdBy.id !== $user.id}
							<p class="text-xs font-bold opacity-80">{message.createdBy.name.first}</p>
						{/if}
						<p>{message.text}</p>
						<p class="text-xs text-right">{parseDate(message.created)}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="p-4 border-t bg-slate-200">
		<form on:submit|preventDefault={handleSendMessage} class="flex">
			<input
				bind:this={input}
				class="px-8 py-4 w-full rounded"
				type="text"
				bind:value={currentMessage}
				placeholder=""
			/>
			<button type="submit" class="ml-2 px-8 py-2 bg-blue-300 rounded">Send</button>
		</form>
	</div>
</div>

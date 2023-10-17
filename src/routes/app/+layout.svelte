<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Sidepanel from '$lib/components/sidepanel.svelte';
	import { user } from '$lib/store/user';

	if (!$user && browser) {
		goto('/');
	}
</script>

{#if $user}
	<div class="flex h-screen">
		<Sidepanel />
		<div class="flex-grow bg-gray-50">
			<slot />
		</div>
	</div>
{/if}

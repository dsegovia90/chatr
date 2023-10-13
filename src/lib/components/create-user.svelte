<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUser } from '$lib/models/user';
	import { user } from '$lib/store/user';
	import Button from './button.svelte';

	export let toggleCreatingUser: () => void;

	let userToCreate: string;
	let creating = false;

	const handleCreateUser = async () => {
		if (!userToCreate || creating) return;
    creating = true

		const createdUser = await createUser({ first: userToCreate });
		user.set(createdUser);
		goto('/app');
    creating = false
	};
</script>

<div>
	<form on:submit|preventDefault={handleCreateUser}>
		<div class="mb-4">
			<label class="block mb-2 text-lg" for="user-name">User Name</label>
			<input id="user-name" class="px-8 py-4" type="text" bind:value={userToCreate} />
		</div>
		<Button type="submit" text="Create" class="mb-4" disabled={creating}/>
		<Button text="Back" variant="light" on:click={toggleCreatingUser} disabled={creating}/>
	</form>
</div>

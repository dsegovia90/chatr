<script lang="ts">
	import { user } from '$lib/store/user';
	import { getUsers, type User } from '$lib/models/user';
	import { onMount } from 'svelte';
	import Avatar from './avatar.svelte';
	import { goto } from '$app/navigation';
	import CreateUser from './create-user.svelte';

	let users: User[] = [];
	let creatingUser = false;

	onMount(async () => {
		users = await getUsers();
	});

	const toggleCreatingUser = () => {
		creatingUser = !creatingUser;
	};

	const handleSelectUser = (selectedUser: User) => {
		user.set(selectedUser);
    goto('/app')
	};


</script>

<div class="flex gap-4 justify-evenly p-12 border rounded-xl bg-gray-200 {$$props.class}">
	{#if creatingUser}
		<CreateUser {toggleCreatingUser}/>
	{:else}
		<Avatar displayName="New User" iconOverride="+" on:click={toggleCreatingUser} />
		{#each users as userItem}
			<Avatar displayName={userItem.name.first} on:click={() => handleSelectUser(userItem)} />
		{/each}
	{/if}
</div>

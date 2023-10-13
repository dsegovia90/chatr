<script lang="ts">
	import { goto } from "$app/navigation";
	import SelectUser from "$lib/components/select-user.svelte";
	import { user } from "$lib/store/user";

	if ($user) {
		goto('/app')
	}
</script>

<div class="h-screen flex items-center justify-center">
	<SelectUser class="min-w-[300px]" />
</div>
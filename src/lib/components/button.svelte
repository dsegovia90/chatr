<script lang="ts">
	export let text: string;
	export let variant: 'normal' | 'light' = 'normal';
	export let disabled = false;

	let variantClassSelector: Record<typeof variant, string> = {
		normal: 'bg-blue-600 text-white',
		light: 'bg-white text-black'
	};
</script>

<button
	type={$$props.type}
	class="w-full px-8 py-4 {variantClassSelector[variant]} {$$props.class}"
	{disabled}
	on:click
>
	{text}
</button>

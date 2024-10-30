<script lang="ts">
	import '../app.css'
	import type { Snippet } from 'svelte'
	import CartCount from '$lib/CartCount.svelte'
	import CurrencySelect from '$lib/CurrencySelect.svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<div class="mx-auto max-w-5xl">
	<nav class="m-4 flex items-center gap-2">
		<a href="/">Home</a>
		<a href="/about">About</a>
		<CartCount class="ml-auto mr-4" />
		<CurrencySelect />
	</nav>

	<main class="m-4">
		{@render children()}
	</main>
</div>

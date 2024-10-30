<script lang="ts">
	import { page } from '$app/state'
	import Price from '$lib/Price.svelte'

	let cart = page.data.cart
</script>

<h1 class="text-xl font-extrabold">Cart</h1>

{#snippet count(icon: string, onclick: () => void)}
	<button
		class="flex size-6 items-center justify-center rounded-md bg-indigo-700 text-xs text-white"
		{onclick}
	>
		{@html icon}
	</button>
{/snippet}

<ul class="mt-2 space-y-2">
	{#each cart.lines as line}
		<li class="flex items-center gap-2">
			<span class="w-12">{line.code}</span>
			<span class="w-32">{line.title}</span>
			<span class="w-24 text-right"><Price value={line.price} /></span>
			{@render count(
				`<svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" /></svg>`,
				() => cart.remove(line.code)
			)}
			<span class="w-6 text-right tabular-nums">{line.count}</span>
			{@render count(
				`<svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
				() => cart.add(line.code)
			)}
			<span class="w-24 text-right"><Price value={line.total} /></span>
			{@render count(
				`<svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,
				() => cart.delete(line.code)
			)}
		</li>
	{:else}
		<li>
			Your cart is empty, <a href="/" class="text-blue-600 hover:underline">explore products</a>
		</li>
	{/each}
</ul>

{#if page.data.cart.count}
	<p class="mt-2 flex items-center gap-2">
		<span class="w-72 pl-14">Total</span>
		<span class="w-48 text-right"><Price value={page.data.cart.total} /></span>
	</p>
{/if}

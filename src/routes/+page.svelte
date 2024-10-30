<script lang="ts">
	import { products } from '$lib/products'
	import Price from '$lib/Price.svelte'
	import { page } from '$app/state'
	import type { CurrencyCode } from '$lib/currency'

	let cart = page.data.cart
	let currency = page.data.currency
</script>

<h1 class="text-xl font-extrabold">Home</h1>
<p class="mt-2">Behold, our extensive range of very nice products. You like, you buy!</p>

<ul class="mt-2 space-y-2">
	{#each products as product}
		<li class="flex items-center gap-2">
			<span class="w-12">{product.code}</span>
			<span class="w-32">{product.title}</span>
			<span class="w-24 text-right"
				><Price value={product.prices[currency.selected as CurrencyCode] ?? 0} /></span
			>
			<button
				class="flex items-center gap-1.5 rounded-md bg-indigo-700 px-2 py-1 text-xs text-white"
				onclick={() => cart.add(product.code)}
			>
				<svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
				Add to Cart
			</button>
		</li>
	{/each}
</ul>

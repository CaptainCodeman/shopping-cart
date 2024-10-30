<script lang="ts">
	import { page } from '$app/state'

	interface Props {
		class?: string
	}

	let { class: className = '' }: Props = $props()
	let cart = page.data.cart
</script>

<a href="/cart" class="relative {className}">
	<svg
		class="h-5 w-5 text-gray-400"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
		/>
	</svg>
	{#if cart.count}
		<div
			class="absolute -top-1.5 start-3 inline-flex items-center justify-center rounded-full border border-white bg-red-500 px-1 text-[0.6rem] font-bold text-white dark:border-gray-900"
		>
			{cart.count}
		</div>
	{/if}
</a>

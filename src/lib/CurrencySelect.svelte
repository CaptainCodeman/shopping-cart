<script lang="ts">
	import { page } from '$app/state'
	import Flag from './Flag.svelte'

	interface Props {
		class?: string
	}

	let { class: className = '' }: Props = $props()
	let currency = page.data.currency
</script>

<select
	bind:value={currency.selected}
	class="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 {className}"
>
	{#each currency.currencies as code}
		{@const country = code.substring(0, 2)}
		<option value={code} selected={code === currency.selected}><Flag {country} /> {code}</option>
	{/each}
</select>

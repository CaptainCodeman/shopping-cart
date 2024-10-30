<script lang="ts">
	import { page } from '$app/state'

	interface Props {
		value: number
	}

	let { value }: Props = $props()
</script>

<span class="text-right tabular-nums">{page.data.currency.formatter.format(value)}</span>

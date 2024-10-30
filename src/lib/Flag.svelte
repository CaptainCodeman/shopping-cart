<script lang="ts">
	interface Props {
		country: string
		class?: string
	}

	let { country, class: className }: Props = $props()

	// offset to convert A-Z to regional indicators
	const REGIONAL_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

	// convert ISO 3166-1 alpha-2 country code to flag emoji, e.g. "US" -> "🇺🇸"
	function emoji(country: string) {
		return String.fromCodePoint(...[...country].map((char) => char.charCodeAt(0) + REGIONAL_OFFSET))
	}
</script>

{emoji(country)}

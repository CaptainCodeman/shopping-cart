import type { CurrencyCode } from './currency'
import { on } from 'svelte/events'

export class Currency {
	// selected currency
	selected: CurrencyCode = $state('USD')

	// available currencies
	currencies: CurrencyCode[] = $state.raw([])

	// locale for formatting
	locale = $state('en')

	// formatter for rendering prices
	formatter = $derived(
		Intl.NumberFormat(this.locale, {
			useGrouping: true,
			style: 'currency',
			currency: this.selected,
			currencyDisplay: 'symbol',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	)

	constructor(locale: string, selected: CurrencyCode, currencies: CurrencyCode[]) {
		this.locale = locale
		this.selected = selected
		this.currencies = currencies

		$effect.root(() => {
			// load persisted currency
			const cookies = Object.fromEntries(
				document.cookie.split('; ').map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
			)
			const selected = cookies.currency
			if (selected && currencies.includes(selected)) {
				this.selected = selected
			}

			$effect.pre(() => {
				// persist the selection on change once initialized
				const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
				document.cookie = `currency=${this.selected}; path=/; expires=${expires.toUTCString()}`
			})

			// handle storage events to keep selected currency and cart in sync across tabs
			const handler = (e: StorageEvent) => {
				if (e.key === 'currency') {
					this.selected = (e.newValue as CurrencyCode) ?? selected
				}
			}

			return on(window, 'storage', handler)
		})
	}
}

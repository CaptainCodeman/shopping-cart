import { Cart } from '$lib/cart.svelte.js'
import { Currency } from '$lib/currency.svelte.js'

export async function load({ data }) {
	const { locale, currency: selected, currencies } = data

	const currency = new Currency(locale, selected, currencies)
	const cart = new Cart(currency)

	return {
		currency,
		cart
	}
}

// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Product } from '$lib/model/products'
import type { Currencies as CurrencyCode } from 'country-to-currency'
import { Cart } from '$lib/cart.svelte.test'
import { Currency } from '$lib/currency.svelte.test'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: string
			currency: CurrencyCode
			currencies: CurrencyCode[]
		}

		interface PageData {
			// locale: string
			// selected_currency: Currency
			// currencies: Currency[]
			products: Product[]
			currency: Currency
			cart: Cart
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

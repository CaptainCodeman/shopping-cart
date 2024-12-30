// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Product } from '$lib/model/products'
import type { Cart } from '$lib/cart.svelte'
import type { Currency } from '$lib/currency.svelte'
import type { CurrencyCode } from '$lib/currency'

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
			products: Product[]
			currency: Currency
			cart: Cart
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

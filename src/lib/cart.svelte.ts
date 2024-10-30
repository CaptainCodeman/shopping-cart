import { products } from './products'
import { Currency } from './currency.svelte'
import { on } from 'svelte/events'

interface Item {
	code: string
	count: number
}

export class Cart {
	// raw cart items
	items: Item[] = $state([])

	// cart lines (with price for selected currency and item count)
	lines = $derived(
		this.items.map((item) => {
			const product = products.find((product) => product.code === item.code)
			if (product) {
				const price = product.prices[this.currency.selected]!
				const total = price * item.count
				return { ...item, title: product.title, price, total }
			} else {
				return { ...item, title: 'no longer available', price: 0, total: 0 }
			}
		})
	)

	// total cart price in selected currency
	total = $derived(this.lines.reduce((total, line) => total + line.total, 0))

	// total cart item count
	count = $derived(this.lines.reduce((total, line) => total + line.count, 0))

	constructor(readonly currency: Currency) {
		$effect.root(() => {
			// load persisted cart items
			const items = localStorage.getItem('cart')
			if (items) {
				this.items = JSON.parse(items)
			}

			$effect.pre(() => {
				// persist cart items on change once initialized
				if (this.items.length) {
					localStorage.setItem('cart', JSON.stringify(this.items))
				} else {
					localStorage.removeItem('cart')
				}
			})

			// handle storage events to keep selected currency and cart in sync across tabs
			const handler = (e: StorageEvent) => {
				if (e.key === 'cart') {
					this.items = e.newValue ? JSON.parse(e.newValue) : []
				}
			}

			return on(window, 'storage', handler)
		})
	}

	// add a product to the cart
	add(code: string) {
		let item = this.items.find((item) => item.code === code)
		if (item) {
			item.count++
		} else {
			this.items.push({ code, count: 1 })
		}
	}

	// remove a product from the cart
	remove(code: string) {
		let item = this.items.find((item) => item.code === code)
		if (item && item.count) {
			item.count--
		}
	}

	// delete a line from the cart
	delete(code: string) {
		this.items = this.items.filter((item) => item.code !== code)
	}
}

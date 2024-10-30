import type { CurrencyCode } from './currency'

export interface Product {
	code: string
	title: string
	prices: Partial<Record<CurrencyCode, number>>
}

export const products: Product[] = [
	{
		code: '001',
		title: 'Coat',
		prices: {
			CAD: 54.99,
			EUR: 49.99,
			GBP: 79.99,
			USD: 45.99
		}
	},
	{
		code: '002',
		title: 'Gloves',
		prices: {
			CAD: 19.99,
			EUR: 24.99,
			GBP: 29.99,
			USD: 14.99
		}
	},
	{
		code: '003',
		title: 'Boots',
		prices: {
			CAD: 129.99,
			EUR: 149.99,
			GBP: 199.99,
			USD: 99.99
		}
	}
]

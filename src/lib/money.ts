const Currency = ['CAD', 'GBP', 'USD'] as const

type Currency = (typeof Currency)[number]

interface Money {
	currency: Currency
	amount: number
}

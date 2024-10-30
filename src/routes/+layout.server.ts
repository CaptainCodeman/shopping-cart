export async function load({ locals }) {
	const { locale, currency, currencies } = locals

	return {
		locale,
		currency,
		currencies
	}
}

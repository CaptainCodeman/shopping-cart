import type { CountryCode, CurrencyCode } from '$lib/currency'
import type { Cookies } from '@sveltejs/kit'
import countryToCurrency from 'country-to-currency'

// these would be defined in .env values for a single site, or from a database,
// based on the domain name, for a multi-tenanted ecommerce system ...
const default_currency: CurrencyCode = 'USD'
const supported_currencies: CurrencyCode[] = ['GBP', 'USD', 'CAD']

export async function handle({ event, resolve }) {
	const { cookies, locals, request } = event
	const { headers } = request

	const country = headers.get('x-client-country') ?? 'US'
	const acceptLanguage = headers.get('accept-language') ?? ''

	// use any selected currency, defaulting to the currency for their country if supported, or the default currency for the store
	locals.currency =
		currencyFromCookie(cookies) ??
		currencyFromCountry(country, supported_currencies) ??
		default_currency
	locals.currencies = supported_currencies

	// locale is used to disambiguate currency displays
	locals.locale = localeFromAcceptLanguage(acceptLanguage) ?? 'en-US'

	return await resolve(event)
}

function currencyFromCookie(cookies: Cookies) {
	return cookies.get('currency') as CurrencyCode
}

function currencyFromCountry(country: string, currencies: CurrencyCode[]) {
	const key = country.toUpperCase() as CountryCode
	const currency = countryToCurrency[key]
	if (currencies.includes(currency)) {
		return currency
	}
	return null
}

function localeFromAcceptLanguage(acceptLanguage: string) {
	const locales = acceptLanguage
		.split(',')
		.map((language) => {
			const [locale, q = 'q=1'] = language.split(';')
			const [_, value] = q.split('=')
			return {
				q: parseFloat(value),
				locale: locale.trim()
			}
		})
		.filter((value) => value.locale !== '*')
		.filter((value) => Intl.DateTimeFormat.supportedLocalesOf(value.locale))
		.sort((a, b) => b.q - a.q)

	return locales.length ? locales[0].locale : null
}

type CurrencyCode = string
type CountryCode = string

// This list was generated using Claude AI
const currencyToCountryMap: Record<CurrencyCode, CountryCode | null> = {
	AED: 'AE', // United Arab Emirates
	AFN: 'AF', // Afghanistan
	ALL: 'AL', // Albania
	AMD: 'AM', // Armenia
	ANG: 'CW', // Curaçao (also AN - Netherlands Antilles, but CW is more current)
	AOA: 'AO', // Angola
	ARS: 'AR', // Argentina
	AUD: 'AU', // Australia
	AWG: 'AW', // Aruba
	AZN: 'AZ', // Azerbaijan
	BAM: 'BA', // Bosnia and Herzegovina
	BBD: 'BB', // Barbados
	BDT: 'BD', // Bangladesh
	BGN: 'BG', // Bulgaria
	BHD: 'BH', // Bahrain
	BIF: 'BI', // Burundi
	BMD: 'BM', // Bermuda
	BND: 'BN', // Brunei
	BOB: 'BO', // Bolivia
	BOV: 'BO', // Bolivia (funds code)
	BRL: 'BR', // Brazil
	BSD: 'BS', // Bahamas
	BTN: 'BT', // Bhutan
	BWP: 'BW', // Botswana
	BYN: 'BY', // Belarus
	BZD: 'BZ', // Belize
	CAD: 'CA', // Canada
	CDF: 'CD', // Democratic Republic of the Congo
	CHE: 'CH', // Switzerland (complementary currency)
	CHF: 'CH', // Switzerland
	CHW: 'CH', // Switzerland (complementary currency)
	CLF: 'CL', // Chile (funds code)
	CLP: 'CL', // Chile
	CNY: 'CN', // China
	COP: 'CO', // Colombia
	COU: 'CO', // Colombia (funds code)
	CRC: 'CR', // Costa Rica
	CUC: 'CU', // Cuba (convertible peso)
	CUP: 'CU', // Cuba
	CVE: 'CV', // Cape Verde
	CZK: 'CZ', // Czech Republic
	DJF: 'DJ', // Djibouti
	DKK: 'DK', // Denmark
	DOP: 'DO', // Dominican Republic
	DZD: 'DZ', // Algeria
	EGP: 'EG', // Egypt
	ERN: 'ER', // Eritrea
	ETB: 'ET', // Ethiopia
	EUR: 'EU', // European Union (or use specific country codes like DE, FR, etc.)
	FJD: 'FJ', // Fiji
	FKP: 'FK', // Falkland Islands
	GBP: 'GB', // United Kingdom
	GEL: 'GE', // Georgia
	GHS: 'GH', // Ghana
	GIP: 'GI', // Gibraltar
	GMD: 'GM', // Gambia
	GNF: 'GN', // Guinea
	GTQ: 'GT', // Guatemala
	GYD: 'GY', // Guyana
	HKD: 'HK', // Hong Kong
	HNL: 'HN', // Honduras
	HRK: 'HR', // Croatia
	HTG: 'HT', // Haiti
	HUF: 'HU', // Hungary
	IDR: 'ID', // Indonesia
	ILS: 'IL', // Israel
	INR: 'IN', // India
	IQD: 'IQ', // Iraq
	IRR: 'IR', // Iran
	ISK: 'IS', // Iceland
	JMD: 'JM', // Jamaica
	JOD: 'JO', // Jordan
	JPY: 'JP', // Japan
	KES: 'KE', // Kenya
	KGS: 'KG', // Kyrgyzstan
	KHR: 'KH', // Cambodia
	KMF: 'KM', // Comoros
	KPW: 'KP', // North Korea
	KRW: 'KR', // South Korea
	KWD: 'KW', // Kuwait
	KYD: 'KY', // Cayman Islands
	KZT: 'KZ', // Kazakhstan
	LAK: 'LA', // Laos
	LBP: 'LB', // Lebanon
	LKR: 'LK', // Sri Lanka
	LRD: 'LR', // Liberia
	LSL: 'LS', // Lesotho
	LTL: 'LT', // Lithuania (historical, now uses EUR)
	LVL: 'LV', // Latvia (historical, now uses EUR)
	LYD: 'LY', // Libya
	MAD: 'MA', // Morocco
	MDL: 'MD', // Moldova
	MGA: 'MG', // Madagascar
	MKD: 'MK', // North Macedonia
	MMK: 'MM', // Myanmar
	MNT: 'MN', // Mongolia
	MOP: 'MO', // Macau
	MRO: 'MR', // Mauritania
	MUR: 'MU', // Mauritius
	MVR: 'MV', // Maldives
	MWK: 'MW', // Malawi
	MXN: 'MX', // Mexico
	MXV: 'MX', // Mexico (funds code)
	MYR: 'MY', // Malaysia
	MZN: 'MZ', // Mozambique
	NAD: 'NA', // Namibia
	NGN: 'NG', // Nigeria
	NIO: 'NI', // Nicaragua
	NOK: 'NO', // Norway
	NPR: 'NP', // Nepal
	NZD: 'NZ', // New Zealand
	OMR: 'OM', // Oman
	PAB: 'PA', // Panama
	PEN: 'PE', // Peru
	PGK: 'PG', // Papua New Guinea
	PHP: 'PH', // Philippines
	PKR: 'PK', // Pakistan
	PLN: 'PL', // Poland
	PYG: 'PY', // Paraguay
	QAR: 'QA', // Qatar
	RON: 'RO', // Romania
	RSD: 'RS', // Serbia
	RUB: 'RU', // Russia
	RWF: 'RW', // Rwanda
	SAR: 'SA', // Saudi Arabia
	SBD: 'SB', // Solomon Islands
	SCR: 'SC', // Seychelles
	SDG: 'SD', // Sudan
	SEK: 'SE', // Sweden
	SGD: 'SG', // Singapore
	SHP: 'SH', // Saint Helena
	SLL: 'SL', // Sierra Leone
	SOS: 'SO', // Somalia
	SRD: 'SR', // Suriname
	SSP: 'SS', // South Sudan
	STD: 'ST', // São Tomé and Príncipe
	SYP: 'SY', // Syria
	SZL: 'SZ', // Eswatini
	THB: 'TH', // Thailand
	TJS: 'TJ', // Tajikistan
	TMT: 'TM', // Turkmenistan
	TND: 'TN', // Tunisia
	TOP: 'TO', // Tonga
	TRY: 'TR', // Turkey
	TTD: 'TT', // Trinidad and Tobago
	TWD: 'TW', // Taiwan
	TZS: 'TZ', // Tanzania
	UAH: 'UA', // Ukraine
	UGX: 'UG', // Uganda
	USD: 'US', // United States
	USN: 'US', // United States (funds code)
	USS: 'US', // United States (funds code)
	UYI: 'UY', // Uruguay (funds code)
	UYU: 'UY', // Uruguay
	UZS: 'UZ', // Uzbekistan
	VEF: 'VE', // Venezuela
	VND: 'VN', // Vietnam
	VUV: 'VU', // Vanuatu
	WST: 'WS', // Samoa
	XAF: 'CF', // Central African Republic (also used by other Central African countries)
	XCD: 'AG', // Antigua and Barbuda (also used by other Eastern Caribbean countries)
	XOF: 'BF', // Burkina Faso (also used by other West African countries)
	XPF: 'PF', // French Polynesia (also used by other French Pacific territories)
	YER: 'YE', // Yemen
	ZAR: 'ZA', // South Africa
	ZMW: 'ZM', // Zambia
	EEK: 'EE', // Estonia (historical, now uses EUR)
	// Special codes (precious metals, testing, etc.) - no country codes
	XAG: null, // Silver
	XAU: null, // Gold
	XBA: null, // European Composite Unit
	XBB: null, // European Monetary Unit
	XBC: null, // European Unit of Account 9
	XBD: null, // European Unit of Account 17
	XDR: null, // Special drawing rights
	XFU: null, // UIC franc
	XPD: null, // Palladium
	XPT: null, // Platinum
	XTS: null, // Testing purposes
	XXX: null // No currency
}

const getCountryCodeByCurrency = (currencyCode: string): CountryCode | null => {
	if (!currencyCode) {
		return null
	}

	const upperCurrencyCode = currencyCode.toUpperCase()
	return currencyToCountryMap[upperCurrencyCode] || null
}

export {
	getCountryCodeByCurrency,
	currencyToCountryMap,
	type CurrencyCode,
	type CountryCode
}

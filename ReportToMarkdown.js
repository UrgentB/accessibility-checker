export function ReportToMarkdown(input, opts = {}) {
	const CHECKS_DOC =
		opts.checksDocUrl ||
		'https://docs.google.com/document/d/1XP8PwSlz9eApskQ6nfU7lHmTsaZMTaMAB5raIS3eTFo/edit?usp=sharing'
	const WCAG_URL = opts.wcagUrl || 'https://www.w3.org/TR/WCAG21/'

	const data = typeof input === 'string' ? JSON.parse(input) : input || {}
	const root = data.result || data

	const url = safeStr(root.url)
	const gr = root.generalResult || {}
	const total = toNum(gr.totalChecks)
	const ok = toNum(gr.successfulChecks)
	const fail = toNum(gr.failChecks)

	const rawFails = Array.isArray(root.failsDescription)
		? root.failsDescription
		: []
	const fails = rawFails
		.map(entry => {
			const raw = entry?.occuredErrors
			const errs = Array.isArray(raw) ? raw : raw ? [raw] : []
			const real = errs.filter(isRealError)
			return real.length
				? {
						idElement: entry?.idElement ?? null,
						pathElement: entry?.pathElement ?? '',
						occuredErrors: real,
				  }
				: null
		})
		.filter(Boolean)

	const md = []

	md.push('# Accessibility Report', '')
	md.push(`**Verified URL:** \`${url}\`  `)
	md.push(`**Total checked rules:** \`${total}\`  `)
	md.push(`**Successfully checked rules:** \`${ok}\`  `)
	md.push(`**Unsuccessfully checked rules:** \`${fail}\``)
	md.push('', '---')
	md.push(`To meet with checks description - visit ${CHECKS_DOC}`)
	md.push('---')
	md.push(
		`For more accessability recomendations visit WCAG documentation - ${WCAG_URL}`
	)
	md.push('---', '')

	md.push('# Errors', '')

	if (fails.length === 0) {
		return md.join('\n')
	}

	for (const entry of fails) {
		const idEl = backtick(safeStr(entry.idElement))
		const pathEl = backtick(safeStr(entry.pathElement))
		md.push(`**ID of Element:** ${idEl}  `)
		md.push(`**Path of Element:** ${pathEl}`, '')

		for (const e of entry.occuredErrors) {
			const idError = backtick(String(e?.idError ?? ''))
			const desc = backtick(safeStr(e?.descriptionError))
			const req = backtick(safeStr(e?.WCAGrequirement))
			md.push('ID Error - Description - WCAG Requirement', '')
			md.push(`${idError} - ${desc} - ${req}`, '')
		}
		md.push('---', '')
	}

	return md.join('\n')
}

function safeStr(v) {
	return v == null ? '' : String(v)
}

function toNum(v) {
	const n = Number(v)
	return Number.isFinite(n) ? n : 0
}

function backtick(s) {
	return '`' + String(s).replace(/`/g, '\\`') + '`'
}

function isRealError(e) {
	if (!e) return false
	return (
		hasText(e.idError) ||
		hasText(e.descriptionError) ||
		hasText(e.WCAGrequirement)
	)
}

function hasText(v) {
	if (v == null) return false
	const s = String(v).trim()
	return s !== ''
}

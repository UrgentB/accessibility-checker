const btn = document.getElementById('scan-btn')
const statusEl = document.getElementById('status')

const scanView = document.getElementById('scan-view')
const resultView = document.getElementById('result-view')

const fileNameEl = document.getElementById('file-name')
const fileUrlEl = document.getElementById('file-url')
const fileSizeEl = document.getElementById('file-size')

const downloadBtn = document.getElementById('download-btn')
const backBtn = document.getElementById('back-btn')

let isScanning = false
const MIN_ANIMATION_MS = 5000

// храним последний отчёт как строку JSON и имя файла
let lastReportJson = null
let lastFileName = null

btn.addEventListener('click', () => {
	if (isScanning) return // защита от двойного клика

	isScanning = true
	btn.classList.add('scan-button--scanning')
	btn.disabled = true
	statusEl.textContent = 'Сканирую страницу...'

	const start = Date.now()

	performScan()
		.then(report => {
			const elapsed = Date.now() - start
			const remaining = Math.max(0, MIN_ANIMATION_MS - elapsed)

			setTimeout(() => {
				try {
					prepareReport(report)
					showResultView()
				} catch (e) {
					console.error(e)
					statusEl.textContent = 'Ошибка при подготовке отчёта.'
				} finally {
					stopScanning()
				}
			}, remaining)
		})
		.catch(err => {
			console.error(err)
			statusEl.textContent = err.message || 'Ошибка при сканировании.'
			stopScanning()
		})
})

downloadBtn.addEventListener('click', () => {
	if (!lastReportJson || !lastFileName) {
		statusEl.textContent = 'Отчёт ещё не подготовлен.'
		return
	}
	try {
		downloadReport(lastReportJson, lastFileName)
		statusEl.textContent = 'JSON-файл скачан.'
	} catch (e) {
		console.error(e)
		statusEl.textContent = 'Ошибка при скачивании.'
	}
})

backBtn.addEventListener('click', () => {
	showScanView()
	statusEl.textContent = ''
})

function stopScanning() {
	isScanning = false
	btn.classList.remove('scan-button--scanning')
	btn.disabled = false
}

/**
 * Переключение видов
 */
function showScanView() {
	scanView.hidden = false
	resultView.hidden = true
}

function showResultView() {
	scanView.hidden = true
	resultView.hidden = false
	statusEl.textContent = 'Отчёт готов. Нажмите «Скачать JSON» или «Новый скан».'
}

/**
 * Запускает сканирование страницы в активной вкладке.
 * Возвращает Promise с объектом отчёта (url, timestamp, tree).
 */
function performScan() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			if (chrome.runtime.lastError) {
				reject(new Error('tabs.query: ' + chrome.runtime.lastError.message))
				return
			}

			const tab = tabs && tabs[0]

			if (!tab || !tab.id) {
				reject(new Error('Не удалось найти активную вкладку.'))
				return
			}

			const url = tab.url || ''

			// Не работаем с chrome:// и прочими системными страницами
			if (!/^https?:|^file:/i.test(url)) {
				reject(
					new Error(
						'Эта вкладка — системная (chrome:// и т.п.). С неё нельзя собрать DOM.'
					)
				)
				return
			}

			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					func: () => {
						// Этот код выполняется в контексте страницы

						function serializeNode(node) {
							// Элемент
							if (node.nodeType === 1) {
								const tag = node.tagName.toLowerCase()

								// Пропускаем script и style
								if (tag === 'script' || tag === 'style') {
									return null
								}

								const res = {
									type: 'element',
									tag,
								}

								// Атрибуты
								if (node.attributes && node.attributes.length > 0) {
									const attrs = {}
									for (let i = 0; i < node.attributes.length; i++) {
										const attr = node.attributes[i]
										attrs[attr.name] = attr.value
									}
									if (Object.keys(attrs).length > 0) {
										res.attrs = attrs
									}
								}

								// iframe: содержимое кросс-доменных фреймов не достать
								if (tag === 'iframe') {
									res.note = 'iframe-content-not-captured'
									return res
								}

								// Дочерние узлы
								const children = []
								for (let i = 0; i < node.childNodes.length; i++) {
									const child = node.childNodes[i]
									const serializedChild = serializeNode(child)
									if (serializedChild) {
										children.push(serializedChild)
									}
								}
								if (children.length > 0) {
									res.children = children
								}

								return res
							}

							// Текстовый узел
							if (node.nodeType === 3) {
								const text = node.textContent.trim()
								if (!text) {
									return null
								}
								return {
									type: 'text',
									text,
								}
							}

							// Остальное (комментарии и т.п.) пропускаем
							return null
						}

						const tree = serializeNode(document.documentElement)

						return {
							url: location.href,
							timestamp: new Date().toISOString(),
							tree,
						}
					},
				},
				results => {
					if (chrome.runtime.lastError) {
						reject(
							new Error('executeScript: ' + chrome.runtime.lastError.message)
						)
						return
					}

					if (!results || !results.length) {
						reject(new Error('Нет результатов от executeScript.'))
						return
					}

					const report = results[0].result
					resolve(report)
				}
			)
		})
	})
}

/**
 * Готовит строку JSON, имя файла и заполняет UI карточки.
 */
function prepareReport(report) {
	const jsonText = JSON.stringify(report, null, 2)
	lastReportJson = jsonText

	const host = new URL(report.url).hostname
	const safeHost = host.replace(/[^a-z0-9.-]/gi, '_')
	const ts = report.timestamp.replace(/[:.]/g, '-')
	const fileName = `dom-tree-${safeHost}-${ts}.json`
	lastFileName = fileName

	// оценим размер
	const blob = new Blob([jsonText], { type: 'application/json' })
	const sizeKb = Math.max(1, Math.round(blob.size / 1024))

	fileNameEl.textContent = fileName
	fileUrlEl.textContent = host
	fileSizeEl.textContent = `~${sizeKb} KB`
}

/**
 * Скачивает отчёт как JSON-файл.
 */
function downloadReport(jsonText, fileName) {
	const blob = new Blob([jsonText], { type: 'application/json' })
	const objUrl = URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.href = objUrl
	a.download = fileName

	document.body.appendChild(a)
	a.click()
	a.remove()
	URL.revokeObjectURL(objUrl)
}

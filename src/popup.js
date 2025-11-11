import * as consts from './consts.js';

// храним последний отчёт как строку JSON и имя файла
let lastReportJson = null
let lastFileName = null
let isScanning = false

consts.btn.addEventListener('click', async () => {
	if (isScanning) return // защита от двойного клика

	isScanning = true
	consts.btn.classList.add('scan-button--scanning')
	consts.btn.disabled = true
	consts.statusEl.textContent = 'Сканирую страницу...'

	performScan().then(async (tab) => {
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['./node_modules/axe-core/axe.min.js']
		});
	
		const [{ result }] = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: () => {
			return axe.run(document, {
				runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
			});
			}
		});

		prepareReport(result)
		showResultView()
		stopScanning()

		console.log('Axe results:', result);
	}, error => {
		consts.statusEl.textContent = error.message || 'Ошибка при сканировании.'
		stopScanning()
	});
})

/**
 * Запускает сканирование страницы в активной вкладке.
 * Возвращает Promise с объектом отчёта (url, timestamp, tree).
 */
function performScan() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(new Error('tabs.query: ' + chrome.runtime.lastError.message));
        return;
      }

      const tab = tabs && tabs[0];
      if (!tab || !tab.id) {
        reject(new Error('Не удалось найти активную вкладку.'));
        return;
      }

      const url = tab.url || '';
      if (!/^https?:|^file:/i.test(url)) {
        reject(
          new Error(
            'Эта вкладка — системная (chrome:// и т.п.). С неё нельзя собрать DOM.'
          )
        );
        return;
      }

      resolve(tab);
    });
  });
}

consts.downloadBtn.addEventListener('click', () => {
	if (!lastReportJson || !lastFileName) {
		consts.statusEl.textContent = 'Отчёт ещё не подготовлен.'
		return
	}
	try {
		downloadReport(lastReportJson, lastFileName)
		consts.statusEl.textContent = 'JSON-файл скачан.'
	} catch (e) {
		console.error(e)
		consts.statusEl.textContent = 'Ошибка при скачивании.'
	}
})

consts.backBtn.addEventListener('click', () => {
	showScanView()
	consts.statusEl.textContent = ''
})

function stopScanning() {
	isScanning = false
	consts.btn.classList.remove('scan-button--scanning')
	consts.btn.disabled = false
}

/**
 * Переключение видов
 */
function showScanView() {
	consts.scanView.hidden = false
	consts.resultView.hidden = true
}

function showResultView() {
	consts.scanView.hidden = true
	consts.resultView.hidden = false
	consts.statusEl.textContent = 'Отчёт готов. Нажмите «Скачать JSON» или «Новый скан».'
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
	const fileName = `report-${safeHost}-${ts}.json`
	lastFileName = fileName

	// оценим размер
	const blob = new Blob([jsonText], { type: 'application/json' })
	const sizeKb = Math.max(1, Math.round(blob.size / 1024))

	consts.fileNameEl.textContent = fileName
	consts.fileUrlEl.textContent = host
	consts.fileSizeEl.textContent = `~${sizeKb} KB`
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

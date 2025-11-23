const statusEl = document.getElementById('status')

const scanView = document.getElementById('scan-view')
const resultView = document.getElementById('result-view')

const fileNameEl = document.getElementById('file-name')
const fileUrlEl = document.getElementById('file-url')
const fileSizeEl = document.getElementById('file-size')

const btn = document.getElementById('scan-btn')
const downloadBtn = document.getElementById('download-btn')
const backBtn = document.getElementById('back-btn')

let lastReportJson = null;
let lastFileName = null;
let isScanning = false;

btn.addEventListener('click', async () => {
	if (isScanning) return;

	isScanning = true;
	updateScanButton(true);
	statusEl.textContent = 'Сканирую страницу...';

	try {
		const tab = await getTargetTab();
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: [
				'./analisator/domTreeRunner.js'
			],
		});

		const result = await initScan(tab);
		await prepareReport(result);
		await showResultView();
	} catch (error) {
		console.error(error);
		statusEl.textContent = error.message || 'Ошибка при сканировании.';
	} finally {
		stopScanning();
	}
});

/**
 * Get target tab (active by default)
 */
function getTargetTab() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (chrome.runtime.lastError) {
				return reject(new Error('tabs.query: ' + chrome.runtime.lastError.message));
			}

			const tab = tabs?.[0];
			if (!tab?.id) {
				return reject(new Error('Не удалось найти активную вкладку.'));
			}

			const url = tab.url || '';
			if (!/^https?:|^file:/i.test(url)) {
				return reject(new Error('Эта вкладка — системная (chrome:// и т.п.). С неё нельзя собрать DOM.'));
			}

			resolve(tab);
		});
	});
}

/**
 * Init page scan
 */
async function initScan(tab) {
	const [{ result }] = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
			return window.treeBypass(document.documentElement);
		},
	});
	return result;
}

/**
 * Update btn states
 */
function updateScanButton(isActive) {
	btn.disabled = isActive;
	btn.classList.toggle('scan-button--scanning', isActive);
}

/**
 * Stop scanning
 */
function stopScanning() {
	isScanning = false;
	updateScanButton(false);
}

/**
 * Display scan page
 */
function showScanView() {
	scanView.hidden = false;
	resultView.hidden = true;
}

/**
 * Display result page
 */
function showResultView() {
	scanView.hidden = true;
	resultView.hidden = false;
	statusEl.textContent = 'Отчёт готов. Нажмите «Скачать JSON» или «Новый скан».';
}

/**
 * Create report, update UI
 */
function prepareReport(report) {
	const jsonText = JSON.stringify(report, null, 2);
	lastReportJson = jsonText;

	const host = new URL(report.url).hostname;
	const safeHost = host.replace(/[^a-z0-9.-]/gi, '_');
	const ts = report.timestamp.replace(/[:.]/g, '-');
	const fileName = `report-${safeHost}-${ts}.json`;
	lastFileName = fileName;

	const blob = new Blob([jsonText], { type: 'application/json' });
	const sizeKb = Math.max(1, Math.round(blob.size / 1024));

	fileNameEl.textContent = fileName;
	fileUrlEl.textContent = host;
	fileSizeEl.textContent = `~${sizeKb} KB`;
}

/**
 * Download report as JSON file
 */
function downloadReport(jsonText, fileName) {
	const blob = new Blob([jsonText], { type: 'application/json' });
	const objUrl = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = objUrl;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(objUrl);
}

/**
 * Download button listener
 */
downloadBtn.addEventListener('click', () => {
	if (!lastReportJson || !lastFileName) {
		statusEl.textContent = 'Отчёт ещё не подготовлен.';
		return;
	}
	try {
		downloadReport(lastReportJson, lastFileName);
		statusEl.textContent = 'JSON-файл скачан.';
	} catch (e) {
		console.error(e);
		statusEl.textContent = 'Ошибка при скачивании.';
	}
});

/**
 * Back button listener
 */
backBtn.addEventListener('click', () => {
	showScanView();
	statusEl.textContent = '';
});
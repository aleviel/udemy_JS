'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const rubVal = document.querySelector('#rub'),
		usdVal = document.querySelector('#usd'),
		convertBtn = document.querySelector('button'),
		url = 'https://www.cbr-xml-daily.ru/daily_json.js';

	convertBtn.addEventListener('click', (e) => {
		fetch(url)
			.then(data => data.json())
			.then(data => {
				usdVal.value = (rubVal.value / data.Valute.USD.Value).toFixed(2);
			}
			);
	});
});
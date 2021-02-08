'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const rubVal = document.querySelector('#rub'),
		usdVal = document.querySelector('#usd'),
		url = './js/current.json';
	// url = 'https://www.cbr-xml-daily.ru/daily_json.js';

	rubVal.addEventListener('input', (e) => {
		const request = new XMLHttpRequest();
		request.open("GET", url);
		request.setRequestHeader('Content-type', 'Application/json utf-8');
		request.send();

		request.addEventListener('readystatechange', () => {
			if (request.status == 200 && request.readyState == 4) {
				const data = JSON.parse(request.response);
				usdVal.value = (+rubVal.value / data.current.usd).toFixed(2);
			} else {
				usdVal.value = 'error';
			}
		});
	});

});
import addZero from './addZero';

function timer(timerSelector, deadLine) {

	function mathTime(deadline) {
		const
			now = new Date(),
			finish = new Date(deadline),
			totalRemaining = finish - now,
			daysRemaining = Math.floor((finish - now) / 1000 / 60 / 60 / 24),
			hoursRemaining = Math.floor((finish - now) / 1000 / 60 / 60 % 24),
			minutesRemaining = Math.floor((finish - now) / 1000 / 60 % 60),
			secondsRemaining = Math.floor((finish - now) / 1000 % 60);

		return {
			totalRemaining,
			daysRemaining,
			hoursRemaining,
			minutesRemaining,
			secondsRemaining
		};
	}

	function setClock(selector, endTime) {

		const
			timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');

		updateClock();

		let timerId = setTimeout(function timeT() {
			updateClock();
			timerId = setTimeout(timeT, 1000);
		}, 1000);

		function updateClock() {
			const time = mathTime(endTime);

			days.textContent = addZero(time.daysRemaining);
			hours.textContent = addZero(time.hoursRemaining);
			minutes.textContent = addZero(time.minutesRemaining);
			seconds.textContent = addZero(time.secondsRemaining);

			if (time.totalRemaining <= 0) {
				clearInterval(timerId);
			}
		}
	}

	setClock(timerSelector, deadLine);
}

export default timer;
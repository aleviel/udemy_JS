document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items'),
		deadLine = '2021-12-31T17:00:00';

	function showContent(i = 0) {
		tabContents[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}

	function hideContent() {
		tabContents.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

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

	function addZero(num) {
		if (num < 10 && num >= 0) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endTime) {

		const
			// resetBtn = document.createElement('button'),
			timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');

		// resetBtn.textContent = 'reset';
		// timer.append(resetBtn);
		// resetBtn.addEventListener('click', () => {
		// 	clearInterval(timerId);
		// });

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

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		tabs.forEach((item, i) => {
			if (target && target == item) {
				hideContent();
				showContent(i);
			}
		});

	});


	hideContent();
	showContent();
	setClock('.timer', deadLine);

});

document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items'),
		deadLine = '2021-12-31T17:00:00',
		modalBtns = document.querySelectorAll('[data-modalBtn]'),
		modal = document.querySelector('[data-modalWindow]'),
		modalTimerId = setTimeout(timerFunc, 5000),
		forms = document.querySelectorAll('form'),
		statusMsg = {
			loading: "loading...",
			success: "done",
			error: "error"
		};

	function timerFunc() {
		openModal();
	}

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

	function closeModal() {
		modal.style.display = "none";
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	function openModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modal.style.display = "block";
			document.body.style.overflow = "hidden";
			clearInterval(modalTimerId);
			window.removeEventListener('scroll', openModalByScroll);
		}
	}

	hideContent();
	showContent();
	setClock('.timer', deadLine);

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		tabs.forEach((item, i) => {
			if (target && target == item) {
				hideContent();
				showContent(i);
			}
		});

	});

	modalBtns.forEach((item) => {
		item.addEventListener('click', () => {
			openModal();
		});
	});

	modal.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('modal__close') || target.classList.contains('modal')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == "Escape") {
			closeModal();
		}
	});

	window.addEventListener('scroll', openModalByScroll);


	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
			if (this.classes.length == 0) {
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => {
					element.classList.add(className);
				});
			}
			this.parent.append(element);
		}
	}

	const getDataFrom = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}. ${res.status}`);
		}
		return await res.json();
	};

	getDataFrom('http://localhost:3000/menu')
		.then(data =>
			data.forEach(({ img, altimg, title, descr, price }) =>
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render())
		);

	const postDataTo = async (url, data) => {
		const json = JSON.stringify(data);
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: json
		});
		return await res.json();
	};

	function postData(form) {

		const formData = new FormData(form);
		const obj = {};
		const urlForPosts = 'http://localhost:3000/requests';

		const statusMsgBox = document.createElement('div');
		statusMsgBox.textContent = statusMsg.loading;
		form.append(statusMsgBox);

		formData.forEach((value, key) => {
			obj[key] = value;
		});
		console.log(obj);

		postDataTo(urlForPosts, obj)
			.then(data => {
				console.log(data);
				statusMsgBox.textContent = statusMsg.success;
			})
			.catch(() => {
				statusMsgBox.textContent = statusMsg.error;
			})
			.finally(() => {
				form.reset();
				setTimeout(() => {
					statusMsgBox.remove();
				}, 2000);
			});
	}

	forms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			postData(form);
		});
	});

	const
		currentSlide = document.querySelector('#current'),
		totalSlides = document.querySelector('#total'),
		slides = document.querySelectorAll('.offer__slide'),
		prevArr = document.querySelector('.offer__slider-prev'),
		nextArr = document.querySelector('.offer__slider-next');
	let
		index = 1;

	function showSlide(n) {
		if (n > slides.length) {
			index = 1;
		} else if (n < 1) {
			index = slides.length;
		}

		slides.forEach(item => {
			item.style.display = 'none';
		});

		slides[index - 1].style.display = 'block';
		currentSlide.textContent = addZero(index);

	}

	function plusSlide(n) {
		showSlide(index += n);
	}

	prevArr.addEventListener('click', (e) => {
		plusSlide(-1);
	});

	nextArr.addEventListener('click', (e) => {
		plusSlide(1);
	});

	showSlide(index);
	totalSlides.textContent = addZero(slides.length);

});

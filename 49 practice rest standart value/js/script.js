document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items'),
		deadLine = '2021-12-31T17:00:00',
		modalBtns = document.querySelectorAll('[data-modalBtn]'),
		modal = document.querySelector('[data-modalWindow]'),
		modalTimerId = setTimeout(timerFunc, 5000);

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
				console.log('standart');
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => {
					element.classList.add(className);
				});
			}
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		'500',
		'.menu .container'
	).render();

	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода	в ресторан!',
		'1100',
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие	продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских cтейков. ',
		'970',
		'.menu .container',
		'menu__item'
	).render();

});

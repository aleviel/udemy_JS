/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/addZero.js":
/*!*******************************!*\
  !*** ./js/modules/addZero.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addZero)
/* harmony export */ });
function addZero(num) {
	if (num < 10 && num >= 0) {
		return `0${num}`;
	} else {
		return num;
	}
}


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const calcResult = document.querySelector('.calculating__result span');
	let height, weight, age, gender, ratio;

	if (localStorage.getItem('gender')) {
		gender = localStorage.getItem('gender');
	} else {
		gender = 'female';
		localStorage.setItem('gender', gender)
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.55;
		localStorage.setItem('ratio', ratio);
	}


	function calculatingResult() {
		if (!height || !weight || !age) {
			calcResult.textContent = '____';
			return;
		}
		if (gender == "male") {
			calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		} else {
			calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		}
	}

	calculatingResult();

	function getStaticInf(Selector, activeClass) {
		const elements = document.querySelectorAll(`${Selector}`);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('gender')) {
				elem.classList.add(activeClass);
			} else if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}

			elem.addEventListener('click', (e) => {
				elements.forEach(elem => elem.classList.remove(activeClass));
				e.target.classList.add(activeClass);
				if (e.target.getAttribute('data-ratio')) {
					ratio = +(e.target.getAttribute('data-ratio'));
					localStorage.setItem('ratio', ratio);
				} else {
					gender = e.target.getAttribute('id');
					localStorage.setItem('gender', gender);
				}
				calculatingResult();
			});
		});

	}

	function getDynamicInf(Selector) {
		const elements = document.querySelectorAll(`${Selector}`);

		elements.forEach(elem => {
			elem.addEventListener('input', (e) => {

				if (e.target.value.match(/\D/)) {
					e.target.style.border = 'solid red 1px';
				} else {
					e.target.style.border = '';
				}

				if (e.target.getAttribute('id') === 'height') {
					height = +(e.target.value);
				} else if (e.target.getAttribute('id') === 'weight') {
					weight = +(e.target.value);
				} else if (e.target.getAttribute('id') === 'age') {
					age = +(e.target.value);
				}
				calculatingResult();
			});
		});
	}



	getStaticInf('.calculating__choose_big div', 'calculating__choose-item_active');
	getStaticInf('#gender div', 'calculating__choose-item_active');
	getDynamicInf('.calculating__choose_medium input');

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/data */ "./js/modules/services/data.js");


function cards(BD, container) {

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

	(0,_services_data__WEBPACK_IMPORTED_MODULE_0__.getDataFrom)(BD)
		.then(data =>
			data.forEach(({ img, altimg, title, descr, price }) =>
				new MenuCard(img, altimg, title, descr, price, container).render())
		);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/data */ "./js/modules/services/data.js");


function forms(formsSelector, urlForPosts) {

	const allForms = document.querySelectorAll(formsSelector);

	function postData(form, urlForPosts) {
		const statusMsg = {
			loading: "loading...",
			success: "done",
			error: "error"
		};

		const formData = new FormData(form);
		const obj = {};

		const statusMsgBox = document.createElement('div');
		statusMsgBox.textContent = statusMsg.loading;
		form.append(statusMsgBox);

		formData.forEach((value, key) => {
			obj[key] = value;
		});
		console.log(obj);

		(0,_services_data__WEBPACK_IMPORTED_MODULE_0__.postDataTo)(urlForPosts, obj)
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

	allForms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			postData(form, urlForPosts);
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(Btns, modalWindow, ) {
	const
		modalBtns = document.querySelectorAll(Btns),
		modal = document.querySelector(modalWindow),
		modalTimerId = setTimeout(timerFunc, 5000);

	function timerFunc() {
		openModal();
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/services/data.js":
/*!*************************************!*\
  !*** ./js/modules/services/data.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataFrom": () => (/* binding */ getDataFrom),
/* harmony export */   "postDataTo": () => (/* binding */ postDataTo)
/* harmony export */ });
const getDataFrom = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}. ${res.status}`);
	}
	return await res.json();
};


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



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addZero */ "./js/modules/addZero.js");


function slider(currentSlideField, totalSlidesField, slide, prevArrSelector, nextArrSelector) {

	const
		currentSlide = document.querySelector(currentSlideField),
		totalSlides = document.querySelector(totalSlidesField),
		slides = document.querySelectorAll(slide),
		prevArr = document.querySelector(prevArrSelector),
		nextArr = document.querySelector(nextArrSelector);
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
		currentSlide.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(index);

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
	totalSlides.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(slides.length);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(buttons, content, parentDiv, active) {

	const tabs = document.querySelectorAll(buttons),
		tabContents = document.querySelectorAll(content),
		tabsParent = document.querySelector(parentDiv);

	function showContent(i = 0) {
		tabContents[i].style.display = 'block';
		tabs[i].classList.add(active);
	}

	function hideContent() {
		tabContents.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove(active);
		});
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addZero */ "./js/modules/addZero.js");


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

			days.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(time.daysRemaining);
			hours.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(time.hoursRemaining);
			minutes.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(time.minutesRemaining);
			seconds.textContent = (0,_addZero__WEBPACK_IMPORTED_MODULE_0__.default)(time.secondsRemaining);

			if (time.totalRemaining <= 0) {
				clearInterval(timerId);
			}
		}
	}

	setClock(timerSelector, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");








document.addEventListener('DOMContentLoaded', () => {
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__.default)('.timer', '2021-12-31T17:00:00');
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)('#current', '#total', '.offer__slide', '.offer__slider-prev', '.offer__slider-next');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)('http://localhost:3000/menu', '.menu .container');
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', 'http://localhost:3000/requests');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.default)('[data-modalBtn]', '[data-modalWindow]');

});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
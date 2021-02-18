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
export default calc;
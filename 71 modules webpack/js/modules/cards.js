import { getDataFrom } from './services/data';

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

	getDataFrom(BD)
		.then(data =>
			data.forEach(({ img, altimg, title, descr, price }) =>
				new MenuCard(img, altimg, title, descr, price, container).render())
		);


}

export default cards;
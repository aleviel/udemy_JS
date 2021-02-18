import timer from './modules/timer';
import tabs from './modules/tabs';
import slider from './modules/slider';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
	timer('.timer', '2021-12-31T17:00:00');
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	slider('#current', '#total', '.offer__slide', '.offer__slider-prev', '.offer__slider-next');
	cards('http://localhost:3000/menu', '.menu .container');
	calc();
	forms('form', 'http://localhost:3000/requests');
	modal('[data-modalBtn]', '[data-modalWindow]');

});
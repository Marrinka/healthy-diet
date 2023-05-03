import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
	const modalTimer = setTimeout(() => openModal('.modal'), 6000);
	calc();
	cards();
	forms(modalTimer, 'form');
	modal('[data-modal]', '.modal', modalTimer);
	slider({
		next: '.offer__slider-next',
		prev: '.offer__slider-prev',
		slide: '.offer__slide',
		curr: '#current',
		totalNum: '#total',
		slidesWrapper: '.offer__slider-wrapper',
		slidesInner: '.offer_slider-inner',
		container: '.offer__slider'
	});
	tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active');
	timer('2023-05-20');
});
/******/ (function() { // webpackBootstrap
/******/ 	'use strict';
	/******/ 	var __webpack_modules__ = ({

		/***/ './js/modules/calc.js':
		/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			function calc() {
				const result = document.querySelector('.calculating__result span');
				let sex, activity, height, weight, age;
				if (!localStorage.getItem('sex')) localStorage.setItem('sex', 'female');
				sex = localStorage.getItem('sex');
				if (!localStorage.getItem('activity')) localStorage.setItem('activity', 1.375);
				activity = localStorage.getItem('activity');
				function initCalc(parentSelector, activeClass) {
					const elements = document.querySelectorAll(`${parentSelector} div`);
					elements.forEach(el => {
						el.classList.remove(activeClass);
						if (el.getAttribute('data-active') === localStorage.getItem('activity')) el.classList.add(activeClass);
						if (el.getAttribute('id') === localStorage.getItem('sex')) el.classList.add(activeClass);
					});
				}
				initCalc();
				function calcResult() {
					if (!sex || !activity || !height || !weight || !age) {
						result.innerText = '____';
					} else {
						if (sex == 'female') {
							result.innerText = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
						} else {
							result.innerText = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
						}
					}
				}
				initCalc('#gender', 'calculating__choose-item_active');
				initCalc('.calculating__choose_big', 'calculating__choose-item_active');
				function getStaticInf(parentSelector, activeClass) {
					const elements = document.querySelectorAll(`${parentSelector} div`);
					elements.forEach(el => {
						el.addEventListener('click', e => {
							if (e.target.getAttribute('data-active')) {
								activity = +e.target.getAttribute('data-active');
								localStorage.setItem('activity', activity);
							} else {
								sex = e.target.id;
								localStorage.setItem('sex', sex);
							}
							elements.forEach(el => el.classList.remove(activeClass));
							e.target.classList.add(activeClass);
							calcResult();
						});
					});
				}
				getStaticInf('#gender', 'calculating__choose-item_active');
				getStaticInf('.calculating__choose_big', 'calculating__choose-item_active');
				function getDynamicInf(inputId) {
					const input = document.querySelector(inputId);
					input.addEventListener('input', () => {
						if (input.value.match(/\D/)) {
							input.style.border = '1px solid red';
						} else {
							input.style.border = 'none';
						}
						switch (input.getAttribute('id')) {
						case 'height':
							height = +input.value;
							break;
						case 'weight':
							weight = +input.value;
							break;
						case 'age':
							age = +input.value;
							break;
						}
						calcResult();
					});
				}
				getDynamicInf('#height');
				getDynamicInf('#weight');
				getDynamicInf('#age');
			}
			/* harmony default export */ __webpack_exports__['default'] = (calc);

			/***/ }),

		/***/ './js/modules/cards.js':
		/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ './js/services/services.js');

			function cards() {
				class MenuCard {
					constructor(src, alt, title, descr, price, parentTag) {
						this.src = src;
						this.alt = alt;
						this.title = title;
						this.descr = descr;
						this.price = price;
						this.transfer = 27;
						this.parent = document.querySelector(parentTag);
						this.changePrice();
						for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
							classes[_key - 6] = arguments[_key];
						}
						this.classes = classes;
					}
					changePrice() {
						return this.price * this.transfer;
					}
					render() {
						const div = document.createElement('div');
						this.classes.length ? this.classes.forEach(item => div.classList.add(item)) : div.classList.add('menu__item');
						div.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
			`;
						this.parent.append(div);
					}
				}
				(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then(data => {
					data.forEach(_ref => {
						let {
							img,
							altimg,
							title,
							descr,
							price
						} = _ref;
						new MenuCard(img, altimg, title, descr, price, '.menu__field .container', 'menu__item').render();
					});
				});
			}
			/* harmony default export */ __webpack_exports__['default'] = (cards);

			/***/ }),

		/***/ './js/modules/forms.js':
		/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ './js/modules/modal.js');
			/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ './js/services/services.js');


			function forms(modalTimer, formSelector) {
				const forms = document.querySelectorAll(formSelector);
				const message = {
					loading: 'img/form/spinner.svg',
					success: 'Спасибо! Скоро мы с вами свяжемся',
					failure: 'Что-то пошло не так...'
				};
				forms.forEach(item => bindData(item));
				function bindData(form) {
					form.addEventListener('submit', e => {
						e.preventDefault();
						let messageStatus = document.createElement('img');
						messageStatus.src = message.loading;
						messageStatus.style.cssText = `
				display: block;
                margin: 0 auto;
			`;
						form.insertAdjacentElement('afterend', messageStatus);
						const formData = new FormData(form);
						const json = JSON.stringify(Object.fromEntries(formData.entries()));
						(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
							showThanks(message.success);
							setTimeout(() => messageStatus.remove(), 2000);
						}).catch(() => {
							showThanks(message.failure);
						}).finally(() => {
							form.reset();
						});
					});
				}
				function showThanks(message) {
					const modal = document.querySelector('.modal');
					const curModal = document.querySelector('.modal__dialog');
					curModal.classList.add('hide');
					const thanksModal = document.createElement('div');
					thanksModal.classList.add('modal__dialog');
					thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
					modal.append(thanksModal);
					const thanksTimer = setTimeout(() => {
						thanksModal.remove();
						curModal.classList.remove('hide');
						(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal', modalTimer);
					}, 5000);
				}
			}
			/* harmony default export */ __webpack_exports__['default'] = (forms);

			/***/ }),

		/***/ './js/modules/modal.js':
		/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			/* harmony export */ __webpack_require__.d(__webpack_exports__, {
				/* harmony export */   'closeModal': function() { return /* binding */ closeModal; },
				/* harmony export */   'openModal': function() { return /* binding */ openModal; }
				/* harmony export */ });
			const closeModal = (modalSelector, modalTimer) => {
				const modal = document.querySelector(modalSelector);
				modal.classList.add('hide');
				modal.classList.remove('show');
				document.body.style.overflow = '';
				clearInterval(modalTimer);
				console.log(modalTimer);
			};
			const openModal = modalSelector => {
				const modal = document.querySelector(modalSelector);
				modal.classList.remove('hide');
				modal.classList.add('show');
				document.body.style.overflow = 'hidden';
			};
			function modal(triggerSelector, modalSelector, modalTimer) {
				const modalTrigger = document.querySelectorAll(triggerSelector),
					modal = document.querySelector(modalSelector);
				modalTrigger.forEach(item => {
					item.addEventListener('click', () => openModal(modalSelector));
				});
				modal.addEventListener('click', e => {
					if (e.target === modal || e.target.getAttribute('data-close') == '') {
						closeModal(modalSelector, modalTimer);
					}
				});
				document.addEventListener('keydown', e => {
					if (e.code === 'Escape' && modal.classList.contains('show')) closeModal(modalSelector, modalTimer);
				});
				const scrollModal = () => {
					if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
						openModal(modalSelector);
						window.removeEventListener('scroll', scrollModal);
					}
					;
				};
				window.addEventListener('scroll', scrollModal);
			}
			/* harmony default export */ __webpack_exports__['default'] = (modal);


			/***/ }),

		/***/ './js/modules/slider.js':
		/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			function slider(_ref) {
				let {
					next,
					prev,
					slide,
					container,
					curr,
					totalNum,
					slidesWrapper,
					slidesInner
				} = _ref;
				const nextSlider = document.querySelector(next),
					prevSlider = document.querySelector(prev),
					slides = document.querySelectorAll(slide),
					currNum = document.querySelector(curr),
					total = document.querySelector(totalNum),
					wrapper = document.querySelector(slidesWrapper),
					inner = document.querySelector(slidesInner),
					slider = document.querySelector(container),
					width = window.getComputedStyle(wrapper).width;
				slides.forEach(item => {
					item.style.width = width;
				});
				let w = parseInt(width);
				inner.style.width = 100 * slides.length + '%';
				inner.style.display = 'flex';
				inner.transition = '0.6s all';
				wrapper.style.overflow = 'hidden';
				let index = 0;
				slides.length < 10 ? total.innerHTML = `0${slides.length}` : total.innerHTML = `${slides.length}`;
				index + 1 < 10 ? currNum.innerText = `0${index + 1}` : currNum.innerText = `${index + 1}`;
				function changeSlide() {
					inner.style.transform = `translateX(${-index * w}px)`;
					index + 1 < 10 ? currNum.innerText = `0${index + 1}` : currNum.innerText = `${index + 1}`;
				}
				nextSlider.addEventListener('click', () => {
					dots[index].style.opacity = 0.5;
					index < slides.length - 1 ? ++index : index = 0;
					changeSlide();
					dots[index].style.opacity = 1;
				});
				prevSlider.addEventListener('click', () => {
					dots[index].style.opacity = 0.5;
					index > 0 ? --index : index = slides.length - 1;
					changeSlide();
					dots[index].style.opacity = 1;
				});
				slider.style.position = 'relative';
				const navigation = document.createElement('ul');
				navigation.style.cssText = `
	position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
	`;
				slider.append(navigation);
				const dots = [];
				for (let i = 0; i < slides.length; ++i) {
					const dot = document.createElement('li');
					dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
		`;
					dot.setAttribute('data-slide-to', i);
					navigation.append(dot);
					dots.push(dot);
					if (i == 0) dot.style.opacity = 1;
				}
				dots.forEach(dot => {
					dot.addEventListener('click', e => {
						const slideTo = e.target.getAttribute('data-slide-to');
						dots[index].style.opacity = 0.5;
						index = +slideTo;
						changeSlide();
						dots[index].style.opacity = 1;
					});
				});
			}
			/* harmony default export */ __webpack_exports__['default'] = (slider);

			/***/ }),

		/***/ './js/modules/tabs.js':
		/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			function tabs(headerSelector, tabsSelector, activeSelector) {
				const tabs = document.querySelectorAll(headerSelector),
					tabsContent = document.querySelectorAll(tabsSelector);
				function hideTabsContent() {
					tabsContent.forEach(item => {
						item.classList.remove('show');
						item.classList.add('hide');
					});
					tabs.forEach(item => {
						item.classList.remove(activeSelector);
					});
				}
				function showTabContent() {
					let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
					tabsContent[i].classList.remove('hide');
					tabsContent[i].classList.add('show', 'fade');
					tabs[i].classList.add(activeSelector);
				}
				hideTabsContent();
				showTabContent();
				tabs.forEach((item, i) => {
					item.addEventListener('click', () => {
						hideTabsContent();
						showTabContent(i);
					});
				});
			}
			/* harmony default export */ __webpack_exports__['default'] = (tabs);

			/***/ }),

		/***/ './js/modules/timer.js':
		/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			function timer(deadline) {
				function countLeftTime() {
					const t = Date.parse(deadline) - new Date();
					return {
						't': t,
						'days': Math.round(t / (1000 * 60 * 60 * 24)),
						'hours': Math.round(t / (1000 * 60 * 60)) % 24,
						'minutes': Math.round(t / (1000 * 60)) % 60,
						'seconds': Math.round(t / 1000) % 60
					};
				}
				function zero(n) {
					if (n < 10) {
						return `0${n}`;
					} else {
						return n;
					}
				}
				function setLeftTime() {
					const timer = document.querySelector('.timer'),
						days = document.querySelector('#days'),
						hours = document.querySelector('#hours'),
						minutes = document.querySelector('#minutes'),
						seconds = document.querySelector('#seconds');
					updateClock();
					function updateClock() {
						const t = countLeftTime();
						days.innerHTML = zero(t.days);
						hours.innerHTML = zero(t.hours);
						minutes.innerHTML = zero(t.minutes);
						seconds.innerHTML = zero(t.seconds);
						if (t.t == 0) {
							clearInterval(timerUpdate);
						}
					}
					const timerUpdate = setInterval(updateClock, 1000);
				}
				setLeftTime();
			}
			/* harmony default export */ __webpack_exports__['default'] = (timer);

			/***/ }),

		/***/ './js/services/services.js':
		/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
		/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

			__webpack_require__.r(__webpack_exports__);
			/* harmony export */ __webpack_require__.d(__webpack_exports__, {
				/* harmony export */   'getData': function() { return /* binding */ getData; },
				/* harmony export */   'postData': function() { return /* binding */ postData; }
				/* harmony export */ });
			const postData = async (url, data) => {
				const res = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: data
				});
				return await res.json;
			};

			const getData = async url => {
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error(`Could not fetch ${url}, status: ${res.status}`);
				}
				return await res.json();
			};


			/***/ })

		/******/ 	});
	/************************************************************************/
	/******/ 	// The module cache
	/******/ 	var __webpack_module_cache__ = {};
	/******/ 	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
		/******/ 		// Check if module is in cache
		/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
		/******/ 		if (cachedModule !== undefined) {
			/******/ 			return cachedModule.exports;
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
	/******/ 	!function() {
		/******/ 		// define getter functions for harmony exports
		/******/ 		__webpack_require__.d = function(exports, definition) {
			/******/ 			for(var key in definition) {
				/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
					/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
					/******/ 				}
				/******/ 			}
			/******/ 		};
		/******/ 	}();
	/******/ 	
	/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
	/******/ 	!function() {
		/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
		/******/ 	}();
	/******/ 	
	/******/ 	/* webpack/runtime/make namespace object */
	/******/ 	!function() {
		/******/ 		// define __esModule on exports
		/******/ 		__webpack_require__.r = function(exports) {
			/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
				/******/ 			}
			/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
			/******/ 		};
		/******/ 	}();
	/******/ 	
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	!function() {
		/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ './js/modules/calc.js');
		/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ './js/modules/cards.js');
		/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ './js/modules/forms.js');
		/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ './js/modules/modal.js');
		/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ './js/modules/slider.js');
		/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ './js/modules/tabs.js');
		/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ './js/modules/timer.js');








		document.addEventListener('DOMContentLoaded', () => {
			const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal'), 6000);
			(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__['default'])();
			(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__['default'])();
			(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__['default'])(modalTimer, 'form');
			(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__['default'])('[data-modal]', '.modal', modalTimer);
			(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__['default'])({
				next: '.offer__slider-next',
				prev: '.offer__slider-prev',
				slide: '.offer__slide',
				curr: '#current',
				totalNum: '#total',
				slidesWrapper: '.offer__slider-wrapper',
				slidesInner: '.offer_slider-inner',
				container: '.offer__slider'
			});
			(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__['default'])('.tabheader__item', '.tabcontent', 'tabheader__item_active');
			(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__['default'])('2023-05-20');
		});
	}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map
import { getData } from '../services/services';

function cards() {
	class MenuCard {
		constructor(src, alt, title, descr, price, parentTag, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.transfer = 27;
			this.parent = document.querySelector(parentTag);
			this.changePrice();
			this.classes = classes;
		}

		changePrice() {
			return this.price * this.transfer;
		} 

		render() {
			const div = document.createElement('div');
			(this.classes.length) ? this.classes.forEach(item => div.classList.add(item)) : div.classList.add('menu__item');
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

	

	getData('http://localhost:3000/menu').then((data) => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, '.menu__field .container', 'menu__item').render();
		});
	});
}

export default cards;
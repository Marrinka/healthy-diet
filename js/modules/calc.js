function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, activity, height, weight, age;
	
	if (!localStorage.getItem('sex')) localStorage.setItem('sex', 'female');
	sex = localStorage.getItem('sex');

	if (!localStorage.getItem('activity')) localStorage.setItem('activity', 1.375);
	activity = localStorage.getItem('activity');

	function initCalc(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
		elements.forEach((el) => {
			el.classList.remove(activeClass);
			if (el.getAttribute('data-active') === localStorage.getItem('activity')) el.classList.add(activeClass); 
			if (el.getAttribute('id') === localStorage.getItem('sex')) el.classList.add(activeClass); 
		});
	}

	initCalc();

	function calcResult() {
		if (!sex || !activity || !height || !weight || !age) {
			result.innerText = '____';
		}
		else {
			if (sex == 'female') {
				result.innerText = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
			}
			else {
				result.innerText = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
			}
		}
		
	}

	initCalc('#gender', 'calculating__choose-item_active');
	initCalc('.calculating__choose_big', 'calculating__choose-item_active');

	function getStaticInf(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach((el) => {
			el.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-active')) {
					activity = +e.target.getAttribute('data-active');
					localStorage.setItem('activity', activity);
				}
				else {
					sex = e.target.id;
					localStorage.setItem('sex', sex);
				}
				elements.forEach((el) => el.classList.remove(activeClass));
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
			}
			else {
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

export default calc;
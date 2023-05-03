import {openModal, closeModal} from './modal';
import { postData } from '../services/services';

function forms(modalTimer, formSelector) {
	const forms = document.querySelectorAll(formSelector);
	
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	

	forms.forEach((item) => bindData(item));

	function bindData(form) {
		form.addEventListener('submit', (e) => {
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

			postData('http://localhost:3000/requests', json)
				.then(data => {
					showThanks(message.success);
					setTimeout(() => messageStatus.remove(), 2000);
				})
				.catch(() => {
					showThanks(message.failure);
				})
				.finally(() => {
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
			closeModal('.modal', modalTimer);
		}, 5000);
		
	}
}

export default forms;
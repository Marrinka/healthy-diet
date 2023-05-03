const closeModal = (modalSelector, modalTimer) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
	clearInterval(modalTimer);
	console.log(modalTimer);
};

const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('hide');
	modal.classList.add('show');
	document.body.style.overflow = 'hidden';
};


function modal(triggerSelector, modalSelector, modalTimer) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);
	

	modalTrigger.forEach((item) => {
		item.addEventListener('click', () => openModal(modalSelector));
	});


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector, modalTimer);
		} 
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) closeModal(modalSelector, modalTimer);
	});


	const scrollModal = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal(modalSelector);
			window.removeEventListener('scroll', scrollModal);
		};
	};

	window.addEventListener('scroll', scrollModal);
}

export default modal;
export {openModal, closeModal};
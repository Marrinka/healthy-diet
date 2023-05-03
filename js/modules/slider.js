function slider({next, prev, slide, container, curr, totalNum, slidesWrapper, slidesInner}) {
	const nextSlider = document.querySelector(next),
		prevSlider = document.querySelector(prev),
		slides = document.querySelectorAll(slide),
		currNum = document.querySelector(curr),
		total = document.querySelector(totalNum),
		wrapper = document.querySelector(slidesWrapper),
		inner = document.querySelector(slidesInner),
		slider = document.querySelector(container),
		width = window.getComputedStyle(wrapper).width;
	
	slides.forEach((item) => {
		item.style.width = width;
	});
	let w = parseInt(width);

	inner.style.width = 100*slides.length + '%';
	inner.style.display = 'flex';
	inner.transition = '0.6s all';
	wrapper.style.overflow = 'hidden';


	let index = 0;
	(slides.length < 10) ? total.innerHTML = `0${slides.length}` : total.innerHTML = `${slides.length}`;
	(index+1 < 10) ? currNum.innerText = `0${index+1}` : currNum.innerText = `${index+1}`;

	function changeSlide() {
		inner.style.transform = `translateX(${-index*w}px)`;
		(index+1 < 10) ? currNum.innerText = `0${index+1}` : currNum.innerText = `${index+1}`;
	}

	nextSlider.addEventListener('click', () => {
		dots[index].style.opacity = 0.5;
		(index < slides.length - 1) ? ++index : index = 0;
		changeSlide();
		dots[index].style.opacity = 1;
		
	});

	prevSlider.addEventListener('click', () => {
		dots[index].style.opacity = 0.5;
		(index > 0) ? --index : index = slides.length - 1;
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

	const dots  = [];

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

	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			dots[index].style.opacity = 0.5;
			index = +slideTo;
			changeSlide();
			dots[index].style.opacity = 1;
		});
	});
}

export default slider;
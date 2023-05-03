function timer(deadline) {

	function countLeftTime() {
		const t = Date.parse(deadline) - new Date();

		return {
			't' : t,
			'days' : Math.round(t / (1000*60*60*24)),
			'hours' : Math.round(t / (1000*60*60)) % 24,
			'minutes' : Math.round(t / (1000*60)) % 60,
			'seconds' : Math.round(t / (1000)) % 60
		};
	}

	function zero(n) {
		if (n<10) {
			return `0${n}`;
		}
		else {
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

export default timer;
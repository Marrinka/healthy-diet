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
	function showTabContent(i = 0) {
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

export default tabs;
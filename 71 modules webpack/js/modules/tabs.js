function tabs(buttons, content, parentDiv, active) {

	const tabs = document.querySelectorAll(buttons),
		tabContents = document.querySelectorAll(content),
		tabsParent = document.querySelector(parentDiv);

	function showContent(i = 0) {
		tabContents[i].style.display = 'block';
		tabs[i].classList.add(active);
	}

	function hideContent() {
		tabContents.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove(active);
		});
	}

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		tabs.forEach((item, i) => {
			if (target && target == item) {
				hideContent();
				showContent(i);
			}
		});

	});

	hideContent();
	showContent();
}

export default tabs;
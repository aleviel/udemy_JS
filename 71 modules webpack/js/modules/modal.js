function modal(Btns, modalWindow, ) {
	const
		modalBtns = document.querySelectorAll(Btns),
		modal = document.querySelector(modalWindow),
		modalTimerId = setTimeout(timerFunc, 5000);

	function timerFunc() {
		openModal();
	}

	function closeModal() {
		modal.style.display = "none";
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	function openModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modal.style.display = "block";
			document.body.style.overflow = "hidden";
			clearInterval(modalTimerId);
			window.removeEventListener('scroll', openModalByScroll);
		}
	}

	modalBtns.forEach((item) => {
		item.addEventListener('click', () => {
			openModal();
		});
	});

	modal.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('modal__close') || target.classList.contains('modal')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == "Escape") {
			closeModal();
		}
	});

	window.addEventListener('scroll', openModalByScroll);

}

export default modal;
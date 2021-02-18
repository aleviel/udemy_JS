import addZero from './addZero';

function slider(currentSlideField, totalSlidesField, slide, prevArrSelector, nextArrSelector) {

	const
		currentSlide = document.querySelector(currentSlideField),
		totalSlides = document.querySelector(totalSlidesField),
		slides = document.querySelectorAll(slide),
		prevArr = document.querySelector(prevArrSelector),
		nextArr = document.querySelector(nextArrSelector);
	let
		index = 1;

	function showSlide(n) {
		if (n > slides.length) {
			index = 1;
		} else if (n < 1) {
			index = slides.length;
		}

		slides.forEach(item => {
			item.style.display = 'none';
		});

		slides[index - 1].style.display = 'block';
		currentSlide.textContent = addZero(index);

	}

	function plusSlide(n) {
		showSlide(index += n);
	}

	prevArr.addEventListener('click', (e) => {
		plusSlide(-1);
	});

	nextArr.addEventListener('click', (e) => {
		plusSlide(1);
	});

	showSlide(index);
	totalSlides.textContent = addZero(slides.length);

}

export default slider;
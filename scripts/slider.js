'use strict';

addEventListener('load', () => {
	const slidesContainer = document.querySelector('.home-slider__container');
	const slide = document.querySelector('.slide');
	const prevButton = document.getElementById('slide-arrow-prev');
	const nextButton = document.getElementById('slide-arrow-next');

	nextButton.addEventListener('click', () => {
		slidesContainer.scrollLeft += slide.clientWidth;
	});
	prevButton.addEventListener('click', () => {
		slidesContainer.scrollLeft -= slide.clientWidth;
	});
});

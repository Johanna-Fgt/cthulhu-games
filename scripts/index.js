'use strict';

addEventListener('load', () => {
	const burger = document.getElementById('burger');
	const navbar = document.getElementById('navbar');

	burger.addEventListener('click', (e) => handleNav(e, navbar));
});

const handleNav = (e, el) => {
	e.target.classList.toggle('open');
	el.classList.toggle('open');
};

import {toggleClass} from './animations';

const mobileMenu = () => {
	const hamburger = document.querySelector('.hamburger-menu'),
		  mainNav = document.querySelector('.nav-section');

	hamburger.addEventListener('click', () => {
		toggleClass(hamburger, 'open');
		toggleClass(mainNav, 'main-nav-open');

		toggleClass(document.body, 'ov-hidden');

	}, false);
};

export default mobileMenu;
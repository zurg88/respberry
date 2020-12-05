import {toggleClass} from './animations';

const mobileMenu = () => {
	const hamburger = document.querySelector('.hamburger-menu'),
		  mainNav = document.querySelector('.main-navigation');

	hamburger.addEventListener('click', () => {
		toggleClass(hamburger, 'open');
		toggleClass(mainNav, 'main-nav-open');

	}, false);
};

export default mobileMenu;
'use strict';

const subscribe = () => {
	const footerForm = document.getElementById('footer-form'),
	popupThanksSubscribe = document.querySelector('.popup-thanks-subscribe'),
	footerFormInput = document.querySelector('.footer-form-input'),
	thanksBtn = document.querySelector('.thanks-btn');


	const preventScroll = event => {
		event.preventDefault();
	};

	const clearInputData = input => {
		input.value = '';
	};

	const showThanksPopup = () => {
		popupThanksSubscribe.classList.add('show-popup');

		clearInputData(footerFormInput);
	};

	footerForm.addEventListener('submit', event => {
		event.preventDefault();

		const userEmail = footerFormInput.value;
		userEmail.trim();

		if (userEmail !== '') {
			showThanksPopup();
			document.addEventListener('wheel', preventScroll, {passive: false});
		}
		
	});

	popupThanksSubscribe.addEventListener('click', (event) => {
		const target =event.target;
		if(target.matches('.popup-thanks-subscribe')) {
			popupThanksSubscribe.classList.remove('show-popup');
			document.removeEventListener('wheel', preventScroll);

			popupThanksSubscribe.classList.remove('err-password');
		}
	});

	thanksBtn.addEventListener('click', ()=> {
		popupThanksSubscribe.classList.remove('show-popup');
		document.removeEventListener('wheel', preventScroll);
	});
	
};

export default subscribe;
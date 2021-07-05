'use strict';

const account = () => {
	const popupSection = document.querySelector('.popup-section'),
	loginRegisterNav = document.querySelector('.login-register-nav'),
	loginRegisterBtns = loginRegisterNav.querySelectorAll('button'),
	loginRegisterContent = document.querySelector('.login-register-content'),
	loginRegisterContentColleclion = loginRegisterContent.querySelectorAll('div'),
	userLink = document.querySelector('.user-link'),
	signInLink = document.querySelector('.sign-in-link');

	const registerForm = document.getElementById('register-form'),
		loginForm = document.getElementById('register-form'),
		userName = document.getElementById('user-name'),
		userEmail = document.getElementById('user-email'),
		userPassword = document.getElementById('user-password'),
		userPasswordRepeat = document.getElementById('user-repeat-password'),
		accauntMenusignOut = document.getElementById('sign-out'),
		loginName = document.getElementById('login-name'),
		loginBtn = document.getElementById('login-btn'),
		loginPassword = document.getElementById('login-password'),
		rememberCheck = document.querySelector('.remember-check'),
		accountList = document.querySelector('.account-list');
	
	const renderUserData = () => {
		if(localStorage.userdata) {
			if(rememberCheck || rememberCheck.checcked) {
				const data = JSON.parse(localStorage.getItem('userdata'));
				
				const lockalDataArr = Object.values(data),
					localDataRemerChecked = [];
				
				for (let i = 0; i < lockalDataArr.length; i++) {
					if(lockalDataArr[i].remember === true) {
						localDataRemerChecked.push(lockalDataArr[i]);
					}
				}
	
				if(localDataRemerChecked.length > 0) {
					userLink.textContent = localDataRemerChecked[localDataRemerChecked.length - 1].name;
					signInLink.textContent = 'sign out';
				}
			}
		}
	};

	renderUserData();

	const preventScroll = event => {
		event.preventDefault();
	};

	signInLink.addEventListener('click', () => {
		const signInLinkText = signInLink.textContent;
		if(signInLinkText.toLowerCase() === 'sign in') {
			popupSection.classList.add('show-popup');
			document.addEventListener('wheel', preventScroll, {passive: false});
			renderUserData();
		}
	});

	popupSection.addEventListener('click', (event) => {
		const target =event.target;
		if(target.matches('.popup-section')) {
			popupSection.classList.remove('show-popup');
			document.removeEventListener('wheel', preventScroll);

			loginPassword.classList.remove('err-password');
			loginName.classList.remove('err-password');
		}
	});

	loginRegisterBtns.forEach(item => {
		item.addEventListener('click', () => {
			loginRegisterBtns.forEach(elem => {
				if(elem.classList.contains('active')) {
					elem.classList.remove('active');
				}
			});
			item.classList.add('active');
			showLoginRegisterContent();
		});
	});

	const showLoginRegisterContent = () => {
		loginRegisterContentColleclion.forEach(item => {
			item.classList.remove('show-account-content');
		});

		for (let i = 0; i < loginRegisterBtns.length; i++) {
			if(loginRegisterBtns[i].classList.contains('active')) {
				loginRegisterContentColleclion[i].classList.add('show-account-content');
			}
		}
	};
	showLoginRegisterContent();

	const setUserData = (name, email, password, rememberUser = false) => {
		let data = {};
		if (localStorage.userdata) {
			data = JSON.parse(localStorage.userdata);
		}
	
		data[name] = {
			name: name,
			email: email,
			password: password,
			remember: rememberUser
		};

		localStorage.setItem('userdata', JSON.stringify(data));
	};

	const checkPassword = (passwordValue, repeatPasswordValue) => {
		if ( passwordValue === repeatPasswordValue ) {
			userPassword.classList.remove('err-password');
			userPasswordRepeat.classList.remove('err-password');
			popupSection.classList.remove('show-popup');
			return true;
		} else {
			userPassword.classList.add('err-password');
			userPasswordRepeat.classList.add('err-password');
			return false;
		}
	};

	registerForm.addEventListener('submit', ()=> {
		if(checkPassword(userPassword.value, userPasswordRepeat.value)) {
			setUserData(userName.value, userEmail.value, userPassword.value);
		}
	});

	const errLoginForm = () => {
		loginName.value = '';
		loginPassword.value = '';
			
		loginPassword.classList.add('err-password');
		loginName.classList.add('err-password');
	};

	const login = (name, password) => {
		const localData = JSON.parse(localStorage.userdata);
		
		if (localData[name]) {

			if(localData[name].password === password) {
				userLink.textContent = name;
				signInLink.textContent = 'sign out';

				loginName.value = '';
				loginPassword.value = '';

				popupSection.classList.remove('show-popup');
				loginPassword.classList.remove('err-password');
				loginName.classList.remove('err-password');
				accountList.classList.remove('no-account');

				if(rememberCheck || rememberCheck.checcked) {

					setUserData(localData[name].name, localData[name].email, localData[name].password, true);
				}
			} else {
				errLoginForm();
			}

		} else {
			errLoginForm();
		}		
	};

	loginBtn.addEventListener('click', (e) => {
		e.preventDefault();
		login(loginName.value, loginPassword.value);
	});

	const signOut = ()=> {
		userLink.textContent = 'JOIN FREE';
		signInLink.textContent = 'sign in';
		accountList.classList.add('no-account');
		
	};

	signInLink.addEventListener('click', () => {
		if(signInLink.textContent === 'sign out') {
			signOut();
		}
	});
	
	accauntMenusignOut.addEventListener('click', (e) => {
		e.preventDefault();
		if(signInLink.textContent === 'sign out') {
			signOut();
		}
	});

};

export default account;
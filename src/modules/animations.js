const projectAnimations = () => {
	const	accountListItems = document.querySelectorAll('.account-list-link'),
		 userMenuContainer = document.querySelector('.user-menu-container'),
		 dresses = document.querySelector('.dresses'),
		 dropdownLinks = document.querySelectorAll('.dropdown-link'),
		 megaMenu = document.querySelector('.mega-menu'),
		 searchForm = document.querySelector('.search-form'),
		 searchOpenbtn = document.querySelector('.search-open'),
		 megaMenuBlock = document.querySelectorAll('.mega-menu-block'),
		 cartListItems = document.querySelectorAll('.cart-list-item'),
		 cartBlock = document.querySelector('.cart-block');


	const toggleClass = (elem, className) =>{
		elem.classList.toggle(className);
	};

	const userMenuAnimation = (container, items, delay) => {
		container.addEventListener('mouseenter', () => {
			let count = 0;
			
			const intervalId = setInterval(() => {
				if (count === items.length - 1)  {
					clearInterval(intervalId);
				}
				items[count].style.opacity = '1';
					count++;
			}, delay);
		}, false);
		
		container.addEventListener('mouseleave', () => {
			items.forEach(item => {
				item.style.opacity = '0';
			});
		}, false);
	};

	const changeElemWidth = (elem, width, delay) => {
		const widthPart = width / 50;
		let elemWidth = 0;

		const intervalId = setInterval(() => {	

			if (elemWidth === width)  {
				clearInterval(intervalId);
			} else {
				elemWidth += widthPart;
			}
			elem.style.width = elemWidth + 'px';
			
		}, delay);
	};

	searchOpenbtn.addEventListener('click', () => {
		toggleClass(searchForm, 'show-form');
		toggleClass(searchOpenbtn, 'search-show');
		if (searchOpenbtn.classList.contains('search-show')) {
			changeElemWidth(searchForm, 350, 1);
		} else {
			searchForm.style.width = '0';
		}
	}, false);


	userMenuAnimation(userMenuContainer, accountListItems, 25);
	userMenuAnimation(dresses, dropdownLinks, 25);
	userMenuAnimation(cartBlock, cartListItems, 25);
	userMenuAnimation(megaMenu, megaMenuBlock, 100);

	
};

export default projectAnimations;

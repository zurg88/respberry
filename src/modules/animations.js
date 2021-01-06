const toggleClass = (elem, className) =>{
	elem.classList.toggle(className);
};

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
		});
		
		container.addEventListener('mouseleave', () => {
			items.forEach(item => {
				item.style.opacity = '0';
			});
		});
	};

	const elemClickOpacityAnimation = (container, items, delay) => {
		container.addEventListener('click', (event) => {
			const target = event.target;
			let count = 0;
			
			const intervalId = setInterval(() => {
				if (count === items.length - 1)  {
					clearInterval(intervalId);
				}
				items[count].style.opacity = '1';
					count++;
			}, delay);
		});
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
	});

	userMenuAnimation(userMenuContainer, accountListItems, 25);
	userMenuAnimation(dresses, dropdownLinks, 25);
	userMenuAnimation(megaMenu, megaMenuBlock, 80);

	if (window.matchMedia("(min-width: 1025px)").matches) {
		userMenuAnimation(cartBlock, cartListItems, 25);
	}
	
	if (window.matchMedia("(max-width: 1024px)").matches) {
		elemClickOpacityAnimation(cartBlock, cartListItems, 25);
	}
	


};

export default projectAnimations;
export {toggleClass};

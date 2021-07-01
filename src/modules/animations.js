const toggleClass = (elem, className) =>{
	elem.classList.toggle(className);
};

const userMenuAnimation = (container, items, delay) => {
	if (items.length > 0) {
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
	}
	
};

const elemClickOpacityAnimation = (container, items, delay) => {
	if (items.length > 0) {
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
	}
};

const projectAnimations = () => {
	const	accountListItems = document.querySelectorAll('.account-list-link'),
		 userMenuContainer = document.querySelector('.user-menu-container'),
		 dresses = document.querySelector('.dresses'),
		 dropdownLinks = document.querySelectorAll('.dropdown-link'),
		 megaMenu = document.querySelector('.mega-menu'),
		 searchForm = document.querySelector('.search-form'),
		 searchOpenbtn = document.querySelector('.search-open'),
		 megaMenuBlock = document.querySelectorAll('.mega-menu-block');		

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
};

export default projectAnimations;
export {toggleClass};
export {userMenuAnimation, elemClickOpacityAnimation};

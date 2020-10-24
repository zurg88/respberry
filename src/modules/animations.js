const projectAnimations = () => {
	const	accountListItems = document.querySelectorAll('.account-list-link'),
		 userMenuContainer = document.querySelector('.user-menu-container'),
		 dresses = document.querySelector('.dresses'),
		 megaMenu = document.querySelector('.mega-menu'),
		 dropdownLinks = document.querySelectorAll('.dropdown-link'),
		 megaMenuBlock = document.querySelectorAll('.mega-menu-block');


	const userMenuAnimation = (container, items, delay) => {
		container.addEventListener('mouseover', () => {
			let count = 0;
			
			const intervalId = setInterval(() => {
				if (count === items.length - 1)  {
					clearInterval(intervalId);
				}
				items[count].style.opacity = '1';
					count++;
			}, delay);
		});
		
		container.addEventListener('mouseout', () => {
			items.forEach(item => {
				item.style.opacity = '0';
			});
		});
	};

	userMenuAnimation(userMenuContainer, accountListItems, 25);
	userMenuAnimation(dresses, dropdownLinks, 25);
	// userMenuAnimation(megaMenu, megaMenuBlock, 100);

	
};

export default projectAnimations;

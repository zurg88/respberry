'use strict';


const menuActiveLink = () => {
	const menuItemsLinks = document.querySelectorAll('.main-nav-link'),
		megaMenuLinks = document.querySelectorAll('.mega-menu-link'),
		cartIconBlock = document.querySelector('.cart-icon-block'),
		dropdownLinks = document.querySelectorAll('.dropdown-link');

	const removeActiveClass = (items) => {
		items.forEach(item => {
			item.classList.remove('active-nav-link');
		});
	};

	if(document.body.classList.contains('cart-page')) {
		removeActiveClass(menuItemsLinks);
		cartIconBlock.classList.add('active-nav-link');
		return;
	}

	menuItemsLinks.forEach( (link, index) => {
		link.addEventListener('click', () => {
			localStorage.setItem('menuActiveItem', JSON.stringify(index));
		});
	});

	megaMenuLinks.forEach( (link) => {
		link.addEventListener('click', () => {
			localStorage.setItem('menuActiveItem', JSON.stringify(1));
		});
	});

	dropdownLinks.forEach( (link) => {
		link.addEventListener('click', () => {
			localStorage.setItem('menuActiveItem', JSON.stringify(2));
		});
	});

	const addActiveClassForMenuLink = () => {
		if(localStorage.menuActiveItem) {
			const indexActiveLink = JSON.parse(localStorage.menuActiveItem);

			removeActiveClass(menuItemsLinks);
			menuItemsLinks[indexActiveLink].classList.add('active-nav-link');
		}
	}

	addActiveClassForMenuLink();

};

export default menuActiveLink;
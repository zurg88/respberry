'use strict';

import {addDataToStorege, removeStorageItem, renderCartFromLocalStorege} from './localStorege';
import {userMenuAnimation} from './animations';
import {cteateCartItem, getParams} from './cart';

const checkIsEmpty = (parentElem, elems, message) => {
	if ( elems.length === 0 ) {
		const cartEptyTextelem = document.createElement('p');
		cartEptyTextelem.classList.add('cart-empty-el');
		cartEptyTextelem.textContent = message;
		parentElem.append(cartEptyTextelem);
	}
};

const wishlist = () => {
	const wishlistLink = document.querySelector('.wishlist-link'),
		cartBlock = document.querySelector('.cart-block'),
		cartList = cartBlock.querySelector('.cart-list'),
		addToWishlistBtn = document.querySelectorAll('.add-to-wishlist'),
		itemsValue = wishlistLink.querySelector('.items-value'),
		wishlistBlock = document.querySelector('.wishlist-block'),
		wishlistCartListBlock = wishlistBlock.querySelector('.cart-list-block'),
		wishlistCartList = wishlistBlock.querySelector('.cart-list'),
		quickViewSection = document.querySelector('.quick-view-section'),
		whishlistmessageSection = document.querySelector('.add-to-whishlist-message-section'),
		whishlistSectionCloseMessegeBtn = document.querySelector('.whishlist-section-close-messege-btn'),
		wishTable = document.querySelector('.wish-table');

	const showWishListCartItems = () => {
		if (window.matchMedia("(min-width: 1025px)").matches) {
			const wishlistCartItems = wishlistBlock.querySelectorAll('.cart-list-item');
			userMenuAnimation(wishlistBlock, wishlistCartItems, 25);
		}
	};

	const showWishlistMessage = () => {
		whishlistmessageSection.classList.add('show-wishlist-message');
	};

	const removeWishlistMassage = () => {
		whishlistmessageSection.classList.remove('show-wishlist-message');
	};

	whishlistmessageSection.addEventListener('click', event => {
			const target = event.target;

			if(whishlistmessageSection.classList.contains('show-wishlist-message')) {
			
				if(target.matches('.show-wishlist-message')) {
					removeWishlistMassage();
				}
			};
		});

	whishlistSectionCloseMessegeBtn.addEventListener('click', () => {
		removeWishlistMassage();
	});

	const createMessageForWishTable = () => {
		if( JSON.parse(sessionStorage.wishlistData).length === 0 && document.body.classList.contains('wishlist-body')) {
			const tableRow = document.createElement('tr');
			const emptyCell = document.createElement('tr');
			const emptyMessage = document.createElement('p');

			tableRow.classList.add('table-row');
			emptyCell.classList.add('empty-cell');
			emptyMessage.classList.add('empty-message');

			wishTable.append(tableRow);
			tableRow.append(emptyCell);
			emptyCell.append(emptyMessage);
			emptyMessage.textContent = 'Wishlist is empty!';
			wishlistItemsValue();
		}
	};

	showWishListCartItems();
	
	const wishlistItemsValue = () => {
		if ( !document.body.classList.contains('wishlist-body') ) {
			const wishlistCartItems = wishlistBlock.querySelectorAll('.cart-list-item');
			itemsValue.textContent = '( ' + wishlistCartItems.length + ' )';
			checkIsEmpty(wishlistCartListBlock , wishlistCartItems, 'wishlist is empty');
		} else {
			const tableRow = document.querySelectorAll('.table-row');
			itemsValue.textContent = '( ' + tableRow.length + ' )';
		}		
	};

	wishlistItemsValue();

	const removeWishlistCartItems = () => {
		const cartItemCloseIcon = wishlistBlock.querySelectorAll('.cart-item-close-icon');
			cartItemCloseIcon.forEach(item => {
				item.addEventListener('click', () => {
					if(!sessionStorage.wishlistData) {
						const wishlistBlock = document.querySelector('.wishlist-block'),
							wishlistCartItems = wishlistBlock.querySelectorAll('.cart-list-item');
							addDataToStorege(wishlistCartItems, '.cart-description-title', '.cart-item-img > img', 'wishlistData');
					}
					const cartListItems = wishlistBlock.querySelectorAll('.cart-list-item');
					const itemParentElement = item.closest('.cart-list-item');
					const itemsArr = [...cartListItems];
					const elemIndex = itemsArr.indexOf(itemParentElement);
					removeStorageItem(elemIndex, 'wishlistData');
					itemParentElement.remove();
					wishlistItemsValue();
				});
			});
	};
	removeWishlistCartItems();

	const addItemToWishlist = (item) => {
		if ( wishlistBlock.querySelector('.cart-empty-el') ) {
			wishlistBlock.querySelector('.cart-empty-el').remove();
		}
		
		if (window.matchMedia("(min-width: 1025px)").matches) {
			if (document.body.classList.contains('shop-page') && !quickViewSection.classList.contains('show-quick-view')) {
				cteateCartItem(...getParams(item, '.product-list-item'), wishlistCartList);
			} else if(quickViewSection.classList.contains('show-quick-view')) {
				cteateCartItem(...getParams(item, '.quick-view-block'), wishlistCartList);
			}else{
				cteateCartItem(...getParams(item, '.tab-list-item'), wishlistCartList);
			}
		}
		
		if (window.matchMedia("(max-width: 1024px)").matches) {
			try {
				cteateCartItem(...getParams(item, '.swiper-slide'), wishlistCartList);
			} catch (e) {
				cteateCartItem(...getParams(item, '.quick-view-block'), wishlistCartList);
			}
		}

		showWishListCartItems();
		wishlistItemsValue();
		removeWishlistCartItems();

		const wishlistCartItems = wishlistBlock.querySelectorAll('.cart-list-item');
		addDataToStorege(wishlistCartItems, '.cart-description-title', '.cart-item-img > img', 'wishlistData');

		showWishlistMessage();
	};

	

	addToWishlistBtn.forEach(item => {
		item.addEventListener('click', (event) => {
			event.preventDefault();
			addItemToWishlist(item);
		});
	});

	const createWishlistTableElement = (imgPath, title, price, isStock = true) => {
		const currencySelect = document.getElementById('currency-select'),
			currencySelectActive = currencySelect.querySelector('.active');

		const tableRow = document.createElement('tr'),
			closeCell = document.createElement('td'),
			closeBtn = document.createElement('button'),
			closeImg = document.createElement('img'),
			productDescriptionCell = document.createElement('td'),
			productDescription = document.createElement('div'),
			productImg = document.createElement('img'),
			productTitle = document.createElement('h5'),
			productTitleLink = document.createElement('a'),
			priceCell = document.createElement('td'),
			currencyIcon = document.createElement('span'),
			wishPrice = document.createElement('span'),
			isStockCell = document.createElement('td'),
			buttonCell = document.createElement('td'),
			wishAddToCart = document.createElement('button');

		tableRow.classList.add('table-row');
		closeCell.classList.add('close-cell');
		closeBtn.classList.add('close-btn');
		productDescription.classList.add('product-description');
		productImg.classList.add('product-img');
		productTitle.classList.add('product-title');
		currencyIcon.classList.add('currency-icon');
		wishPrice.classList.add('wish-price');
		wishPrice.classList.add('price');
		buttonCell.classList.add('button-cell');
		wishAddToCart.classList.add('options-add-to-cart');

		closeImg.src = './src/img/Close-dark-icon.png';
		productImg.src = imgPath;
		productTitleLink.href = '#';
		productTitleLink.textContent = title;
		wishPrice.textContent = price;
		wishAddToCart.textContent = 'add to cart';

		if (isStock) {
			isStockCell.textContent = 'In Stock';
		}

		if( currencySelectActive.textContent === 'usd' ) {
			currencyIcon.textContent = '€';
		} else {
			currencyIcon.textContent = '$';
		}

		tableRow.append(closeCell);
		closeCell.append(closeBtn);
		closeBtn.append(closeImg);

		tableRow.append(productDescriptionCell);
		productDescriptionCell.append(productDescription);
		productDescription.append(productImg);
		productDescription.append(productTitle);
		productTitle.append(productTitleLink);

		tableRow.append(priceCell);
		priceCell.append(currencyIcon);
		priceCell.append(wishPrice);

		tableRow.append(isStockCell);

		tableRow.append(buttonCell);
		buttonCell.append(wishAddToCart);

		wishTable.append(tableRow);
	};

	const wishlistCloseTableRow = () => {
		if (wishTable) {
			const colseBtnCollection = wishTable.querySelectorAll('.close-btn');
			colseBtnCollection.forEach(item => {
				item.addEventListener('click', () => {
					const parentElem = item.closest('.table-row');
					const rowItems = wishTable.querySelectorAll('.table-row');
					const itemsArr = [...rowItems];
					const elemIndex = itemsArr.indexOf(parentElem);
					parentElem.remove();

					const wishTableRows = wishTable.querySelectorAll('.table-row');
					addDataToStorege(wishTableRows, '.product-title', '.product-img', 'wishlistData');
					wishlistItemsValue();
				});
			});	
		}
	};

	const renderWishlstTable = () => {
		if (sessionStorage.wishlistData) {
			const tableRow = document.querySelectorAll('.table-row');
			tableRow.forEach(item => {
				item.remove();
			});
			if (sessionStorage.wishlistData && document.body.classList.contains('wishlist-body')) {
				const wishData = JSON.parse(sessionStorage.wishlistData);
				wishData.forEach(item => {
					createWishlistTableElement(item.img, item.title, item.price);
				});

				const addToCartButtons = document.querySelectorAll('.options-add-to-cart');
				addToCartButtons.forEach(item => {
					item.addEventListener('click', () => {
					if ( document.body.classList.contains('wishlist-body') ) {
						cteateCartItem(...getParams(item, '.table-row'), cartList);
						const cartListItems = cartBlock.querySelectorAll('.cart-list-item');
						userMenuAnimation(cartBlock, cartListItems, 25);
						addDataToStorege(cartListItems, '.cart-description-title', '.cart-item-img > img', 'cartData');
						wishlistItemsValue();
					}
					});
				});

				wishlistItemsValue();
				wishlistCloseTableRow();
			}  
			createMessageForWishTable();
			wishlistItemsValue();
		}
	};

	renderWishlstTable();

	wishlistCloseTableRow();

	const renderWishlstDropList = () => {
		if (sessionStorage.wishlistData) {
			const wishlistListItems = wishlistCartList.querySelectorAll('.cart-list-item');
			wishlistListItems.forEach(item => {
				item.remove();
			});
			const wishData = JSON.parse(sessionStorage.wishlistData);
			renderCartFromLocalStorege(wishData, wishlistCartList);

			showWishListCartItems();
			wishlistItemsValue();
			removeWishlistCartItems();
		}
	};

	renderWishlstDropList();
};

export default wishlist;
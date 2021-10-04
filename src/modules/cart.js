'use strict';

import {userMenuAnimation, elemClickOpacityAnimation} from './animations';
import { addDataToStorege, removeStorageItem} from './localStorege';

const getParams = (elem, parentElemSell) => {
	const parentElem = elem.closest(parentElemSell);
			const elemImg = parentElem.querySelector('.product-img'),
				elemTitle = parentElem.querySelector('.product-title > a'),
				elemPrice = parentElem.querySelector('.price');	
	return [elemImg, elemPrice, elemTitle];
};

const cteateCartItem = (elemImage, elemPrice, elemTitle, parentElem) => {
	const currencySelect = document.getElementById('currency-select'),
		currencySelectActive = currencySelect.querySelector('.active');

	const newCartItem = document.createElement('li'),
		cartImgBlock = document.createElement('div'),
		cartImg = document.createElement('img'),
		cartDescriptionBlock = document.createElement('div'),
		cartDescription = document.createElement('p'),
		cartQuantityProduct = document.createElement('span'),
		cartQuantityIcon = document.createElement('span'),
		cartDescriptionTitle = document.createElement('span'),
		productPrice = document.createElement('p'),
		cartPrice = document.createElement('span'),
		currencyIcon = document.createElement('span'),
		newCartItemCloseBlock = document.createElement('div'),
		newCloseIcon = document.createElement('img');

	newCartItem.classList.add('cart-list-item');
	cartImgBlock.classList.add('cart-item-img');
	cartDescriptionBlock.classList.add('cart-description-block');
	cartDescription.classList.add('cart-description');
	cartQuantityProduct.classList.add('cart-quantity-product');
	cartDescriptionTitle.classList.add('cart-description-title');
	productPrice.classList.add('product-price');
	currencyIcon.classList.add('currency-icon');
	cartPrice.classList.add('cart-price');
	cartPrice.classList.add('price');
	newCartItemCloseBlock.classList.add('cart-item-close-icon');

	
	cartImg.src = elemImage.src;
	cartPrice.textContent = elemPrice.textContent;
	cartDescriptionTitle.textContent = elemTitle.textContent;

	cartQuantityIcon.textContent = ' x ';
	newCloseIcon.src = './src/img/Close-icon.png';
	cartQuantityProduct.textContent = '1 ';
	
	if( currencySelectActive.textContent === 'usd' ) {
		currencyIcon.textContent = '$ ';
	} else {
		currencyIcon.textContent = '€ ';
	}

	parentElem.append(newCartItem);
	newCartItem.append(cartImgBlock);
	cartImgBlock.append(cartImg);

	newCartItem.append(cartDescriptionBlock);
	cartDescriptionBlock.append(cartDescription);
	cartDescription.append(cartQuantityProduct);
	cartDescription.append(cartQuantityIcon);
	cartDescription.append(cartDescriptionTitle);
	cartDescriptionBlock.append(productPrice);
	productPrice.append(currencyIcon);
	productPrice.append(cartPrice);

	newCartItem.append(newCartItemCloseBlock);
	newCartItemCloseBlock.append(newCloseIcon);
};

const cart = () => {
	const cartBlock = document.querySelector('.cart-block'),
		cartListBlock = cartBlock.querySelector('.cart-list-block'),
		cartList = cartBlock.querySelector('.cart-list'),
		shippingPriceValue = document.querySelector('.shipping-price-value'),
		totalPriceValue = document.querySelector('.total-value'),
		cartItemsValue = document.querySelector('.cart-items'),
		cartIconBlock = document.querySelector('.cart-icon-block'),
		mobileCloseBtn = document.querySelector('.mobile-close'),
		addToCartBtn = document.querySelectorAll('.options-add-to-cart'),
		quickViewSection = document.querySelector('.quick-view-section');

	const showCartListItems = () => {
		const cartListItems = document.querySelectorAll('.cart-list-item');
		if (window.matchMedia("(min-width: 1025px)").matches) {
			userMenuAnimation(cartBlock, cartListItems, 25);
		}
		
		if (window.matchMedia("(max-width: 1024px)").matches) {
			elemClickOpacityAnimation(cartBlock, cartListItems, 25);
		}
	};

	showCartListItems();

	const getcartItemsValue = () => {
		const cartListItems = cartBlock.querySelectorAll('.cart-list-item');
		cartItemsValue.innerHTML = cartListItems.length;
	};

	getcartItemsValue();

	const removeCartItem = () => {
		const cartItemCloseCcon = cartBlock.querySelectorAll('.cart-item-close-icon');
		
		cartItemCloseCcon.forEach(item => {
			item.addEventListener('click', () => {
				const cartListItems = cartBlock.querySelectorAll('.cart-list-item');
				const itemParentElement = item.closest('.cart-list-item');
				const itemsArr = [...cartListItems];
				const elemIndex = itemsArr.indexOf(itemParentElement);
				removeStorageItem(elemIndex, 'cartData');
				itemParentElement.remove();
				cartTotalPrice();
				getcartItemsValue();
			});
		});
	};

	removeCartItem();

	const cartTotalPrice = () => {
			const itemsCartPrice = cartBlock.querySelectorAll('.cart-price');

			if (itemsCartPrice.length === 0) {
				const cartEptyTextelem = document.createElement('p');

				cartEptyTextelem.classList.add('cart-empty-el');
				cartEptyTextelem.textContent = 'cart is empty';

				cartListBlock.prepend(cartEptyTextelem);

				shippingPriceValue.textContent = '0';
				totalPriceValue.textContent = '0';
			}

			let totalPrice = 0;
			itemsCartPrice.forEach(item => {
				totalPrice += Number(item.textContent);
			});

			totalPrice += Number(shippingPriceValue.textContent);

			totalPriceValue.textContent = totalPrice;
	};

	cartTotalPrice();

	if (window.matchMedia("(max-width: 1024px)").matches) {
		cartIconBlock.addEventListener('click', () => {
			cartListBlock.classList.add('show-element');
		});
		
		mobileCloseBtn.addEventListener('click', () => {
			cartListBlock.classList.remove('show-element');
		});

		window.addEventListener('click', (event) => {
			const target = event.target;

			if (!target.closest('.cart-block') && !target.closest('.cart-item-close-icon')) {
				cartListBlock.classList.remove('show-element');
			}
		});
	}

	const addToCart = (elem) => {
		
		if ( !document.body.classList.contains('wishlist-body') && !document.body.classList.contains('shop-page') ) {
			if (window.matchMedia("(min-width: 1025px)").matches) {
				cteateCartItem(...getParams(elem, '.tab-list-item'), cartList);
			}
			
			if (window.matchMedia("(max-width: 1024px)").matches) {
					cteateCartItem(...getParams(elem, '.swiper-slide'), cartList);
			}
		}

		if (document.body.classList.contains('shop-page')) {
			cteateCartItem(...getParams(elem, '.product-list-item'), cartList);
		}
		
		getcartItemsValue();
		removeCartItem();
		cartTotalPrice();
		showCartListItems();

		const cartListItems = cartBlock.querySelectorAll('.cart-list-item');
		addDataToStorege(cartListItems, '.cart-description-title', '.cart-item-img > img', 'cartData');
	};

	const addToCartFromQuickViewSection = (elem) => {
		if (quickViewSection.classList.contains('show-quick-view')) {
			cteateCartItem(...getParams(elem, '.quick-view-block'), cartList);
		}

		getcartItemsValue();
		removeCartItem();
		cartTotalPrice();
		showCartListItems();

		const cartListItems = cartBlock.querySelectorAll('.cart-list-item');
		addDataToStorege(cartListItems, '.cart-description-title', '.cart-item-img > img', 'cartData');
	};

	const checkIsEmptyCart = () => {
		if ( cartListBlock.querySelector('.cart-empty-el') ) {
			cartListBlock.querySelector('.cart-empty-el').remove();
		}
	};

	const checkCartDeliveryPrice = () => {
		if ( shippingPriceValue.textContent === '0') {
			shippingPriceValue.textContent = '7';
		}
	};

	addToCartBtn.forEach(item => {
		item.addEventListener('click', () => {

			checkIsEmptyCart();
			checkCartDeliveryPrice();
			
			addToCart(item);
		});
	});

	if (quickViewSection) {
		const quickViewSectionBtn = quickViewSection.querySelector('.quick-view-Btn');

		quickViewSectionBtn.addEventListener('click', () => {

			checkIsEmptyCart();
			checkCartDeliveryPrice();
	
			addToCartFromQuickViewSection(quickViewSectionBtn);
		});
	}

};

export {cteateCartItem, getParams};

export default cart;
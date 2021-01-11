import {userMenuAnimation, elemClickOpacityAnimation} from './animations';
import createCarteSessionStorege from './localStorege';

const cart = () => {
	const cartListBlock = document.querySelector('.cart-list-block'),
		cartList = document.querySelector('.cart-list'),
		shippingPriceValue = document.querySelector('.shipping-price-value'),
		totalPriceValue = document.querySelector('.total-value'),
		cartItemsValue = document.querySelector('.cart-items'),
		cartIconBlock = document.querySelector('.cart-icon-block'),
		mobileCloseBtn = document.querySelector('.mobile-close'),
		addToCartBtn = document.querySelectorAll('.options-add-to-cart'),
		currencySelect = document.getElementById('currency-select'),
		currencySelectActive = currencySelect.querySelector('.active'),
		cartBlock = document.querySelector('.cart-block');

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
			const cartListItems = document.querySelectorAll('.cart-list-item');
			cartItemsValue.innerHTML = cartListItems.length;
		};

		getcartItemsValue();

		const removeCartItem = () => {
			const cartItemCloseCcon = document.querySelectorAll('.cart-item-close-icon');

			cartItemCloseCcon.forEach(item => {
				item.addEventListener('click', () => {
					const itemParentElement = item.closest('.cart-list-item');
					itemParentElement.remove();
					cartTotalPrice();
					getcartItemsValue();
				});
			});
		};

		removeCartItem();

		const cartTotalPrice = () => {
			const itemsCartPrice = cartList.querySelectorAll('.cart-price');

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

	const cteateCartItem = (elemImage, elemPrice, elemTitle) => {
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
		newCartItemCloseBlock.classList.add('cart-item-close-icon');

		cartImg.src = elemImage.src;
		cartQuantityIcon.textContent = 'x';
		newCloseIcon.src = './src/img/Close-icon.png';
		cartPrice.textContent = elemPrice.textContent;
		cartQuantityProduct.textContent = '1';
		cartQuantityProduct.textContent = elemTitle.textContent;

		if( currencySelectActive.textContent === 'usd' ) {
			currencyIcon.textContent = '$';
		} else {
			currencyIcon.textContent = '€';
		}

		cartList.append(newCartItem);
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

	const addToCart = (elem) => {

		if ( !document.body.classList.contains('wishlist-body') ) {
			if (window.matchMedia("(min-width: 1025px)").matches) {
			
				const parentElem = elem.closest('.tab-list-item'),
				elemImg = parentElem.querySelector('.product-img'),
				elemTitle = parentElem.querySelector('.tab-item-title > a'),
				elemPrie = parentElem.querySelector('.price');
	
				cteateCartItem(elemImg, elemPrie, elemTitle);
					
			}
			
			if (window.matchMedia("(max-width: 1024px)").matches) {
				const parentElem = elem.closest('.swiper-slide'),
					elemImg = parentElem.querySelector('.product-img'),
					elemTitle = parentElem.querySelector('.tab-item-title > a'),
					elemPrie = parentElem.querySelector('.price');
	
				cteateCartItem(elemImg, elemPrie, elemTitle);
			}
		}

		if ( document.body.classList.contains('wishlist-body') ) {
			const parentElem = elem.closest('.table-row'),
				elemImg = parentElem.querySelector('.product-img'),
				elemTitle = parentElem.querySelector('.product-title > a'),
				elemPrie = parentElem.querySelector('.price');

			cteateCartItem(elemImg, elemPrie, elemTitle);
		}
	
		getcartItemsValue();
		removeCartItem();
		cartTotalPrice();
		showCartListItems();
	};

	addToCartBtn.forEach(item => {
		item.addEventListener('click', () => {
			if ( cartListBlock.querySelector('.cart-empty-el') ) {
				cartListBlock.querySelector('.cart-empty-el').remove();
			}
			
			if ( shippingPriceValue.textContent === '0') {
				shippingPriceValue.textContent = '7';
			}
			createCarteSessionStorege(item, '.tab-list-item', '.tab-item-title > a');
			addToCart(item);
		});
	});
};

export default cart;
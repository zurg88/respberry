const cart = () => {
	const cartListBlock = document.querySelector('.cart-list-block'),
		cartItemCloseCcon = document.querySelectorAll('.cart-item-close-icon'),
		cartList = document.querySelector('.cart-list'),
		shippingPriceValue = document.querySelector('.shipping-price-value'),
		totalPriceValue = document.querySelectorAll('.total-value'),
		mobilePopupCartList = document.querySelector('.mobile-popup-cart-list'),
		cartIcon = document.querySelector('.cart-icon'),
		cartItemsValue = document.querySelector('.cart-items'),
		closeCartPopup = document.querySelector('.close-cart-popup'),
		cartIconBlock = document.querySelector('.cart-icon-block'),
		cartBlock = document.querySelector('.cart-block');

		const removeCartItem = () => {
			const cartItemCloseCcon = document.querySelectorAll('.cart-item-close-icon');

			cartItemCloseCcon.forEach(item => {
				item.addEventListener('click', () => {
					const itemParentElement = item.closest('.cart-list-item');
					itemParentElement.remove();
					cartTotalPrice();
				});
			});
		};

		removeCartItem();

		const cartTotalPrice = () => {
			const itemsCartPrice = cartList.querySelectorAll('.cart-price');

			if (itemsCartPrice.length === 0) {
				cartListBlock.style.display = 'none';
			}

			let totalPrice = 0;
			itemsCartPrice.forEach(item => {
				totalPrice += Number(item.textContent);
			});

			totalPrice += Number(shippingPriceValue.textContent);

			totalPriceValue.forEach(item => {
				item.textContent = totalPrice;
			});
			// totalPriceValue.textContent = totalPrice;
		};

		cartTotalPrice();

		cartIconBlock.addEventListener('click', () => {
			if (window.matchMedia("(max-width: 576px)").matches) {
			  cartIcon.classList.toggle('display-none');
			  cartItemsValue.classList.toggle('display-none');
			  closeCartPopup.classList.toggle('display-flex');
			}
	  });

	  closeCartPopup.addEventListener('click', () => {
		if (cartListBlock.classList.contains('show-element')){
			cartListBlock.classList.remove('show-element');
		}
	});

		cartBlock.addEventListener('click', ()=> {
			if (closeCartPopup.classList.contains('display-flex')) {
				cartListBlock.classList.add('show-element');
			}
			

		});

		window.addEventListener('click', (event) => {
			const target = event.target;
			if (!target.closest('.cart-block')) {
			
				if ( !target.closest('img') && target.closest('.close-cart-popup')) {
					console.log(target);
					cartListBlock.classList.remove('show-element');
				}
			}
		});

		

		

		
};

export default cart;
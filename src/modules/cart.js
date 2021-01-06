const cart = () => {
	const cartListBlock = document.querySelector('.cart-list-block'),
		cartItemCloseIcon = document.querySelectorAll('.cart-item-close-icon'),
		cartList = document.querySelector('.cart-list'),
		shippingPriceValue = document.querySelector('.shipping-price-value'),
		totalPriceValue = document.querySelector('.total-value'),
		cartIcon = document.querySelector('.cart-icon'),
		cartItemsValue = document.querySelector('.cart-items'),
		closeCartPopup = document.querySelector('.close-cart-popup'),
		cartIconBlock = document.querySelector('.cart-icon-block'),
		mobileCloseBtn = document.querySelector('.mobile-close'),
		cartBlock = document.querySelector('.cart-block');

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
				cartListBlock.style.display = 'none';
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

};

export default cart;
const cart = () => {
	const cartListBlock = document.querySelector('.cart-list-block'),
		cartItemCloseCcon = document.querySelectorAll('.cart-item-close-icon'),
		cartList = document.querySelector('.cart-list'),
		shippingPriceValue = document.querySelector('.shipping-price-value'),
		totalPriceValue = document.querySelector('.total-value'),
		mobilePopupCartList = document.querySelector('.mobile-popup-cart-list'),
		cartIconBlock = document.querySelector('.cart-icon-block');

		cartItemCloseCcon.forEach(item => {
			item.addEventListener('click', () => {
				const itemParentElement = item.closest('.cart-list-item');
				itemParentElement.remove();
				cartTotalPrice();
			});
		});

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

		cartIconBlock.addEventListener('click', () => {
			
			  if (window.matchMedia("(max-width: 576px)").matches) {
				const cartListClone = cartListBlock.cloneNode(true);

				mobilePopupCartList.innerHTML = cartListClone.innerHTML;
				console.log(mobilePopupCartList);
			  }

		});
};

export default cart;
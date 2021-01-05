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

		cartIconBlock.addEventListener('click', () => {
			if (window.matchMedia("(max-width: 1024px)").matches) {
			  cartIcon.classList.toggle('display-none');
			  cartItemsValue.classList.toggle('display-none');
			  closeCartPopup.classList.toggle('display-flex');

				cartBlock.addEventListener('click', ()=> {
					cartListBlock.classList.toggle('show-element');
				});

				closeCartPopup.addEventListener('click', (event) => {
					const target = event.target;
						if (target.closest('.close-cart-popup')) {
							cartListBlock.classList.remove('show-element');
						}
					});
			}
	  });

	  if (window.matchMedia("(min-width: 1024px)").matches) {
		cartIconBlock.addEventListener('mouseenter', (event) => {
			const target = event.target;
			cartListBlock.classList.add('show-element');
		});
		
		cartIconBlock.addEventListener('mouseleave', () => {
			cartListBlock.classList.remove('show-element');
		});

	}

	

		

	

};

export default cart;
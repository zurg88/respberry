const cart = () => {
	const cartListBlock = document.querySelector('.cart-list-block'),
		cartItemCloseCcon = document.querySelectorAll('.cart-item-close-icon');

		cartItemCloseCcon.forEach(item => {
			item.addEventListener('click', () => {
				const itemParentElement = item.closest('.cart-list-item');
				itemParentElement.remove();
			})
		});
}

export default cart;
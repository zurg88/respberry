const wishlist = () => {
	
	const wishlist = document.querySelector('.wishlist'),
		itemsValue = wishlist.querySelector('.items-value'),
		footer = wishlist.querySelector('.main-footer');
	
	const wishlistCloseTableRow = () => {
		const colseBtnCollection = document.querySelectorAll('.close-btn');
		colseBtnCollection.forEach(item => {
			item.addEventListener('click', () => {
				const parentElem = item.closest('.table-row');
				parentElem.remove();	
			});
		});
	};
	wishlistCloseTableRow();
};

export default wishlist;
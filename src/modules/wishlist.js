import {createCartSessionStorege, addDataToStorege} from './localStorege';

const wishlist = () => {
	const wishlistLink = document.querySelector('.wishlist-link'),
		itemsValue = wishlistLink.querySelector('.items-value'),
		tableRow = document.querySelectorAll('.table-row');

	console.log(tableRow);
	
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
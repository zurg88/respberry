const vartPage = () => {
	const	tableQuantityMinusBtns = document.querySelectorAll('.table-quantity-minus-btn'),
		tableQuantityPlusBtns = document.querySelectorAll('.table-quantity-plus-btn'),
		cartTable = document.querySelector('.cart-table'),
		carttableCloseElements = cartTable.querySelectorAll('.close-btn');
	
	const leggЕilQuantityInputValue = (btn, input) => {
		btn.addEventListener('click', () => {
			removeDisabledAttr(btn);
			input.value++;
		});
	}
	
	const redusereQuantityInputValue = (btn, input) => {
		btn.addEventListener('click', () => {
			if(input.value != 1) {
				input.value--;
			} else {
				btn.setAttribute("disabled", "");
			}
		});
	}

	const findQuantityInputForProduct = (btn => {
		const parentElem = btn.parentNode;
		const input = parentElem.querySelector('.cart-table-quantity-input');

		return	input;
	});

	const removeDisabledAttr = (btn) => {
		const parentElem = btn.parentNode;
		const minusBtn = parentElem.querySelector('.table-quantity-minus-btn');
		minusBtn.removeAttribute('disabled');
	};

	tableQuantityPlusBtns.forEach(btn => {
		leggЕilQuantityInputValue(btn, findQuantityInputForProduct(btn));
	});

	tableQuantityMinusBtns.forEach(btn => {
		redusereQuantityInputValue(btn, findQuantityInputForProduct(btn));
	});

	const closeCartTablerow = (elem) => {
		// console.log(elem);

		const parentRow = elem.closest('.table-row');
		parentRow.remove();
	};

	carttableCloseElements.forEach( closeElem  => {
		closeElem.addEventListener('click', () => {
			closeCartTablerow(closeElem);
		});
	})

}

export default vartPage;
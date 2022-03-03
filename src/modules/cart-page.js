const vartPage = () => {
	const	cartTable = document.querySelector('.cart-table'),
		cartTableRows = document.querySelectorAll('.cart-table .table-row'),
		currencySelect = document.getElementById('currency-select'),
		currencySelectActive = currencySelect.querySelector('.active'),
		startingTotalPrice = document.getElementById('starting-total-price'),
		shippingPrice = document.getElementById('shipping-price'),
		totalPrice = document.getElementById('total-price');

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

	const closeCartTablerow = (elem) => {
		const parentRow = elem.closest('.table-row');
		parentRow.remove();
	};

	const getTotalTablerowPrice = (productPrice, quantity) => {
		const totalPrice = +productPrice.textContent * quantity.value;
		return Number(totalPrice);
	};

	const getTotalPrice = () => {
		const tableRowsPrices = cartTable.querySelectorAll('.cart-page-row-total-price');
		let result = 0;

		tableRowsPrices.forEach(item => {
			result += Number(item.textContent);
		});

		startingTotalPrice.textContent = result;
		totalPrice.textContent = result + Number(shippingPrice.textContent);
	};

	const renderCartPagefromSessionStorege = (renderData, parentElem) => {
		if(!sessionStorage.cartData) {
			return;
		}
		renderData.forEach(item => {
			const newCartTableItem = document.createElement('tr'),
			closeTableRowCell = document.createElement('td'),
			newCloseIconBtn = document.createElement('button'),
			newCloseIcon = document.createElement('img'),
			cartTableProductDescriptionBlock = document.createElement('td'),
			tableProductDescriptionImg = document.createElement('div'),
			cartTableProductImg = document.createElement('img'),
			cartTableDescriptionBlock = document.createElement('div'),
			productTitle = document.createElement('h3'),
			cartTablePriceCell = document.createElement('td'),
			cartTableCurrencyIcon = document.createElement('span'),
			cartPagePrice = document.createElement('span'),
			cartTableQuantityCell = document.createElement('td'),
			tableQuantityCellGroupElements = document.createElement('div'),
			tableQuantityMinusBtn = document.createElement('button'),
			tableQuantityPlusBtn = document.createElement('button'),
			cartTableQuantityInput = document.createElement('input'),
			cartTableTotalPriceCell = document.createElement('td'),
			cartTableTotalPticeCurrencyIcon = document.createElement('span'),
			cartPageTotalPrice = document.createElement('span');
		
			newCartTableItem.classList.add('table-row');
			closeTableRowCell.classList.add('close-cell');
			newCloseIconBtn.classList.add('close-btn');
			cartTableProductDescriptionBlock.classList.add('cart-table-product-description-block');
			tableProductDescriptionImg.classList.add('product-description-img');
			cartTableProductImg.classList.add('product-img');
			cartTableProductImg.classList.add('img-responsive');
			cartTableDescriptionBlock.classList.add('cart-table-product-description');
			productTitle.classList.add('product-title');
			cartTableCurrencyIcon.classList.add('currency-icon');
			cartPagePrice.classList.add('cart-page-price');
			cartPagePrice.classList.add('price');
			cartTableQuantityCell.classList.add('table-quantity-cell');
			tableQuantityCellGroupElements.classList.add('table-quantity-cell-group-elements');
			tableQuantityMinusBtn.classList.add('table-quantity-minus-btn');
			tableQuantityPlusBtn.classList.add('table-quantity-plus-btn');
			cartTableQuantityInput.classList.add('cart-table-quantity-input');
			cartTableTotalPticeCurrencyIcon.classList.add('currency-icon');
			cartPageTotalPrice.classList.add('cart-page-price');
			cartPageTotalPrice.classList.add('cart-page-row-total-price');
			cartPageTotalPrice.classList.add('price');

			newCloseIcon.setAttribute("src", "./src/img/Close-dark-icon.png");
			newCloseIcon.setAttribute("alt", "close");

			tableQuantityMinusBtn.textContent = '-';
			tableQuantityPlusBtn.textContent = '+';
			cartTableQuantityInput.value = '1';

			if( currencySelectActive.textContent === 'usd' ) {
				cartTableTotalPticeCurrencyIcon.textContent = '$ ';
				cartTableCurrencyIcon.textContent = '$ ';
			} else {
				cartTableTotalPticeCurrencyIcon.textContent = '€ ';
				cartTableCurrencyIcon.textContent = '€ ';
			}

			parentElem.append(newCartTableItem);

			newCartTableItem.append(closeTableRowCell);
			newCartTableItem.append(cartTableProductDescriptionBlock);
			newCartTableItem.append(cartTablePriceCell);
			newCartTableItem.append(cartTableQuantityCell);
			newCartTableItem.append(cartTableTotalPriceCell);

			closeTableRowCell.append(newCloseIconBtn);
			newCloseIconBtn.append(newCloseIcon);

			cartTableProductDescriptionBlock.append(tableProductDescriptionImg);
			tableProductDescriptionImg.append(cartTableProductImg);
			cartTableProductDescriptionBlock.append(cartTableDescriptionBlock);
			cartTableDescriptionBlock.append(productTitle);

			cartTablePriceCell.append(cartTableCurrencyIcon);
			cartTablePriceCell.append(cartPagePrice);

			cartTableQuantityCell.append(tableQuantityCellGroupElements);
			tableQuantityCellGroupElements.append(tableQuantityMinusBtn);
			tableQuantityCellGroupElements.append(cartTableQuantityInput);
			tableQuantityCellGroupElements.append(tableQuantityPlusBtn);

			cartTableTotalPriceCell.append(cartTableTotalPticeCurrencyIcon);
			cartTableTotalPriceCell.append(cartPageTotalPrice);

		
			cartTableProductImg.src = item.img;
			cartPagePrice.textContent = item.price;
			productTitle.textContent = item.title;

			cartPageTotalPrice.textContent = getTotalTablerowPrice(cartPagePrice, cartTableQuantityInput);

			// Events

			newCloseIconBtn.addEventListener('click', () => {
				closeCartTablerow(newCloseIconBtn);
				getTotalPrice();
			});

			redusereQuantityInputValue(tableQuantityMinusBtn, findQuantityInputForProduct(tableQuantityMinusBtn));
			leggЕilQuantityInputValue(tableQuantityPlusBtn, findQuantityInputForProduct(tableQuantityPlusBtn));

			tableQuantityMinusBtn.addEventListener('click', () => {
				cartPageTotalPrice.textContent = getTotalTablerowPrice(cartPagePrice, cartTableQuantityInput);
				getTotalPrice();
			});

			tableQuantityPlusBtn.addEventListener('click', () => {
				cartPageTotalPrice.textContent = getTotalTablerowPrice(cartPagePrice, cartTableQuantityInput);
				getTotalPrice();
			});

			
		});
	}

	if (sessionStorage.cartData && document.body.classList.contains('cart-page')) {
		const cartStoregeData = JSON.parse(sessionStorage.cartData);
		cartTableRows.forEach(item => {
			item.remove();
		});
		renderCartPagefromSessionStorege(cartStoregeData, cartTable);
		getTotalPrice()
	}

}

export default vartPage;
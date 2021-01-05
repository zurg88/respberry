const changeCurrency = () => {

	const currentlist = document.querySelector('.currency-select'),
		  currentCurrencyValue = currentlist.querySelector('.active'),
		  currencyItems = currentlist.querySelectorAll('.select-item'),
		  currencyIcons = document.querySelectorAll('.currency-icon'),
		  dollarIcon = '$',
		  euroIcon = '€';

	const changeCurrencyIcon = (icon) => {
		currencyIcons.forEach(item => {
			item.textContent = icon;
		});
	};

	const changeCurrencyValue = () => {
		const currentCurrencyValue = currentlist.querySelector('.active');
		const priceCollection = document.querySelectorAll('.price');

		if (currentCurrencyValue.textContent === 'eur') {
			priceCollection.forEach(item => {
				item.textContent = (Number(item.textContent) / 0.9).toFixed(2);
			});
			changeCurrencyIcon(dollarIcon);
		}
	
		if (currentCurrencyValue.textContent === 'usd') {
			priceCollection.forEach(item => {
				item.textContent = (Number(item.textContent) * 0.9).toFixed(2);
		});
		changeCurrencyIcon(euroIcon);
		}
	
	};
	currencyItems.forEach(item => {
		item.addEventListener('click', ()=> {
			if (!item.classList.contains('active') && item.textContent !== currentCurrencyValue.textContent) {
				changeCurrencyValue();
			} else {
				return;
			}
		});
  	});


		


};

export default changeCurrency;
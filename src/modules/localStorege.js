'use strict';

const currencySelect = document.getElementById('currency-select'),
	currencySelectActive = currencySelect.querySelector('.active'),
	cartList = document.querySelector('.cart-list'),
	wishlistLink = document.querySelector('.wishlist-link'),
	cartListItems = document.querySelectorAll('.cart-list-item');

const addDataToStorege = (elemCollection, data, title, image, storageDataName) => {
	if (elemCollection.length > 0) {
		data = [];
		
		elemCollection.forEach(item => {
			let newData = {
				img: item.querySelector(image).src,
				price: item.querySelector('.price').textContent,
				title: item.querySelector(title).textContent
			};
			data.push(newData);
		});

		sessionStorage.setItem(storageDataName, JSON.stringify(data));
	}
};

const renderCartFromLocalStorege = (renderData) => {
	renderData.forEach(item => {
		const newCartItem = document.createElement('li'),
		cartImgBlock = document.createElement('div'),
		cartImg = document.createElement('img'),
		cartDescriptionBlock = document.createElement('div'),
		cartDescription = document.createElement('p'),
		cartQuantityProduct = document.createElement('span'),
		cartQuantityIcon = document.createElement('span'),
		cartDescriptionTitle = document.createElement('span'),
		productPrice = document.createElement('p'),
		cartPrice = document.createElement('span'),
		currencyIcon = document.createElement('span'),
		newCartItemCloseBlock = document.createElement('div'),
		newCloseIcon = document.createElement('img');

	newCartItem.classList.add('cart-list-item');
	cartImgBlock.classList.add('cart-item-img');
	cartDescriptionBlock.classList.add('cart-description-block');
	cartDescription.classList.add('cart-description');
	cartQuantityProduct.classList.add('cart-quantity-product');
	cartDescriptionTitle.classList.add('cart-description-title');
	productPrice.classList.add('product-price');
	currencyIcon.classList.add('currency-icon');
	cartPrice.classList.add('cart-price');
	cartPrice.classList.add('price');
	newCartItemCloseBlock.classList.add('cart-item-close-icon');

	cartImg.src = item.img;
	cartPrice.textContent = item.price;
	cartDescriptionTitle.textContent = item.title;
	cartQuantityIcon.textContent = 'x';
	newCloseIcon.src = './src/img/Close-icon.png';
	cartQuantityProduct.textContent = '1';
	
	if( currencySelectActive.textContent === 'usd' ) {
		currencyIcon.textContent = '€';
	} else {
		currencyIcon.textContent = '$';
	}

	cartList.append(newCartItem);
	newCartItem.append(cartImgBlock);
	cartImgBlock.append(cartImg);

	newCartItem.append(cartDescriptionBlock);
	cartDescriptionBlock.append(cartDescription);
	cartDescription.append(cartQuantityProduct);
	cartDescription.append(cartQuantityIcon);
	cartDescription.append(cartDescriptionTitle);
	cartDescriptionBlock.append(productPrice);
	productPrice.append(currencyIcon);
	productPrice.append(cartPrice);

	newCartItem.append(newCartItemCloseBlock);
	newCartItemCloseBlock.append(newCloseIcon);

	});
};

wishlistLink.addEventListener('click', () => {
	const cartListItems = document.querySelectorAll('.cart-list-item');
	addDataToStorege(cartListItems, 'data1', '.cart-description-title', '.cart-item-img > img', 'cartData');
});

if (sessionStorage.cartData) {
	const cartStoregeData = JSON.parse(sessionStorage.cartData);
	cartListItems.forEach(item => {
		item.remove();
	});
		renderCartFromLocalStorege(cartStoregeData);
}

const removeStorageItem = (index, storageDataName) => {
	if (sessionStorage.cartData) {
		let dataArr = JSON.parse(sessionStorage.cartData);

		dataArr.splice(index, 1);
		sessionStorage.setItem(storageDataName, JSON.stringify(dataArr));
	} 
};

export {addDataToStorege, removeStorageItem};
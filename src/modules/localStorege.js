const createCarteSessionStorege = (elem,parentElem, title) => {
	const parent = elem.closest(parentElem),
		parentImage = parent.querySelector('.product-img'),
		parentPrice = parent.querySelector('.price'),
		parentTitle = parent.querySelector(title);

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	const data = {},
		randomKey = getRandomInt(1000);
	
	data.img = parentImage.src;
	data.price = parentPrice.textContent;
	data.title = parentTitle.textContent;

	sessionStorage.keys += ',' + JSON.stringify(randomKey);
	sessionStorage.setItem(randomKey, JSON.stringify(data));

	const as = sessionStorage.keys;
	const ad = as.split(',');
	
	
	console.log(ad);
};

export default createCarteSessionStorege;
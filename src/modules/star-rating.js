const removeItemsClass = (elem, classNane) => {
	elem.classList.remove(classNane);
};

const addClass = (elem, classNane) => {
	elem.classList.add(classNane);
};

const starRating = (rating) => {

	const ratingItem = rating.querySelectorAll('.icon-star');
  



	const createCurrentRating = () => {
		for (let i = 0; i < ratingItem.length; i++) {
			removeItemsClass(ratingItem[i], 'active');
	    }

		for (let i = 0; i < ratingItem.length; i++) {
			if (ratingItem[i].classList.contains('current-rating')) {
				addClass(ratingItem[i], 'active');
				break;
			} else {
				addClass(ratingItem[i], 'active');
			}
		}
	};

	createCurrentRating();

	rating.addEventListener('mouseover', (e) => {
		const target = e.target;
		ratingItem.forEach(item => {
			removeItemsClass(item, 'active');
		});

		if (target.closest('.icon-star')) {
			for (let i = 0; i < ratingItem.length; i++) {
				if (ratingItem[i] === target ) {
					addClass(target, 'active');
					break;
				}
				addClass(ratingItem[i], 'active');
			}
		}
	});
	
	rating.addEventListener('mouseout', () => {
		for (let i = 0; i < ratingItem.length; i++) {
			 if (ratingItem[i].classList.contains('current-rating')) {
				 break;
			 }
			 removeItemsClass(ratingItem[i], 'active');
		}
		createCurrentRating();
	});

	rating.addEventListener('click', (e) => {
		const target = e.target;

		for (let i = 0; i < ratingItem.length; i++) {
			removeItemsClass(ratingItem[i], 'current-rating');
		}

		addClass(target, 'current-rating');
		createCurrentRating();

	});
};

export {addClass, removeItemsClass};

export default starRating;
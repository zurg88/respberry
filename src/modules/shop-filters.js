'use strict';

const filters = ()=> {
	const productList = document.querySelector('.product-list'),
		leftSidebar = document.querySelector('.left-sidebar'),
		productContent = document.querySelector('.product-content'),
		mobileFilterButton  = document.querySelector('.mobile-filter-button'),
		sortingSelect = document.getElementById('sorting-select'),
		viewBtnsArr = document.querySelectorAll('.grid-view'),
		productCategoriesLink = document.querySelectorAll('.product-categories-link'),
		productListItems = document.querySelectorAll('.product-list-item'),
		colorFilterItemLink = document.querySelectorAll('.color-filter-item-link'),
		productTagsItem = document.querySelectorAll('.product-tags-item'),
		rangeSlider = document.querySelector('.range-slider'),
		showingElems = document.getElementById('showing-elems'),
		resultsElems = document.getElementById('results-elems'),
		footer = document.querySelector('.main-footer');
	

	const showQuantityVisibleProducts = () => {
		if(document.body.classList.contains('shop-page')) {
			const products = productList.querySelectorAll('.product-list-item');
			showingElems.textContent = products.length;
		}
	};

	const showQuantityProducts = () => {
		if(document.body.classList.contains('shop-page')) {
			resultsElems.textContent = productListItems.length;
		}
	};

	showQuantityProducts();
	showQuantityVisibleProducts();

	viewBtnsArr.forEach(item => {
		item.addEventListener('click', (e)=>{
			const target = e.target;
			viewBtnsArr.forEach(item => {
				item.classList.remove('active-view');
			});
			target.closest('.grid-view').classList.add('active-view');
			if(target.closest('#table-view')) {
				productList.classList.add('product-list-table-view');
			} else {
				productList.classList.remove('product-list-table-view');
			}
		});
	});

	const findCategoryItems = (categoryName)=> {
		const productArr = [];
		productListItems.forEach(item => {
			if(item.classList.contains(categoryName)) {
				productArr.push(item);
			}
		});
		productList.innerHTML = '';
		productArr.forEach(item => {
			productList.append(item);
		});
		showQuantityVisibleProducts();
	};

	const categoriesTagsFilter = (filterСriteria)=> {
		filterСriteria.forEach(item => {
			
			item.addEventListener('click', (event) => {
				event.preventDefault();
				const itemContent = item.textContent;
				console.log(itemContent.toLowerCase());
				findCategoryItems(itemContent.toLowerCase());
			});
		});

		showQuantityVisibleProducts();
	};

	categoriesTagsFilter(productCategoriesLink);
	categoriesTagsFilter(colorFilterItemLink);
	categoriesTagsFilter(productTagsItem);

	const productFilterPrice = () => {
		const products = productList.querySelectorAll('.product-list-item'),
			productsPriceArr = [];
		
		products.forEach(item => {
			productsPriceArr.push(item.querySelector('.price'));
		});

		function compareNumbers(a, b) {
			return a.textContent - b.textContent;
		  }

		productsPriceArr.sort(compareNumbers);
	
		productList.innerHTML = '';
		productsPriceArr.forEach(item => {
			productList.append(item.closest('.product-list-item'));
		});

		showQuantityVisibleProducts();
	};

	if(document.body.classList.contains('shop-page')) {
		sortingSelect.addEventListener('change', ()=> {
			if(sortingSelect.value === 'price') {
				productFilterPrice();
			}
			if(sortingSelect.value === 'default sorting') {
				productListItems.forEach(item => {
					productList.append(item);
				});
			}
		});
	
		rangeSlider.noUiSlider.on('change', function(){
			const sliderValue = rangeSlider.noUiSlider.get(),
				products = productList.querySelectorAll('.product-list-item');
			let count = products.length;
			
				products.forEach(item=> {
					if(item.querySelector('.price').textContent < +sliderValue[0]) {
						item.style.display = 'none';
					} else if(item.querySelector('.price').textContent > +sliderValue[1]) {
						item.style.display = 'none';
					} else {
						item.style.display = 'flex';
					}
				});
	
				products.forEach(item=> {
					if(item.style.display === 'none') {
						count = count - 1;
					}
				});
				showingElems.textContent = count;
		});

		mobileFilterButton.addEventListener('click', ()=> {
			leftSidebar.classList.toggle('sidebar-active');
			productContent.classList.toggle('product-content-sidebar-active');
			footer.classList.toggle('display-none');
		});
	}

	
};

export default filters;
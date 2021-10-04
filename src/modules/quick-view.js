'use strict';
import {getParams} from './cart';

const quickView = () => {
	const quickViewSection = document.querySelector('.quick-view-section');

	if (quickViewSection) {
		const quickViewImageBlock = quickViewSection.querySelector('.image-block'),
			quickViewProductTitle = quickViewSection.querySelector('.product-title > a'),
			quickViewPrice = quickViewSection.querySelector('.price'),
			quickViewImage = quickViewImageBlock.querySelector('img'),
			quickViewLink = document.querySelectorAll('.quick-view-link');

		const createQuickViewInfo = (elemImg, elemPrice, elemTitle) => {
			quickViewImage.src = elemImg.src;
			quickViewProductTitle.textContent = elemTitle.textContent;
			quickViewPrice.textContent = elemPrice.textContent;
		};

		quickViewLink.forEach(item => {
			item.addEventListener('click', () => {

				if ( !document.body.classList.contains('wishlist-body') && !document.body.classList.contains('shop-page') ) {
					if (window.matchMedia("(min-width: 1025px)").matches) {
						createQuickViewInfo(...getParams(item, '.tab-list-item'));
					}
					
					if (window.matchMedia("(max-width: 1024px)").matches) {
							createQuickViewInfo(...getParams(item, '.swiper-slide'));	
					}
				}
		
				if (document.body.classList.contains('shop-page')) {
					createQuickViewInfo(...getParams(item, '.product-list-item'));
				}
			});
		});

		const preventScroll = event => {
			event.preventDefault();
		};
	
		quickViewLink.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				quickViewSection.classList.add('show-quick-view');
				document.addEventListener('wheel', preventScroll, {passive: false});
			});
		});

		quickViewSection.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.quick-view-section') || target.closest('.close-section-btn')) {
				quickViewSection.classList.remove('show-quick-view');
			document.removeEventListener('wheel', preventScroll);
			}

		});
	}
		
};

export default quickView;
'use strict';

// css
import './scss/style.scss';

// JS

import topSelect from './modules/top-menu-select';
import projectAnimations from './modules/animations';
import cart from './modules/cart';
import carousel from './modules/carousel';
import starRating from './modules/star-rating';
import tabs from './modules/tabs';
import mobileMenu from './modules/mobile-menu';
import changeCurrency from './modules/currency';
import wishlist from './modules/wishlist';
import account from './modules/account';
import subscribe from './modules/subscribe';
import filters from './modules/shop-filters';
import quickView from './modules/quick-view';
import createCommentForm from './modules/comment-form';
import cartPage from './modules/cart-page';
import menuActiveLink from './modules/menu';

import noUiSlider from 'nouislider';

const rangeSlider = document.querySelector('.range-slider');

if(rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 220],
    connect: true,
    step: 10,
    range: {
      'min': 0,
      'max': 300
    }
  });

  const priceFromValue = document.querySelector('.price-from'),
    priceToValue = document.querySelector('.price-to'),
    priceValues = [priceFromValue, priceToValue];

    rangeSlider.noUiSlider.on('update', function(values,handle){
      priceValues[handle].textContent = Math.round(values[handle]);
    });
}



// Menu Active Link

menuActiveLink();

// Animations
projectAnimations();

// top select
const topSelectCollection = document.querySelectorAll('.left-menu-select');
topSelectCollection.forEach(item => {
	topSelect(item);
});

// Cart
cart();

// Carousel
carousel();

  // Star Rating
  const ratingBlocks = document.querySelectorAll('.rating');

  ratingBlocks.forEach(item => {
	starRating(item);
  });

  // Tabs
const FeaturedTabsContainer = document.querySelector('.featured-products-section');
const newTabsContainer = document.querySelector('.new-products-section');

tabs(FeaturedTabsContainer);
tabs(newTabsContainer);

// Mobile Menu
mobileMenu();

// Currency select 
changeCurrency();
  
// Wishlist 
wishlist();

// Account
account();

// Subscribe form
subscribe();

// Shop Filters
filters();

// quick View
quickView();

// Comment form
createCommentForm();

// Cart Page
cartPage();
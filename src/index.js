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
  


 
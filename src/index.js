'use strict';

// css
import './scss/style.scss';

// JS

import topSelect from './modules/top-menu-select';
import projectAnimations from './modules/animations';
import cart from './modules/cart';
import carousel from './modules/carousel';
import starRating from './modules/star-rating';


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

import Swiper, { Navigation, Pagination } from 'swiper';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:
const swiper = new Swiper('.swiper-container', {
	spaceBetween: 30,
	speed: 400,
	centeredSlides: true,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	  },
	  flipEffect: {
		slideShadows: true,
	  },
  });

  // Star Rating

  const ratingBlocks = document.querySelectorAll('.rating');

  ratingBlocks.forEach(item => {
	starRating(item);
  });

  


 
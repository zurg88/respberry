'use strict';

// css
import './scss/style.scss';

// JS

import topSelect from './modules/top-menu-select';
import projectAnimations from './modules/animations';
import cart from './modules/cart';

// Animations
projectAnimations();


// top select
const topSelectCollection = document.querySelectorAll('.left-menu-select');
topSelectCollection.forEach(item => {
	topSelect(item);
});

// Cart

cart();
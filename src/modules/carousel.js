import Swiper from 'swiper/bundle';

const carousel = () => {

	const mobileSliders = document.querySelectorAll('.mobile-slider');
	
	const swiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		flipEffect: {
			slideShadows: true,
		  },
		  fadeEffect: {
			crossFade: true
		  },
  	});

  mobileSliders.forEach(item => {
	let mobileSlider = new Swiper(item, {
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		  },
		  slidesPerView: 1,
		  loop: true,
		  width: document.querySelector('.swiper-container').getBoundingClientRect().width,
	  });
  });
};

export default carousel;

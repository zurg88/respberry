const topSelect = (select) => {
	
	const options = select.querySelectorAll('.select-item'),
	 optionActive = select.querySelector('.active');

	 optionActive.textContent = options[1].textContent;

	 select.addEventListener('click', (e) => {
		 const target = e.target;
		 if(!target.matches('select-item')) {
			 options.forEach(item => {
				item.classList.toggle('show-element');
				optionActive.textContent = target.textContent;
			 });
		 } else  {
			 console.log('!!');
			options.forEach(item => {
				item.classList.remove('show-element');
			 });
		 }
	 });


};

export default topSelect;
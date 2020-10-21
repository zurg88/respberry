const projectAnimations = () => {
	const userLink = document.querySelector('.user-link'),
		accountListItems = document.querySelectorAll('.account-list-item');


	const userMenuAnimation = () => {
		userLink.addEventListener('mouseover', () => {
			let count = 0;
			
			const intervalId = setInterval(() => {
				if (count === accountListItems.length - 1)  {
					clearInterval(intervalId);
				}
				accountListItems[count].style.opacity = '1';
					count++;
			}, 25);
		});
		
		userLink.addEventListener('mouseout', () => {
			accountListItems.forEach(item => {
				item.style.opacity = '0';
			});
		});
	};

	userMenuAnimation();

	

	
};

export default projectAnimations;

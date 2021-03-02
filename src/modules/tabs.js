import { addClass, removeItemsClass } from "./star-rating";

const tabs = (tabsContainer) =>  {
	try {
		const tabsNav = tabsContainer.querySelectorAll('.tabs-nav-btn'),
		  tabsCollection = tabsContainer.querySelectorAll('.tab');
		  console.log(tabsCollection);

	const activateTab = () => {
		tabsCollection.forEach(item => {
			removeItemsClass(item, 'active-tab');
		});
		for (let i = 0; i < tabsNav.length; i++) {
			if (tabsNav[i].classList.contains('tabs-nav-active')) {
				for (let j = 0; j < tabsCollection.length; j++) {
					addClass(tabsCollection[i], 'active-tab');
				}
			}	
		}
	 };

  	tabsNav.forEach(item => {
	  item.addEventListener('click', () => {
		tabsNav.forEach(elem => {
			removeItemsClass(elem, 'tabs-nav-active');
		});
		addClass(item, 'tabs-nav-active');
		activateTab();
	  });
	});
	} catch (error) {
		return false;
	}

		  
};

export default tabs;
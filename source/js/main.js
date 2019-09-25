'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('.catalog__item');
  const shopList = document.querySelector('.catalog__list');

  console.log(shopTemplate);

  // функция отрисовки и изменения характеристик магазина
  let renderShop = (shop) => {

    let shopElement = shopTemplate.cloneNode(true);
    let img = shopElement.querySelector('img');
    let title = shopElement.querySelector('h3');

    // img.setAttribute('src', shop.images);
    // img.setAttribute('alt', shop.name);

    title.textContent = shop.name;

    return shopElement;
  };


  let displayShops = (shops) => {
    console.log(shops);
    let fragment = document.createDocumentFragment();

    shops.forEach(function (shop) {
      fragment.append(renderShop(shop));
    });

    shopList.append(fragment);
  };

  window.backend.loadRestaurants(displayShops, 'error');
})();

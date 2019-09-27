'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('#catalog-item');
  const shopList = document.querySelector('.catalog__list');

  /**
   * @param shop
   * @returns {Node}
   */
  let renderShop = (shop) => {
    let shopElement = shopTemplate.cloneNode(true); // клонирую разметку шаблона
    let img = shopElement.querySelector('img'); // картинка
    let title = shopElement.querySelector('h3'); // заголовок
    let location = shopElement.querySelector('.catalog__item-location'); // местоположение
    let price = shopElement.querySelector('.catalog__item-price'); // цена
    let kitchen = shopElement.querySelector('.catalog__item-kitchen'); // кухня
    let time = shopElement.querySelector('.catalog__item-time'); // время

    img.setAttribute('src', shop.images.normal);
    img.setAttribute('srcset', shop.images.retina + ' 2x');
    img.setAttribute('alt', shop.name);

    title.textContent = shop.name;
    location.textContent = ' — ' + shop.location;

    for (let i = 1; i <= shop.averagePrice; i++) {
      price.insertAdjacentHTML('afterbegin', '&#8381');
    }

    kitchen.textContent = shop.kitchens.join(' • ');
    time.textContent = shop.timeOfDelivery.join(' - ') + ' Min';

    return shopElement;
  };

  /**
   * @param shops
   */
  let displayShops = (shops) => {
    console.log(shops);
    let fragment = document.createDocumentFragment();

    shops.forEach(function (shop) {
      fragment.append(renderShop(shop));
    });

    shopList.append(fragment);
  };

  window.backend.loadRestaurants(displayShops, 'error');

  /**
   * @param product
   */
  let displayProducts = (product) => {
    // let fragment = document.createDocumentFragment();
    let title = document.querySelector('.banner__title');
    let location = shopElement.querySelector('.banner__location');
    let price = shopElement.querySelector('.banner__price');
    let kitchen = shopElement.querySelector('.banner__kitchen');
    let time = shopElement.querySelector('.banner__time');

    title.textContent = product.name;

    // shopList.append(fragment);
  };

  window.backend.loadRestaurant(displayProducts, 'error');
})();

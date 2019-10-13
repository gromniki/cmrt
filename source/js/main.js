'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('#catalog-item');
  const shopList = document.querySelector('.catalog__list');

  /**
   * @param shop
   * @returns {Node}
   */
  const renderShop = (shop) => {
    const shopElement = shopTemplate.cloneNode(true); // клонирую разметку шаблона
    const img = shopElement.querySelector('img'); // картинка
    const title = shopElement.querySelector('h3'); // заголовок
    const location = shopElement.querySelector('.catalog__item-location'); // местоположение
    const price = shopElement.querySelector('.catalog__item-price'); // цена
    const kitchen = shopElement.querySelector('.catalog__item-kitchen'); // кухня
    const time = shopElement.querySelector('.catalog__item-time'); // время

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
  const displayShops = (shops) => {
    console.log(shops);
    const fragment = document.createDocumentFragment();

    shops.forEach(function (shop) {
      fragment.append(renderShop(shop));
    });
    

    shopList.append(fragment);
  };

  window.backend.loadRestaurants(displayShops, 'error');

  /**
   * @param product
   */
  const displayProducts = (product) => {
    console.log(product);
    // const fragment = document.createDocumentFragment();
    const banner = document.querySelector('.banner');
    const title = banner.querySelector('.banner__title');
    const location = banner.querySelector('.banner__location');
    const price = banner.querySelector('.banner__price');
    const kitchen = banner.querySelector('.banner__kitchen');
    const time = banner.querySelector('.banner__time');

    banner.setAttribute('style', `background: url("${product.images.wideNormal}") center / cover no-repeat;`);
    // banner.setAttribute('style', 'background: url("' + product.images.wideNormal + '") center / cover no-repeat;');
    title.textContent = product.name;

    for (let i = 1; i <= product.averagePrice; i++) {
      price.insertAdjacentHTML('afterbegin', '&#8381');
    }

    kitchen.textContent = product.kitchens.join(' • ');
    time.textContent = product.timeOfDelivery.join(' - ') + ' Min';
  };

  window.backend.loadRestaurant(displayProducts, 'error');
})();

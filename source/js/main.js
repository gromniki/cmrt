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
    console.log(product);
    // let fragment = document.createDocumentFragment();
    let banner = document.querySelector('.banner');
    let title = banner.querySelector('.banner__title');
    let location = banner.querySelector('.banner__location');
    let price = banner.querySelector('.banner__price');
    let kitchen = banner.querySelector('.banner__kitchen');
    let time = banner.querySelector('.banner__time');

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

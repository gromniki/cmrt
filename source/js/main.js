'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('#catalog-item');
  const shopList = document.querySelector('.catalog__list');

  console.log(shopTemplate);

  // функция отрисовки и изменения характеристик магазина
  let renderShop = (shop) => {
    let shopElement = shopTemplate.cloneNode(true);
    let img = shopElement.querySelector('img'); // картинка
    let title = shopElement.querySelector('h3'); // заголовок
    let location = shopElement.querySelector('.catalog__item-location'); // местоположение
    let price = shopElement.querySelector('.catalog__item-price'); // цена
    let kitchen = shopElement.querySelector('.catalog__item-kitchen'); // кухня
    let timeMin = shopElement.querySelector('.catalog__item-time-min'); // минимальное время
    let timeMax = shopElement.querySelector('.catalog__item-time-max'); // максимальное время

    img.setAttribute('src', shop.images.normal);
    img.setAttribute('srcset', shop.images.retina + ' 2x');
    img.setAttribute('alt', shop.name);

    title.textContent = shop.name;
    location.textContent = shop.location;

    console.log(shop.averagePrice);
    price.textContent = 'PPP';

    kitchen.textContent = shop.kitchens.join(' • ');
    timeMin.textContent = shop.timeOfDelivery[0];
    timeMax.textContent = shop.timeOfDelivery[1];

    return shopElement;
  };

  // функция вывода каталога магазинов на страницу
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

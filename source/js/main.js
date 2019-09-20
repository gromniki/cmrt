'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('.catalog__item');

  // функция отрисовки и изменения характеристик магазина
  let renderShop = function (shop) {
    let shopElement = shopTemplate.cloneNode(true);
    let img = shopElement.querySelector('img');

    img.setAttribute('src', shop.images);
    img.setAttribute('alt', shop.name);


    return shopElement;
  };

})();

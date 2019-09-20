'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('.catalog__item');
  const shopList = document.querySelector('.catalog__list');

  console.log(shopTemplate);

  // функция отрисовки и изменения характеристик магазина
  let renderShop = function (shop) {
    let shopElement = shopTemplate.cloneNode(true);
    let img = shopElement.querySelector('img');
    let title = shopElement.querySelector('h3');

    img.setAttribute('src', shop.images);
    img.setAttribute('alt', shop.name);

    title.textContent = 'Test';

    return shopElement;
  };

  let fragment = document.createDocumentFragment();


  // let arrayShops = renderShop(window.backend.loadRestaurants());

  shopList.append(fragment);

  // функция отрисовки магазинов на странице
  // let renderShops = function () {
  //   let fragment = document.createDocumentFragment();
  //
  //   // pins.forEach(function (pin) {
  //   //   fragment.appendChild(renderPin(pin));
  //   // });
  //
  //
  //   // генерация пинов
  //   // window.backend.load(window.pin.onRender, window.message.onError);
  //   window.backend.loadRestaurants(renderShop);
  //   shopList.append(fragment);
  // };

})();

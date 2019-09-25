'use strict';

(function () {
  const shopTemplate = document.querySelector('#shop').content.querySelector('.catalog__item');
  const shopList = document.querySelector('.catalog__list');

  console.log(shopTemplate);

  // функция отрисовки и изменения характеристик магазина
  let renderShop = (shop) => {
    debugger;
    let shopElement = shopTemplate.cloneNode(true);
    let img = shopElement.querySelector('img');
    let title = shopElement.querySelector('h3');

    // img.setAttribute('src', shop.images);
    // img.setAttribute('alt', shop.name);

    title.textContent = shop;

    return shopElement;
  };


  let displayShops = () => {
    let fragment = document.createDocumentFragment();


    // let arr = window.backend.loadRestaurants;
    //
    // arr.forEach(function (shop) {
    //   fragment.append(renderShop(shop));
    // });
    // fragment.append(window.backend.loadRestaurants(renderShop, 'errorTest'));

    shopList.append(fragment);
  };

  displayShops();



  console.log(window.backend.loadRestaurants('ttttttt', 'testError'));


  // var renderPins = function () {
  //   var fragment = document.createDocumentFragment();
  //   var filteredPins = filterByHousingFeature(); // Фильтруем все пины
  //   var pins = getRenderedPins(filteredPins, PINS_MAX_COUNT); // берем первые 5
  //
  //   pins.forEach(function (pin) {
  //     fragment.appendChild(renderPin(pin));
  //   });
  //
  //   clearPins();
  //   window.card.removeCard();
  //   similarListElement.appendChild(fragment);
  // };




  // let shopElement = shopTemplate.cloneNode(true);
  // let img = shopElement.querySelector('img');
  // let title = shopElement.querySelector('h3');
  //
  // img.setAttribute('src', '/test-src');
  // img.setAttribute('alt', 'Такой атрибут');
  //
  // title.textContent = 'Test';
  //
  // let fragment = document.createDocumentFragment();
  //
  // fragment.append(shopElement);
  //
  // shopList.append(fragment);

  // shopList.append(shopElement);




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

'use strict';

(function () {
  var UrlData = {
    LOAD: {
      restaurants: 'https://raw.githubusercontent.com/cmrt2/test-task/master/restaurants.json',
      restaurant: 'https://raw.githubusercontent.com/cmrt2/test-task/master/restaurants.json'
    }
  };

  var REQUEST_TIMEOUT = 10000; // 10s

  var ResponseCodes = {
    OK: 200
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ResponseCodes.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    return xhr;
  };

  var loadRestaurants = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', UrlData.LOAD.restaurants);
    xhr.send();
  };

  var loadRestaurant = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', UrlData.LOAD.restaurant);
    xhr.send();
  };

  window.backend = {
    loadRestaurants: loadRestaurants,
    loadRestaurant: loadRestaurant
  };
})();

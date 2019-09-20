'use strict';

// Открытие/закрытие основного меню
let mainMenu = document.querySelector('.js-main-nav');
let showMainMenu = document.querySelector('.js-show-menu');
let subListFirst = document.querySelector('.js-sub-nav-1');
let subListSecond = document.querySelector('.js-sub-nav-2');

showMainMenu.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (mainMenu.classList.contains('main-nav--closed')) {
    mainMenu.classList.add('main-nav--opened');
    mainMenu.classList.remove('main-nav--closed');
    // subListFirst.classList.add('show-list');
    // subListSecond.classList.add('show-list');
  } else {
    mainMenu.classList.remove('main-nav--opened');
    mainMenu.classList.add('main-nav--closed');
    // subListFirst.classList.remove('show-list');
    // subListSecond.classList.remove('show-list');
  }
});


// Форма поиска
let showSearch = document.querySelector('.js-show-search');
let searchForm = document.querySelector('.js-search');
let searchInput = searchForm.querySelector('[name=search]');

showSearch.addEventListener('click', function (evt) {
  evt.preventDefault();

  this.classList.toggle('main-header__show-search--active');
  searchForm.classList.toggle('show');
  searchInput.focus();
});


// Форма обратной связи
let btnShowFeedback = document.querySelectorAll('.js-btn-show-modal-feedback');
let modalOverlay = document.querySelector('.js-modal-overlay');
let feedbackPopup = document.querySelector('.js-modal-feedback');
let form = feedbackPopup.querySelector('.js-modal-form');
let nameField = feedbackPopup.querySelector('[name=imyarek]');
let emailField = feedbackPopup.querySelector('[name=pochta]');
let commentField = feedbackPopup.querySelector('[name=commento]');
let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

let popupClose = document.querySelectorAll('.modal__close');

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

for (let i = 0; i < btnShowFeedback.length; i++) {
  btnShowFeedback[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.add('modal-show');
    modalOverlay.classList.add('modal-overlay');

    if (storageName && !emailField) {
      nameField.value = storageName;
      emailField.focus();
    } else if (storageEmail && storageName) {
      nameField.value = storageName;
      emailField.value = storageEmail;
      commentField.focus();
    } else {
      nameField.focus();
    }
  });
}

form.addEventListener('submit', function (evt) {
  if (!nameField.value || !emailField.value || !commentField.value) {
    evt.preventDefault();
    feedbackPopup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameField.value);
      localStorage.setItem('email', emailField.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (feedbackPopup.classList.contains('modal-show')) {
      feedbackPopup.classList.remove('modal-show');
      feedbackPopup.classList.remove('modal-error');
      modalOverlay.classList.remove('modal-overlay');
    }
  }
});


// Кнопка закрытия для всех модальных окон
for (let i = 0; i < popupClose.length; i++) {
  popupClose[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    this.parentNode.classList.remove('modal-show');
    modalOverlay.classList.remove('modal-overlay');
    console.log('Закрыл элемент ' + this.parentNode.className);
  });
}


// Unique ID
let formInput = document.querySelectorAll('.js-input');
let formLabel = document.querySelectorAll('.js-label');

for (let i = 0; i < formInput.length; i++) {
  formInput[i].setAttribute('id', i + 1);
  formLabel[i].setAttribute('for', i + 1);

  formInput[i].addEventListener('change', function (evt) {
    evt.preventDefault();

    //console.log(this.value);

/*    if (this.value === '') {
      formLabel[i].classList.remove('fields__label--active');
    } else {
      formLabel[i].classList.add('fields__label--active');
    }*/

    this.value === '' ? formLabel[i].classList.remove('fields__label--active') : formLabel[i].classList.add('fields__label--active');

  });
}



// jquery
$(function () {
  //$('body').css('background-color', 'orange');

  $('.js-slider-examples').slick({
    lazyLoad: 'progressive',
    centerMode: true,
    centerPadding: '100px',
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  $('.js-slider-manufacture').slick({
    lazyLoad: 'progressive',
    centerMode: true,
    centerPadding: '100px',
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  $('.js-slider-offer').slick({
    fade: true,
    //lazyLoad: 'ondemand',
    //centerMode: true,
    //centerPadding: '40px',
    //dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $('.js-slider-rubricator').slick({
    //fade: true,
    //centerMode: true,
    //centerPadding: '50px',
    dots: true,
    //variableWidth: true,
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 570,
        settings: {
          centerMode: true,
          centerPadding: '60px',
          variableWidth: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

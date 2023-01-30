//Попапы
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupOpenImage = document.querySelector(".popup_type_open-img");

//Кнопки
const popupCloseButton = popup.querySelector(".popup__btn-close");
const popupProfileCloseButton = document.querySelector(".popup__btn-close_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-btn");
const popupAddCardOpenButton = document.querySelector(".profile__add-btn");
const popupAddCardCloseButton = document.querySelector(".popup__btn-close_type_add-card");
const popupOpenImgCloseButton = document.querySelector(".popup__btn-close_type_open-img");

//Элементы блока profile
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//Элементы блока cards
const cardsContainer = document.querySelector(".cards");
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");

//Попап элемнеты
const popupUsername = popup.querySelector(".popup__input_value_name");
const popupInfo = popup.querySelector(".popup__input_value_info");
const popupAddImgName = document.querySelector(".popup__input_value_label");
const popupAddImgLink = document.querySelector(".popup__input_value_link");

const popupForm = popup.querySelector(".popup__form");
const popupAddCardForm = document.querySelector(".popup__form_type_add-card");
const popupContainer = document.querySelector(".popup__container");

const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__img-title");


//Функия открытия попапов
function popupOpen(popup) {
  popup.classList.add('popup_opened');
};

//Открытие попапа профиля
popupProfileOpenButton.addEventListener('click', function () {
  popupOpen(popupProfile);
  popupUsername.value = profileTitle.textContent;
  popupInfo.value = profileSubtitle.textContent;
});

//Открытие попапа для добавления карт
popupAddCardOpenButton.addEventListener('click', function () {
  popupOpen(popupAddCard);
});


//Функция закрытия попапов
function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

//Закрытие попапа профиля
popupProfileCloseButton.addEventListener('click', function () {
  popupClose(popupProfile);
});

//Закрытие попапа для добавления карт
popupAddCardCloseButton.addEventListener('click', function () {
  popupClose(popupAddCard);
});

//Закрытие попапа просмотра изображений
popupOpenImgCloseButton.addEventListener('click', function () {
  popupClose(popupOpenImage);
});

//Функция редактирования профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = popupUsername.value;
  profileSubtitle.textContent = popupInfo.value;
  popupClose(popupProfile);
}
popupForm.addEventListener('submit', handleFormSubmit);


//Добавляем карты на страницу 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-btn');
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__like-icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-icon_active');
  });
  cardDelete.addEventListener('click', function () {
    cardElement.remove();
  });
  cardElement.querySelector('.card__image-btn').addEventListener('click', function (evt) {
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupImageTitle.textContent = element.name;
    popupOpen(popupOpenImage);
  });
  cardsContainer.append(cardElement); 
});


//Функция создания карт
function newCrad(evt) {
  evt.preventDefault;
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-btn');
  cardElement.querySelector('.card__title').textContent = popupAddImgName.value;
  cardElement.querySelector('.card__image').src = popupAddImgLink.value;
  cardElement.querySelector('.card__image').alt = popupAddImgName.value;
  cardElement.querySelector('.card__like-icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-icon_active');
  });
  cardDelete.addEventListener('click', function () {
    cardElement.remove();
  });
  cardElement.querySelector('.card__image-btn').addEventListener('click', function (evt) {
    popupImage.src = popupAddImgLink.value;
    popupImage.alt = popupAddImgName.value;
    popupImageTitle.textContent = popupAddImgName.value;
    popupOpen(popupOpenImage);
  });
  cardsContainer.prepend(cardElement); 

  popupClose(popupAddCard);
}

popupAddCardForm.addEventListener('submit', newCrad);
import { formValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

//Попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupOpenImage = document.querySelector(".popup_type_open-img");

//Кнопки
const popupProfileOpenButton = document.querySelector(".profile__edit-btn");
const popupAddCardOpenButton = document.querySelector(".profile__add-btn");


//Элементы блока profile
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//Элементы блока cards
const cardsContainer = document.querySelector(".cards");

//Попап элементы
const popupUsername = document.querySelector(".popup__input_value_name");
const popupInfo = document.querySelector(".popup__input_value_info");
const popupAddImgName = document.querySelector(".popup__input_value_label");
const popupAddImgLink = document.querySelector(".popup__input_value_link");
const popupForm = document.querySelector(".popup__form");
const popupAddCardForm = document.querySelector(".popup__form_type_add-card");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__img-title");

//Массив из 6 карт
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

//Элементы валидации
const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorList: 'popup__input-error',
};

//Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
};

//Открытие попапа профиля
popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupUsername.value = profileTitle.textContent;
  popupInfo.value = profileSubtitle.textContent;
});

//Открытие попапа для добавления карт
popupAddCardOpenButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
};

//Закрытие попапов кликом на оверлей и крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__btn-close')) {
          closePopup(popup)
        }
    })
})

//Закрытие попапа на клавишу Esc
function pressEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Функция редактирования профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = popupUsername.value;
  profileSubtitle.textContent = popupInfo.value;
  closePopup(popupProfile);
}
popupForm.addEventListener('submit', handleFormSubmit);

//Функция создания карт
function createCrad(item) {
  const card = new Card(item, '#cards-template');
  const cardElement = card.generateCard();
  return cardElement;
}

//Вывод 6 карт на страницу
initialCards.forEach((item) => {
  cardsContainer.append(createCrad(item));
});

//Функция добавления карт
function addCard (evt) {
  evt.preventDefault();
  const card = {name: popupAddImgName.value, link: popupAddImgLink.value};
  cardsContainer.prepend(createCrad(card));
  evt.target.reset();
  closePopup(popupAddCard);
  formPopupAddCardValidator.toggleButton();
}
popupAddCardForm.addEventListener('submit', addCard);

const formPopupAddCardValidator = new formValidator(formValidatorConfig, popupAddCard);
formPopupAddCardValidator.enableValidation();

const formPopupProfileCardValidator = new formValidator(formValidatorConfig, popupProfile);
formPopupProfileCardValidator.enableValidation(); 

export {popupImage, popupImageTitle, openPopup, popupOpenImage}

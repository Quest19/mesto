//Попапы
export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupOpenImage = document.querySelector(".popup_type_open-img");

//Кнопки
export const popupProfileOpenButton = document.querySelector(".profile__edit-btn");
export const popupAddCardOpenButton = document.querySelector(".profile__add-btn");


export const cardsContainer = document.querySelector(".cards");

//Элементы блока profile
export const profile = document.querySelector(".profile");
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

//Попап элементы
export const popupUsername = document.querySelector(".popup__input_value_name");
export const popupInfo = document.querySelector(".popup__input_value_info");
export const popupAddImgName = document.querySelector(".popup__input_value_label");
export const popupAddImgLink = document.querySelector(".popup__input_value_link");
export const popupAddCardForm = document.querySelector(".popup__form_type_add-card");
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__img-title");
 
//Массив из 6 карт
export const initialCards = [
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
export const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorList: 'popup__input-error',
};

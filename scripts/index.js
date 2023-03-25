import * as constants from "./constants.js"
import { formValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./section.js";
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//Функция, которая принимает новые данные профиля и добавляет их на страницу
function handleFormSubmit () {
  user.setUserInfo(constants.popupUsername.value, constants.popupInfo.value);
  profilePopup.closePopup();
}

//Функция создания карт
function createCrad(data) {
  const card = new Card(data, '#cards-template', (name, link) => {imagePopup.openPopupImg(name, link)});
  const cardElement = card.generateCard();
  return cardElement;
}

//Отрисока и добавление массива с картами на страницу
const defaultCardList = new Section ({
  items: constants.initialCards,
  renderer: (item) => {
    const cardElement = createCrad(item);
    defaultCardList.addItem(cardElement);
  }
}, ".cards");

defaultCardList.renderItems();

//Функция, которая принимает данные для отрисоки карты и добаляет ее на страницу
function createNewCrad () {
  const newCard = {name: constants.popupAddImgName.value, link: constants.popupAddImgLink.value};
  constants.cardsContainer.prepend(createCrad(newCard));
  addCardPopup.closePopup();
}

//Открытие попапа профиля
constants.popupProfileOpenButton.addEventListener('click', () => {
  profilePopup.openPopup();
  const userData = user.getUserInfo();
  constants.popupUsername.value = userData.name;
  constants.popupInfo.value = userData.info;
  formPopupProfileCardValidator.toggleButton();
});

//Открытие попапа для добавления новых карт
constants.popupAddCardOpenButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  formPopupAddCardValidator.toggleButton();
});

//Данные о пользователе
const user = new UserInfo({ userNameSelector: '.profile__title', userInfoSelector: '.profile__subtitle'});

//Попап для изображение
const imagePopup = new PopupWithImage('.popup_type_open-img');
imagePopup.setEventListeners();

//Попап профиля
const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmit);
profilePopup.setEventListeners();

//Попап добавления новых карт
const addCardPopup = new PopupWithForm('.popup_type_add-card', createNewCrad);
addCardPopup.setEventListeners();

//Валидация попапа добавления новых карт
const formPopupAddCardValidator = new formValidator(constants.formValidatorConfig, constants.popupAddCard);
formPopupAddCardValidator.enableValidation();

//Валидация попапа профиля
const formPopupProfileCardValidator = new formValidator(constants.formValidatorConfig, constants.popupProfile);
formPopupProfileCardValidator.enableValidation(); 




import * as constants from "../utils/constants.js"
import { formValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { Section } from "../scripts/section.js";
import { PopupWithImage } from "../scripts/popupWithImage.js";
import { PopupWithForm } from "../scripts/popupWithForm.js";
import { PopupWithDeleteCard } from "../scripts/PopupWithDeleteCard.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Api } from "../scripts/Api.js";
import './index.css';


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62/",
  headers: { 
    authorization: "c703a015-4806-4bd0-b82d-fbb68bacd036",
    "content-Type": "application/json",
  }
});


api.getAllTasks();

let currentUserId;

api.getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    user.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  })

api.getInitialCards()
  .then((cards) => {
    defaultCardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

// Promise.all([api.getUserInfo(), api.getInitialCards()])
//   .then(([userData, cards]) => {
//     user.setUserInfo(userData);
//     defaultCardList.renderItems(cards.reverse());
//   })

//Функция, которая принимает новые данные профиля и добавляет их на страницу

function handleFormSubmit (item) {
  api.setProfileInfo(item)
    .then((data) => {
      user.setUserInfo(data);
      profilePopup.closePopup()
    })
    .catch((err) => {
      console.log(err);
    })
}

// function handleFormSubmit (data) {
//   user.setUserInfo(data);
//   profilePopup.closePopup();
// }

//Функция создания карт
function createCrad(data) { 
  const card = new Card(data,
  currentUserId,
  '#cards-template',
  (name, link) => {imagePopup.openPopupImg(name, link)});

  const cardElement = card.generateCard();
  return cardElement;
}


//Функция редактирования аватарки профиля
function addNewAvatar(item) {
  api.setProfileAvatar(item)
    .then((data) => {
      user.addAvatarImage(data);
      profileAvatarPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
}

// function addNewAvatar (data) {
//   user.addAvatarImage(data);
//   profileAvatarPopup.closePopup();
// }

//Отрисока и добавление массива с картами на страницу
const defaultCardList = new Section ({
  renderer: (data) => {
    const cardElement = createCrad(data);
    defaultCardList.addItem(cardElement);
  }
}, ".cards");


//Функция, которая принимает данные для отрисоки карты и добаляет ее на страницу
function createNewCrad(data) {
  api.addNewCard(data)
    .then((newData) => {
      const newCard = createCrad(newData);
      defaultCardList.addItem(newCard)
      addCardPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
}

// function createNewCrad (item) {
//   const newCard = createCrad(item);
//   defaultCardList.addItem(newCard);
//   addCardPopup.closePopup();
// }

//Открытие попапа профиля
constants.popupProfileOpenButton.addEventListener('click', () => {
  profilePopup.openPopup();
  profilePopup.setInputValues(user.getUserInfo())
  formPopupProfileCardValidator.toggleButton();
});

//Открытие попапа для добавления новых карт
constants.popupAddCardOpenButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  formPopupAddCardValidator.toggleButton();
});

constants.popupAddAvatarOpenButton.addEventListener('click', () => {
  profileAvatarPopup.openPopup();
  formPopupAddAvatarValidtor.toggleButton();
})

//Данные о пользователе
const user = new UserInfo({ userNameSelector: '.profile__title', userInfoSelector: '.profile__subtitle', userAvatarSelector: '.profile__avatar' });

//Попап для изображение
const imagePopup = new PopupWithImage('.popup_type_open-img');
imagePopup.setEventListeners();

const profileAvatarPopup = new PopupWithForm('.popup_type_add-avatar', addNewAvatar);
profileAvatarPopup.setEventListeners();

//Попап профиля
const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmit);
profilePopup.setEventListeners();

//Попап добавления новых карт
const addCardPopup = new PopupWithForm('.popup_type_add-card', createNewCrad);
addCardPopup.setEventListeners();

const deleteCardPopup = new PopupWithDeleteCard('.popup_type_delete-card');
deleteCardPopup.setEventListeners();

//Валидация попапа добавления новых карт
const formPopupAddCardValidator = new formValidator(constants.formValidatorConfig, constants.popupAddCard);
formPopupAddCardValidator.enableValidation();

//Валидация попапа профиля
const formPopupProfileCardValidator = new formValidator(constants.formValidatorConfig, constants.popupProfile);
formPopupProfileCardValidator.enableValidation(); 

//Валидация попапа  
const formPopupAddAvatarValidtor = new formValidator(constants.formValidatorConfig, constants.popupAddAvatarImage);
formPopupAddAvatarValidtor.enableValidation();


import * as constants from "../utils/constants.js"
import { formValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { Section } from "../scripts/section.js";
import { PopupWithImage } from "../scripts/popupWithImage.js";
import { PopupWithForm } from "../scripts/popupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Api } from "../scripts/Api.js";
import { PopupWithDeleteCard } from "../scripts/PopupWithDeleteCard.js";
import './index.css';

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62/",
  headers: { 
    authorization: "c703a015-4806-4bd0-b82d-fbb68bacd036",
    "content-Type": "application/json",
  }
});

api.getAllCardInfo(); //данные о картах
api.getMyUserInfo(); //данные о пользователе

api.getUserInfo()
  .then((userData) => {
    userId = userData._id;
    user.setUserInfo(userData);
  })

api.getInitialCards()
  .then((cards) => {
    defaultCardList.renderItems(cards.reverse());
  })

//Функция создания карт
function createCrad(data) {
  const card = new Card(data,
  userId, 
  '#cards-template', 
  (name, link) => {imagePopup.openPopupImg(name, link)},
  handleDeleteCard,
  (id) => {
    api.putLikeCard(id)
    .then((res) => {
      card.likeCounter(res);
      card.setLikeIcon();
    })
    .catch((err) => {
      console.log(err);
    })
  },
  (id) => {
    api.deleteLikeCard(id)
    .then((res) => {
      card.likeCounter(res);
      card.deleteLikeIcon();
    })
    .catch((err) => {
      console.log(err);
    })
  },
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//Функция, которая принимает новые данные профиля и добавляет их на страницу
function handleFormSubmit(item) {
  profilePopup.renderLoadingForProfile(true);
  api.patchUserInfo(item)
   .then((data) => {
    user.setUserInfo(data);
    profilePopup.closePopup();
   })
   .catch((err) => {
    console.log(err);
   })
   .finally(() => {
    profilePopup.renderLoadingForProfile(false);
   })
}

//Функция, которая принимает данные для отрисоки карты и добаляет ее на страницу
function createNewCrad(item) {
  addCardPopup.renderLoadingForAddCard(true);
  api.postNewCard(item)
    .then((data) => {
      const newCard = createCrad(data);
      defaultCardList.addItem(newCard);
      addCardPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoadingForAddCard(false);
    })
}

//Функция удаления карты
function handleDeleteCard(id, element) {
  deleteCardPopup.openPopup();
  deleteCardPopup.setFormSubmitHandler(() => {
    return api.deleteCard(id)
      .then(() => {
        element.remove();
        element = null;
        deleteCardPopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
  })
}

//Функция редактирования аватарки профиля
function addNewAvatar(item) {
  profileAvatarPopup.renderLoadingForProfile(true);
  api.patchProfileAvatar(item)
    .then((data) => {
      user.setUserAvatar(data);
      profileAvatarPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((err) => {
      profileAvatarPopup.renderLoadingForProfile(false);
    })
}

//Отрисока и добавление массива с картами на страницу
const defaultCardList = new Section ({
  renderer: (data) => {
    const cardElement = createCrad(data);
    defaultCardList.addItem(cardElement);
  }
}, ".cards");

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

//Открытие попапа для редактирования аватара профиля
constants.popupAddAvatarOpenButton.addEventListener('click', () => {
  profileAvatarPopup.openPopup();
  formPopupAddAvatarValidtor.toggleButton();
})

//Данные о пользователе
const user = new UserInfo({ userNameSelector: '.profile__title', userInfoSelector: '.profile__subtitle', userAvatarSelector: '.profile__avatar'});

//Попап для изображение
const imagePopup = new PopupWithImage('.popup_type_open-img');
imagePopup.setEventListeners();

//Попап профиля
const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmit);
profilePopup.setEventListeners();

//Попап добавления новых карт
const addCardPopup = new PopupWithForm('.popup_type_add-card', createNewCrad);
addCardPopup.setEventListeners();

//Попап удаления карт
const deleteCardPopup = new PopupWithDeleteCard('.popup_type_delete-card');
deleteCardPopup.setEventListeners();

//Попап редактирования аватара профиля
const profileAvatarPopup = new PopupWithForm('.popup_type_add-avatar', addNewAvatar);
profileAvatarPopup.setEventListeners();

//Валидация попапа добавления новых карт
const formPopupAddCardValidator = new formValidator(constants.formValidatorConfig, constants.popupAddCard);
formPopupAddCardValidator.enableValidation();

//Валидация попапа профиля
const formPopupProfileCardValidator = new formValidator(constants.formValidatorConfig, constants.popupProfile);
formPopupProfileCardValidator.enableValidation(); 

//Валидация попапа аватара профиля
const formPopupAddAvatarValidtor = new formValidator(constants.formValidatorConfig, constants.popupAddAvatarImage);
formPopupAddAvatarValidtor.enableValidation();


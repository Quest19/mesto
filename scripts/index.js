const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__btn-close");
const popupOpenButton = document.querySelector(".profile__edit-btn");
const popupSaveButton = popup.querySelector(".popup__btn-save");
const popupContainer = document.querySelector(".popup__container");

let popupForm = popup.querySelector(".popup__form");
let profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
let popupUsername = popup.querySelector(".popup__form-username");
let popupInfo = popup.querySelector(".popup__form-info");

popupOpenButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popup.classList.add('popup_opened');

  popupUsername.value = profileTitle.textContent;
  popupInfo.value = profileSubtitle.textContent; 
});

popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
});

function formSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupUsername.value;
  profileSubtitle.textContent = popupInfo.value;
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmit);
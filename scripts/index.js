const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__btn-close");
const popupOpenButton = document.querySelector(".profile__edit-btn");
const popupContainer = document.querySelector(".popup__container");

let popupForm = popup.querySelector(".popup__form");
let profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
let popupUsername = popup.querySelector(".popup__input_value_name");
let popupInfo = popup.querySelector(".popup__input_value_info");

function popupOpen() {
  popup.classList.add('popup_opened');
  popupUsername.value = profileTitle.textContent;
  popupInfo.value = profileSubtitle.textContent;
}

popupOpenButton.addEventListener('click', popupOpen);

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = popupUsername.value;
  profileSubtitle.textContent = popupInfo.value;
  closePopup();
}

popupForm.addEventListener('submit', handleFormSubmit);
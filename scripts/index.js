//Страница
const page = document.querySelector('.root');

//Попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupOpenImage = document.querySelector(".popup_type_open-img");

//Кнопки
const popupProfileOpenButton = document.querySelector(".profile__edit-btn");
const popupAddCardOpenButton = document.querySelector(".profile__add-btn");
const buttonSubmit = popupAddCard.querySelector(".popup__btn-save");

//Элементы блока profile
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//Элементы блока cards
const cardsContainer = document.querySelector(".cards");
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");
const cardTemplate = document.querySelector("#cards-template").content;

//Попап элемнеты
const popupUsername = document.querySelector(".popup__input_value_name");
const popupInfo = document.querySelector(".popup__input_value_info");
const popupAddImgName = document.querySelector(".popup__input_value_label");
const popupAddImgLink = document.querySelector(".popup__input_value_link");
const popupForm = document.querySelector(".popup__form");
const popupAddCardForm = document.querySelector(".popup__form_type_add-card");
const popupContainer = document.querySelector(".popup__container");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__img-title");

//Функия открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', pressEsc);
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
  page.removeEventListener('keydown', pressEsc);
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
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-btn');
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__like-icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-icon_active');
  });
  cardDelete.addEventListener('click', function () {
    cardElement.remove();
  });
  cardElement.querySelector('.card__image-btn').addEventListener('click', function (evt) {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupImageTitle.textContent = item.name;
    openPopup(popupOpenImage);
  });
  return cardElement;
}

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

initialCards.forEach(function (name, link) {
  cardsContainer.append(createCrad(name, link));
});


//Функция добавления новой карты + деактивируем кнопку 
function addCard (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCrad({name: popupAddImgName.value, link: popupAddImgLink.value}));
  evt.target.reset();
  closePopup(popupAddCard);
  const submitButton = popupAddCard.querySelector('.popup__btn-save');
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__btn-save_disabled');
}

popupAddCardForm.addEventListener('submit', addCard);


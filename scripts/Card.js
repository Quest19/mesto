import {popupImage, popupImageTitle, openPopup, popupOpenImage} from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__like-icon');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _toggleLikeCardButton(evt) {
    this._likeBtn.classList.toggle('card__like-icon_active');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._toggleLikeCardButton();
    });
    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._element.remove();
    })

    this._element.querySelector('.card__image-btn').addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupImageTitle.textContent = this._name;
      openPopup(popupOpenImage);
    });
  }
}

export {Card}

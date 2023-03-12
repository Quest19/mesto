import {popupImage, popupImageTitle, openPopup, popupOpenImage} from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__like-icon');
    this._deleteBtn = this._element.querySelector('.card__delete-btn');
    this._cardImg = this._element.querySelector('.card__image-btn');
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

  _toggleLikeCardButton() {
    this._likeBtn.classList.toggle('card__like-icon_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _showCardImage() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageTitle.textContent = this._name;
    openPopup(popupOpenImage);
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._toggleLikeCardButton();
    });
    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard();
    })
    this._cardImg.addEventListener('click', () => {
      this._showCardImage();
    });
  }
}

export {Card}

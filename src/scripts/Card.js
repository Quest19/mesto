export class Card {
  constructor(data, currentUserId, templateSelector, handleCardClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__like-icon');
    this._deleteBtn = this._element.querySelector('.card__delete-btn');
    this._cardImg = this._element.querySelector('.card__image-btn');
    this._counter = this._element.querySelector('.card__like-counter');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }



  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    if (this._ownerId === this._currentUserId) {
      this._deleteBtn.remove();
    }

    return this._element;
  }

  _toggleLikeButton() {
    this._likeBtn.classList.toggle('card__like-icon_active');
  }

  // _deleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._toggleLikeButton();
    });
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}



export class Card { 
  constructor(data, userID, templateSelector, handleCardClick, handleDeleteCard, setLike, deleteLike) { 
    this._data = data;
    this._name = data.name; 
    this._link = data.link; 
    this._likes = data.likes;
    this._id = data._id
    this._userID = userID;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector; 
    this._handleCardClick = handleCardClick; 
    this._handleDeleteCard = handleDeleteCard;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
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
    this._counter.textContent = this._likes.length; 
    this._setLikes();
    if (this._userID !== this._ownerId) {
      this._deleteBtn.remove();
    }
    return this._element; 
  } 

  _setLikes() {
    if (this._likes.some(item => item._id === this._userID)) {
      this.setLikeIcon();
    } else {
      this.deleteLikeIcon();
    }
  }

  likeCounter(data) {
    this._counter.textContent = data.likes.length;
  }

  _toggleLikeCardButton() { 
    if (!this._likeBtn.classList.contains('card__like-icon_active')) {
      this._setLike(this._id);
    }else {
      this._deleteLike(this._id);
    }
  } 

  setLikeIcon() {
    this._likeBtn.classList.add('card__like-icon_active');
  }

  deleteLikeIcon() {
    this._likeBtn.classList.remove('card__like-icon_active');
  }

  deleteCard() { 
    this._element.remove();
    this._element = null;
  } 
 
  _setEventListeners() { 
    this._likeBtn.addEventListener('click', () => { 
      this._toggleLikeCardButton();
    }); 
    this._deleteBtn.addEventListener('click', () => { 
      this._handleDeleteCard(this._id); 
    }); 
    this._cardImg.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._link); 
    }); 
  } 
} 
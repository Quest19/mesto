export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._loadingBtn = this._popupElement.querySelector('.popup__btn-save');
  }

  //Метод закрытия попапа по нажалию на клавишу Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  //Метод отображения сохранения на кнопке информации о пользователе и редактирования аватара
  renderLoadingForProfile(isLoading) {
    if (isLoading) {
      this._loadingBtn.textContent = 'Сохранение...' 
    } else {
      this._loadingBtn.textContent = 'Сохранить';
    }
  }

  //Метод отображения сохранения на кнопке добавления карт
  renderLoadingForAddCard(isLoading) {
    if (isLoading) {
      this._loadingBtn.textContent = 'Сохранение...' 
    } else {
      this._loadingBtn.textContent = 'Создать';
    }
  }

  //Метод открытия попапа
  openPopup() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Метод закрытия попапа
  closePopup() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Метод закрытия попапов кликом на оверлей и крестик
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup()
      }
      if (evt.target.classList.contains('popup__btn-close')) {
        this.closePopup()
      }
    });
  }
}
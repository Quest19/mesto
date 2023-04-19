import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    //Кнопки
    this._loadingBtn = this._popupElement.querySelector('.popup__btn-save');
    //Колбэк с данными
    this._handleFormSubmit = handleFormSubmit; 
    //Формы
    this._form = this._popupElement.querySelector('.popup__form');
    //Инпуты
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  //Метод отображения сохранения на кнопке
  renderLoading() {
      this._loadingBtn.textContent = 'Сохранение...' 
  }

  //Метод сохранения текста после обрабоки
  renderFinish(text) {
    this._loadingBtn.textContent = text;
  }

  //Метод сбора данных 
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //Метод сбора данных
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  //Метод обработки сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    //Колбэк с данными
    this._handleFormSubmit = handleFormSubmit; 
    //Формы
    this._form = this._popupElement.querySelector('.popup__form');
    //Инпуты
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  //Метод сбора данных 
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
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
import { Popup } from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setFormSubmitHandler(token) {
    this.formSubmitHandler = token;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.formSubmitHandler();
    });
  }
}
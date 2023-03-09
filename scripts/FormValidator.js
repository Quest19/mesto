export class formValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._form = Array.from(document.querySelectorAll(this._formSelector));
    this._form.forEach((item) => {
      this._setEventListeners(item);
      this._setInputListeners(item);
      this.toggleButton(item);
    })
  }

  _getErrorElement(input) {
    const inputId = input.id;
    this._errorElement = document.querySelector(`#${inputId}-error`);
  }

  _showInputError(input) {
    this._errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  _hideInputError(input) {
    this._errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._hideInputError(input, this._getErrorElement(input));
    } else {
      this._showInputError(input, this._getErrorElement(input));
    }
  }

  toggleButton(form) {
    const isFormValid = form.checkValidity();
    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  _setInputListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
      });
    });
  }

  _setEventListeners() {
    this._form.forEach((item) => {
      item.addEventListener('input', () => {
        this.toggleButton(item);
      });
    });
  }
}
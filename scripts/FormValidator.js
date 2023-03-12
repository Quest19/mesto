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
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setInputListeners();
    this.toggleButton();
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButton() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.setAttribute('disabled', true);
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.removeAttribute('disabled');
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }
  
  _setInputListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButton(input);
      });
    });
  }
}

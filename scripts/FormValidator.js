export class formValidator {
  constructor(config, form) {
    this._config = config;
    this._from = form;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  _diasbleSubmit(evt) {
    evt.preventDefault();
  }

  enableValidation() {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));

    this._formList.forEach((item) => {
      item.addEventListener('submit', this._diasbleSubmit);
      item.addEventListener('input', () => {
        this.toggleButton(item);
      });

      this._setEventListeners(item);
      this.toggleButton(item);
    })
  }

  _handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    this._errorElement = document.querySelector(`#${inputId}-error`);
    if (input.validity.valid) {
      input.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = '';
    } else {
      input.classList.add(this._inputErrorClass);
      this._errorElement.textContent = input.validationMessage;
    }
  }

  toggleButton(form) {
    this._buttonSubmit = form.querySelector(this._submitButtonSelector);
    const isFormValid = form.checkValidity();
    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((item) => {
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt);
      });
    });
  }
}



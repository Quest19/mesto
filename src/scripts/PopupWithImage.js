import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //Изображение
    this._popupImage = this._popupElement.querySelector('.popup__image');
    //Текст изображения
    this._popupImageTitle = this._popupElement.querySelector('.popup__img-title');
  }

  openPopupImg(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.openPopup();
  }
}
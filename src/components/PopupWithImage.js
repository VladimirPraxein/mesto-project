import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = document.querySelector('.popup_type_image__image');
    this._popupTitle = document.querySelector('.popup_type_image__text');
  }

  openPopup(data) {
    super.openPopup();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitle.textContent = data.name;

  }
}

import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImagePicture = this._popup.querySelector('.popup_type_image__image');
    this._popupImageText = this._popup.querySelector('.popup_type_image__text');
  }

  openPopup(data) {
    super.openPopup();
    this._popupImagePicture.src = data.src;
    this._popupImagePicture.alt = data.alt;
    this._popupImageText.textContent = data.alt;
  }
}

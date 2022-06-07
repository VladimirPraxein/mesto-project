import Popup from "./Popup.js";
import {popupImagePicture, popupImageText} from './index.js'
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  openPopup(data) {
    super.openPopup();
    popupImagePicture.src = data.src;
    popupImagePicture.alt = data.alt;
    popupImageText.textContent = data.alt;
  }
}

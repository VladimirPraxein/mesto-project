export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeByEscape = this._closeByEscape.bind(this);
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._handlePopupClose(evt);
    });
  }

  _handlePopupClose(evt) {
    if (!evt.target.closest('.popup__container')) {
      this.closePopup();
    }
    if (evt.target.closest('.popup__button-close')) {
      this.closePopup();
    }
  }
}


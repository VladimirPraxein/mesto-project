import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__form-input');
    this._button = this._form.querySelector('.popup__button-save');
    this._buttonText = this._button.textContent;
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};
    Array.from(this._inputs).forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    })
  }

  renderLoading(isLoading, buttonText = 'Cохранение...') {
    if (isLoading) {
      this._button.textContent = buttonText;
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._button.textContent = 'Сохранение...';
      this._callback(this._getInputValues());
    })
  }
}

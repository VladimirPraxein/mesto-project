export const settings = {
  formClass: '.popup__form',
  fieldsetClass: '.popup__form-info',
  inputClass: '.popup__form-input',
  buttonClass: '.popup__button-save',
  buttonInactiveClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_active'
};

export default class {
  constructor(settings, formElement) {
    this._settings = settings
    this._formElement = formElement
  }

  //Добавление слушателей полям формы
  _setEventListeners(formElement) {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputClass));
    this._buttonElement = this._formElement.querySelector(this._settings.buttonClass);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._inputList, this._buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  //Изменение кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.buttonInactiveClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._settings.buttonInactiveClass);
      buttonElement.removeAttribute('disabled', '');
    }
  }

  //Поиск полей с ошибками
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !(inputElement.validity.valid);
    });
  }

  //Создание изменения кнопки
  setButtonState() {
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  //Скрыть текст всех ошибок
  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement)
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldsetClass));
    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet, settings);
    });
  };

  //Проверка поля на валидность
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  //Показать текст ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    if (inputElement.validity.valueMissing) {
      errorElement.textContent = 'Вы пропустили это поле.';
    }
    else if (inputElement.validity.typeMismatch) {
      errorElement.textContent = 'Введите адрес сайта.';
    } else {
      errorElement.textContent = errorMessage;
    }
  };

  //Скрыть текст ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };
}



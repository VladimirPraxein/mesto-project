export const settings = {
  formClass: '.popup__form',
  fieldsetClass: '.popup__form-info',
  inputClass: '.popup__form-input',
  buttonClass: '.popup__button-save',
  buttonInactiveClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_active'
};
//Показать текст ошибки
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
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
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

//Скрыть текст всех ошибок
export function hideErrors(popup, settings) {
  const formElement = popup.querySelector(settings.formClass);
  const inputList = Array.from(formElement.querySelectorAll(settings.inputClass));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings)
  });
}

//Проверка поля на валидность
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

//Поиск полей с ошибками
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !(inputElement.validity.valid);
  });
}

//Изменение кнопки
function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.buttonInactiveClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(settings.buttonInactiveClass);
    buttonElement.removeAttribute('disabled', '');
  }
}
//Создание изменения кнопки
export function setButtonState(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputClass));
  const buttonElement = formElement.querySelector(settings.buttonClass);
  toggleButtonState(inputList, buttonElement, settings);
}

//Добавление слушателей полям формы
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputClass));
  const buttonElement = formElement.querySelector(settings.buttonClass);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, settings);
      checkInputValidity(formElement, inputElement, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formClass));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetClass));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, settings);
    });

  });

};



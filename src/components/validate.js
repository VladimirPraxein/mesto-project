//Показать текст ошибки
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__form-input_type_error');
  errorElement.classList.add('popup__form-error_active');
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
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__form-input_type_error');
  errorElement.classList.remove('popup__form-error_active');
  errorElement.textContent = '';
};

//Скрыть текст всех ошибок
export function hideErrors(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement)
  });
}

//Проверка поля на валидность
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Поиск полей с ошибками
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !(inputElement.validity.valid);
  });
}

//Изменение кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive');
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove('popup__button-save_inactive');
    buttonElement.removeAttribute('disabled', '');
  }
}
//Создание изменения кнопки
export function setButtonState(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
}

//Добавление слушателей полям формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-info'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });

  });

};



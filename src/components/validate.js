function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__form-input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__form-input_type_error');
  errorElement.classList.remove('popup__form-error_active');
  errorElement.textContent = '';
};

export function hideErrors(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement)
  });
}

export function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

export function enableValidation(formElement) {
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

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !(inputElement.validity.valid);
  });
}

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.classList.remove('popup__button-save_inactive');
  }
}
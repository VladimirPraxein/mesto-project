//Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Функция очистки попапа
export function resetPopup(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__form-input'));
  inputList.forEach((input) => {
    input.value = '';
  });
}
//Закрытие попапа на Esc
export function closePopupOnEsc(popup) {
  popup.addEventListener('keyup', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}
//Закрытие попапа на overlay
export function closePopupOnOverlay(popup) {
  popup.addEventListener('click', function (evt) {
    if (!evt.target.closest('.popup__container')) {
      closePopup(popup);
    }
  });
}
//Изменение курсора при наведении на overlay
export function hoverOverlay(popup) {
  popup.addEventListener('mouseover', function (evt) {
    if (evt.target.closest('.popup__container')) {
      popup.querySelector('.popup__container').style.cursor = 'default';
    } else {
      popup.style.cursor = 'pointer';
    }
  });
}

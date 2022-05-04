const popups = Array.from(document.querySelectorAll('.popup'))
//Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
//Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
//Закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (!evt.target.closest('.popup__container')) {
      closePopup(popup);
    }
    if (evt.target.closest('.popup__button-close')) {
      closePopup(popup);
    }
  });
});

//Закрытие попапа на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}




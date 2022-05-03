import './../styles/index.css';
import { openPopup, closePopup, closePopupOnEsc, resetPopup, closePopupOnOverlay, hoverOverlay } from './modal.js';
import { listCards, createCard, popupImage, initialCards } from './card.js';
import { enableValidation, hideErrors, setButtonState } from './validate.js';
const popupProfile = document.querySelector('.popup_type_profile');
const userName = document.querySelector('.profile__name');
const userWork = document.querySelector('.profile__work');
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');

//Вставка карточек из initialCards
initialCards.forEach(function (elem) {
  listCards.append(createCard(elem.name, elem.link));
});
//Открытие попапа профиля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(popupProfile);
  popupProfileName.value = userName.textContent;
  popupProfileWork.value = userWork.textContent;
  hideErrors(popupProfile);
  setButtonState(popupProfile);
  hoverOverlay(popupProfile);
});
//Закрытие попапа профиля
popupProfile.querySelector('.popup__button-close').addEventListener('click', function () {
  closePopup(popupProfile);
});
//Закрытие попапа профиля на Esc
closePopupOnEsc(popupProfile);
//Закрытие попапа профиля на overlay
closePopupOnOverlay(popupProfile);
//Сохранение попапа профиля
function submitProfile(evt) {
  evt.preventDefault();
  userName.textContent = popupProfileName.value;
  userWork.textContent = popupProfileWork.value;
  closePopup(popupProfile);
}
popupProfile.querySelector('.popup__form').addEventListener('submit', submitProfile);

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceTitle = document.querySelector('.popup__form-title');
const popupPlaceLink = document.querySelector('.popup__form-link');
const addButton = document.querySelector('.profile__add-button');
//Функция вставки карточки из формы
function insertCard() {
  listCards.prepend(createCard(popupPlaceTitle.value, popupPlaceLink.value));
}
//Закрытие попапа картинки
popupImage.querySelector('.popup__button-close').addEventListener('click', function () {
  closePopup(popupImage);
});
//Закрытие попапа профиля на overlay
closePopupOnOverlay(popupImage);

//Открытие попапа места
addButton.addEventListener('click', function () {
  openPopup(popupPlace);
  setButtonState(popupPlace);
  resetPopup(popupPlace);
  hideErrors(popupPlace);
  hoverOverlay(popupPlace);
});
//Закрытие попапа места
popupPlace.querySelector('.popup__button-close').addEventListener('click', function () {
  closePopup(popupPlace);
});
//Закрытие попапа места на Esc
closePopupOnEsc(popupPlace);
//Закрытие попапа места на overlay
closePopupOnOverlay(popupPlace);
//Сохранение попапа места
function submitPlace(evt) {
  evt.preventDefault();
  insertCard();
  closePopup(popupPlace);
  resetPopup(popupPlace);
}
popupPlace.querySelector('.popup__form').addEventListener('submit', submitPlace);

//Валидация
enableValidation();




import './../styles/index.css';
import { openPopup, closePopup } from './modal.js';
import { listCards, createCard, initialCards } from './card.js';
import { enableValidation, hideErrors, setButtonState, settings } from './validate.js';
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
  hideErrors(popupProfile, settings);
  setButtonState(popupProfile, settings);
});
//Сохранение попапа профиля
function submitProfile(evt) {
  evt.preventDefault();
  userName.textContent = popupProfileName.value;
  userWork.textContent = popupProfileWork.value;
  closePopup(popupProfile);
}
popupProfile.querySelector('.popup__form').addEventListener('submit', submitProfile);

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceTitle = popupPlace.querySelector('.popup__form-title');
const popupPlaceLink = popupPlace.querySelector('.popup__form-link');
const addButton = document.querySelector('.profile__add-button');
//Функция вставки карточки из формы
function insertCard() {
  listCards.prepend(createCard(popupPlaceTitle.value, popupPlaceLink.value));
}

//Открытие попапа места
addButton.addEventListener('click', function () {
  openPopup(popupPlace);
  setButtonState(popupPlace, settings);
  popupPlaceForm.reset();
  hideErrors(popupPlace, settings);
});
//Сохранение попапа места
function submitPlace(evt) {
  evt.preventDefault();
  insertCard();
  closePopup(popupPlace);
  evt.target.reset();
}
popupPlaceForm.addEventListener('submit', submitPlace);

//Валидация
enableValidation(settings);




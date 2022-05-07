import './../styles/index.css';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, hideErrors, setButtonState, settings } from './validate.js';
import { loadUserInfo, loadCards, saveUserInfo, addCard, updateAvatar, renderLoading } from './api.js';
const popupProfile = document.querySelector('.popup_type_profile');
const userName = document.querySelector('.profile__name');
const userWork = document.querySelector('.profile__work');
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const buttonPopupProfile = popupProfile.querySelector('.popup__button-save');
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
  renderLoading(true, buttonPopupProfile);
  saveUserInfo(popupProfileName.value, popupProfileWork.value);
  closePopup(popupProfile);
  renderLoading(false, buttonPopupProfile);
}
popupProfile.querySelector('.popup__form').addEventListener('submit', submitProfile);

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceTitle = popupPlace.querySelector('.popup__form-title');
const popupPlaceLink = popupPlace.querySelector('.popup__form-link');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupPlace = popupPlace.querySelector('.popup__button-save');
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
  renderLoading(true, buttonPopupPlace);
  addCard(popupPlaceTitle.value, popupPlaceLink.value);
  closePopup(popupPlace);
  evt.target.reset();
  renderLoading(false, buttonPopupPlace);
}
popupPlaceForm.addEventListener('submit', submitPlace);

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const popupAvatarInput = popupAvatar.querySelector('.popup__form-input');
const buttonPopupAvatar = popupAvatar.querySelector('.popup__button-save');
//Открытие попапа аватара
document.querySelector('.profile__avatar-edit').addEventListener('click', function() {
  openPopup(popupAvatar);
  popupAvatarForm.reset();
  hideErrors(popupAvatar, settings);
});
//Сохранение попапа аватара
function submitAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, buttonPopupAvatar);
  updateAvatar(popupAvatarInput.value);
  closePopup(popupAvatar);
  renderLoading(false, buttonPopupAvatar);
}
popupAvatarForm.addEventListener('submit', submitAvatar);

//Валидация
enableValidation(settings);

loadUserInfo()
loadCards()

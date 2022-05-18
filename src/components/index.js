import './../styles/index.css';
import { openPopup, closePopup } from './modal.js';
import { createCard  } from './card.js';
import { enableValidation, hideErrors, setButtonState, settings } from './validate.js';
import { api } from './api.js';
const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const buttonPopupProfile = popupProfile.querySelector('.popup__button-save');
const listCards = document.querySelector('.grid-cards__list');
//ID пользователя
let userId
//Обработка информации о пользователе
function processUserInfo(info) {
  profileName.textContent = info.name;
  profileWork.textContent = info.about;
  profileAvatar.src = info.avatar;
}
//Показать ошибку
export function showError(err) {
  console.log(err);
}
//Уведомить пользователя о процессе загрузки
function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...'
    button.disabled = true;
  } else {
      if(button.classList.contains('button-create')) {
        button.textContent = 'Создать';
      } else {
        button.textContent = 'Сохранить';
      }
      button.disabled = false;
  }
}
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id
    processUserInfo(userData);
    cards.forEach(card => {
      listCards.append(createCard(card, userId));
    });
  })
  .catch(err => {
    showError(err);
  });
//Открытие попапа профиля
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileWork.value = profileWork.textContent;
  hideErrors(popupProfile, settings);
  setButtonState(popupProfile, settings);
});
//Сохранение попапа профиля
function submitProfile(evt) {
  evt.preventDefault();
  renderLoading(true, buttonPopupProfile);
  api.saveUserInfo(popupProfileName.value, popupProfileWork.value)
    .then(res => {
      processUserInfo(res);
      closePopup(popupProfile)
    })
    .catch(showError)
    .finally(() => {renderLoading(false, buttonPopupProfile)})
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
  popupPlaceForm.reset();
  hideErrors(popupPlace, settings);
  setButtonState(popupPlace, settings);
});
//Сохранение попапа места
function submitPlace(evt) {
  evt.preventDefault();
  renderLoading(true, buttonPopupPlace);
  api.addCard(popupPlaceTitle.value, popupPlaceLink.value)
    .then(card => {
      listCards.prepend(createCard(card, userId));
      closePopup(popupPlace);
    })
    .catch(showError)
    .finally(() => {renderLoading(false, buttonPopupPlace)})
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
  setButtonState(popupAvatar, settings);
});
//Сохранение попапа аватара
function submitAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, buttonPopupAvatar);
  api.updateAvatar(popupAvatarInput.value)
    .then(res => {
      processUserInfo(res);
      closePopup(popupAvatar);
    })
    .catch(showError)
    .finally(() => {renderLoading(false, buttonPopupAvatar)})
}
popupAvatarForm.addEventListener('submit', submitAvatar);

//Валидация
enableValidation(settings);



import './../styles/index.css';
import { createCard  } from './card.js';
import FormValidator, { settings } from './validate.js';
import { api } from './api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const buttonPopupProfile = popupProfile.querySelector('.popup__button-save');
const listCards = document.querySelector('.grid-cards__list');
const validator = new FormValidator(settings)

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

const formList = document.querySelectorAll('.popup__form')

//Валидация
formList.forEach(form => {
  const validator = new FormValidator(settings, form)
  validator.enableValidation()
})

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
const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupPlace = popupPlace.querySelector('.popup__button-save');

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const buttonPopupAvatar = popupAvatar.querySelector('.popup__button-save');

//попап с картинкой
export const imgPopup = new PopupWithImage('.popup_type_image');
imgPopup.setEventListeners();

//попап аватара
const avatarPopup = new PopupWithForm('.popup_type_avatar',
function submitAvatar(input) {
  renderLoading(true, buttonPopupAvatar);
  api.updateAvatar(input.url)
    .then(res => {
      processUserInfo(res);
      avatarPopup.closePopup();
    })
    .catch(showError)
    .finally(() => {renderLoading(false, buttonPopupAvatar)})
});

avatarPopup.setEventListeners();

document.querySelector('.profile__avatar-container').addEventListener('click', () => {
  avatarPopup.openPopup();
  popupAvatarForm.reset();
  validator.hideErrors(popupAvatar);
  validator.setButtonState(popupAvatar);
});

//попап места
const placePopup = new PopupWithForm('.popup_type_place',
function submitPlace(input) {
  renderLoading(true, buttonPopupPlace);
  api.addCard(input.place, input.url)
    .then(card => {
      listCards.prepend(createCard(card, userId));
      placePopup.closePopup();
    })
    .catch(showError)
    .finally(() => {renderLoading(false, buttonPopupPlace)})
});

placePopup.setEventListeners();

addButton.addEventListener('click', () => {
  placePopup.openPopup();
  popupPlaceForm.reset();
  validator.hideErrors(popupPlace);
  validator.setButtonState(popupPlace);
});

//попап профиля
const profilePopup = new PopupWithForm('.popup_type_profile',
  function submitProfile(input) {
    renderLoading(true, buttonPopupProfile);
    api.saveUserInfo(input.name, input.work)
      .then(res => {
        processUserInfo(res);
        profilePopup.closePopup();
      })
      .catch(showError)
      .finally(() => {renderLoading(false, buttonPopupProfile)})
  });

profilePopup.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  profilePopup.openPopup();
  popupProfileName.value = profileName.textContent;
  popupProfileWork.value = profileWork.textContent;
  validator.hideErrors(popupProfile);
  validator.setButtonState(popupProfile);
});




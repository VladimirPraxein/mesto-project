import './../styles/index.css';
import { Card  } from './Card.js';
import FormValidator, { settings } from './FormValidator.js';
import { api } from './Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
import { Section } from './Section';

const popupProfile = document.querySelector('.popup_type_profile');
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileImage = document.querySelector('.profile__avatar')
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const buttonPopupProfile = popupProfile.querySelector('.popup__button-save');
const validator = new FormValidator(settings)

//Показать ошибку
export function showError(err) {
  console.log(err);
}

//Валидация
const avatarEditForm = document.querySelector('.form-avatar')
const cardAddForm = document.querySelector('.card-add-form')
const profileForm = document.querySelector('.profile-form')
const avatarValidator = new FormValidator(settings, avatarEditForm)
const cardAddValidator = new FormValidator(settings, cardAddForm)
const profileValidator = new FormValidator(settings, profileForm)
avatarValidator.enableValidation()
cardAddValidator.enableValidation()
profileValidator.enableValidation()

//попап с картинкой
export const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const user = new UserInfo({
  profileName: '.profile__name',
  profileWork: '.profile__work',
  profileAvatar: '.profile__avatar',
});
const sectionCard = new Section({ renderer: (itemCard) => createCard(itemCard) }, '.grid-cards__list');

function createCard(itemCard) {
  const card = new Card(itemCard,
    {selector:'.grid-cards__template', handleCardClick:(imageCard) => {
    imageCard.addEventListener('click', () => {
      popupImage.openPopup(imageCard)
    })
  }}, api, user.userId)
  const cardElement = card.generate();
  sectionCard.addItem(cardElement);
}
//Загрузка карточек и профиля
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    sectionCard.renderItems(cards);
  })
  .catch(showError);

//Открытие попапа профиля
const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupPlace = popupPlace.querySelector('.popup__button-save');

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const buttonPopupAvatar = popupAvatar.querySelector('.popup__button-save');

//попап аватара
const avatarPopup = new PopupWithForm('.popup_type_avatar',
function submitAvatar(input) {
  avatarPopup.renderLoading(true);
  api.updateAvatar(input.url)
    .then(res => {
      profileImage.src = res.avatar;
      avatarPopup.closePopup();
    })
    .catch(showError)
    .finally(() => {avatarPopup.renderLoading(false)})
});

avatarPopup.setEventListeners();

document.querySelector('.profile__avatar-container').addEventListener('click', () => {
  avatarPopup.openPopup();
  avatarValidator.hideErrors();
  avatarValidator.setButtonState();
});

//попап места
const placePopup = new PopupWithForm('.popup_type_place',
(input) => {
  placePopup.renderLoading(true);
  api.addCard(input.place, input.url)
    .then((card) => {
      createCard(card);
      placePopup.closePopup();
    })
    .catch(showError)
    .finally(() => {placePopup.renderLoading(false)})
});

placePopup.setEventListeners();

addButton.addEventListener('click', () => {
  placePopup.openPopup();
  cardAddValidator.hideErrors();
  cardAddValidator.setButtonState();
});

//попап профиля
const profilePopup = new PopupWithForm('.popup_type_profile',
  function submitProfile(input) {
    profilePopup.renderLoading(true);
    api.saveUserInfo(input.name, input.work)
      .then(res => {
        user.setUserInfo(res);
        profilePopup.closePopup();
      })
      .catch(showError)
      .finally(() => {profilePopup.renderLoading(false)})
  });

profilePopup.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  profilePopup.openPopup();
  popupProfileName.value = profileName.textContent;
  popupProfileWork.value = profileWork.textContent;
  profileValidator.hideErrors(popupProfile);
  profileValidator.setButtonState(popupProfile);
});




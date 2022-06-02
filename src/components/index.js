import './../styles/index.css';
import { Card  } from './card.js';
import FormValidator, { settings } from './FormValidator.js';
import { api } from './api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { UserInfo } from './UserInfo';
import { Section } from './Section';

const popupProfile = document.querySelector('.popup_type_profile');
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const buttonPopupProfile = popupProfile.querySelector('.popup__button-save');
const listCards = document.querySelector('.grid-cards__list');
const validator = new FormValidator(settings)

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

export const popupImagePicture = document.querySelector('.popup_type_image__image');
export const popupImageText = document.querySelector('.popup_type_image__text');
//попап с картинкой
export const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Загрузка информации о пользователе
const userInfo = new UserInfo(profile);
userInfo.getUserInfo();

//Загрузка карточек
api.getCards()
  .then((cards) => {
    const section = new Section({
      items:cards,
      renderer:(itemCard) => {
        const card = new Card(itemCard,
          {selector:'.grid-cards__template', handleCardClick:(imageCard) => {
          imageCard.addEventListener('click', () => {
            popupImage.openPopup(imageCard)
          })
        }})
        const cardElement = card.generate();
        section.addItem(cardElement);
      }
    }, '.grid-cards__list')
    section.renderItems();
  });

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
    .then(cards => {
      const section = new Section({
        items:cards,
        renderer:(itemCard) => {
          const card = new Card(itemCard,
            {selector:'.grid-cards__template', handleCardClick:(imageCard) => {
            imageCard.addEventListener('click', () => {
              popupImage.openPopup(imageCard)
            })
          }})
          const cardElement = card.generate();
          section.addItem(cardElement);
        }
      }, '.grid-cards__list')
      section.renderItems();
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
        userInfo.setUserInfo(res);
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




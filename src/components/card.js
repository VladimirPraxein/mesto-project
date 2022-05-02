const templateCard = document.querySelector('.grid-cards__template').content;
import {openPopup} from './modal.js';
export const listCards = document.querySelector('.grid-cards__list');
export const popupImage = document.querySelector('.popup_type_image');
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
//Функция создания карточки
export function createCard(text,link){
  const contentCard = templateCard.querySelector('.grid-cards__item').cloneNode(true);
  const imageCard = contentCard.querySelector('.grid-cards__image');
  contentCard.querySelector('.grid-cards__title').textContent = text;
  imageCard.src = link;
  imageCard.alt = text;
  //Открытие попапа карточки
  imageCard.addEventListener('click',function(){
    popupImage.querySelector('.popup_type_image__image').src = link;
    popupImage.querySelector('.popup_type_image__image').alt = text;
    popupImage.querySelector('.popup_type_image__text').textContent = text;
    openPopup(popupImage);
  });
  //Лайк карточки
  contentCard.querySelector('.grid-cards__like-button').addEventListener('click',function(evt){
    evt.target.classList.toggle('grid-cards__like-button_active');
  });
  //Удаление карточки
  contentCard.querySelector('.grid-cards__delete-button').addEventListener('click',function(evt){
    evt.target.closest('.grid-cards__item').remove();
  });
  return contentCard;
}





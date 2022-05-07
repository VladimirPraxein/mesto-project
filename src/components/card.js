const templateCard = document.querySelector('.grid-cards__template').content;
import { openPopup } from './modal.js';
import { deleteCard, addLike, deleteLike } from './api.js';
export const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup_type_image__image');
const popupImageText = popupImage.querySelector('.popup_type_image__text');
//Количество лайков
export function countLikes(numberLikes, likes) {
  numberLikes.textContent = likes.length;
}
//Функция создания карточки
export function createCard(dataCard, userId) {
  const contentCard = templateCard.querySelector('.grid-cards__item').cloneNode(true);
  const imageCard = contentCard.querySelector('.grid-cards__image');
  const buttonDelete = contentCard.querySelector('.grid-cards__delete-button');
  const buttonLike = contentCard.querySelector('.grid-cards__like-button');
  const numberLikes = contentCard.querySelector('.grid-cards__like-number');
  contentCard.querySelector('.grid-cards__title').textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;
  //Открытие попапа картинки
  imageCard.addEventListener('click', function () {
    popupImagePicture.src = dataCard.link;
    popupImagePicture.alt = dataCard.name;
    popupImageText.textContent = dataCard.name;
    openPopup(popupImage);
  });
  countLikes(numberLikes, dataCard.likes);
  if(dataCard.likes.find(user => { return user._id === userId })) {
    buttonLike.classList.add('grid-cards__like-button_active');
  }
  if(dataCard.owner._id === userId) {
    buttonDelete.classList.add('grid-cards__delete-button_active');
  }
  //Лайк карточки
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('grid-cards__like-button_active');
    if(evt.target.classList.contains('grid-cards__like-button_active')) {
      addLike(dataCard._id, dataCard.likes, numberLikes);
    } else {
      deleteLike(dataCard._id, numberLikes)
    }
  });
  //Удаление карточки
  buttonDelete.addEventListener('click', function (evt) {
    evt.target.closest('.grid-cards__item').remove();
    deleteCard(dataCard._id);

  });
  return contentCard;
}





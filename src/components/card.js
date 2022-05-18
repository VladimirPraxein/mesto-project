const templateCard = document.querySelector('.grid-cards__template').content;
import { openPopup } from './modal.js';
import { api } from './api.js';
import { showError } from './index.js';
export const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup_type_image__image');
const popupImageText = popupImage.querySelector('.popup_type_image__text');
//Количество лайков
function countLikes(numberLikes, likes) {
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
    if(!evt.target.classList.contains('grid-cards__like-button_active')) {
      api.addLike(dataCard._id, dataCard.likes, numberLikes)
        .then(res => {
          evt.target.classList.add('grid-cards__like-button_active');
          countLikes(numberLikes, res.likes)
        })
        .catch(showError)
    } else {
      api.deleteLike(dataCard._id, numberLikes)
        .then(res => {
          evt.target.classList.remove('grid-cards__like-button_active');
          countLikes(numberLikes, res.likes)
        })
        .catch(showError)
    }
  });
  //Удаление карточки
  buttonDelete.addEventListener('click', function (evt) {
    api.deleteCard(dataCard._id)
      .then(() => {evt.target.closest('.grid-cards__item').remove()})
      .catch(showError)
  });
  return contentCard;
}





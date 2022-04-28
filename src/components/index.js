import './../styles/index.css';
import {listCards, createCard, popupImage} from './card.js';

//Вставка карточек из initialCards
initialCards.forEach(function(elem){
  listCards.append(createCard(elem.name,elem.link));
});
//Открытие попапа профиля
document.querySelector('.profile__edit-button').addEventListener('click',function(){
  openPopup(popupProfile);
  popupProfileName.value = userName.textContent;
  popupProfileWork.value = userWork.textContent;
});
//Закрытие попапа профиля
popupProfile.querySelector('.popup__button-close').addEventListener('click',function(){
  closePopup(popupProfile);
});
//Закрытие попапа картинки
popupImage.querySelector('.popup__button-close').addEventListener('click',function(){
  closePopup(popupImage);
});

//Открытие попапа места
addButton.addEventListener('click',function(){
  openPopup(popupPlace);
});
//Закрытие попапа места
popupPlace.querySelector('.popup__button-close').addEventListener('click',function(){
  closePopup(popupPlace);
});



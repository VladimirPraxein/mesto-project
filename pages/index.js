const initialCards = [
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
const popupProfile = document.querySelector('.popup_type_profile')
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
const userName = document.querySelector('.profile__name');
const userWork = document.querySelector('.profile__work');
//Функция открытия попапа
function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}
//Функция закрытия попапа
function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}
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
//Сохранение попапа профиля
function submitProfile (evt) {
  evt.preventDefault();
  userName.textContent = popupProfileName.value;
  userWork.textContent = popupProfileWork.value;
  closePopup(popupProfile);
}
popupProfile.querySelector('.popup__form').addEventListener('submit', submitProfile);

const templateCard = document.querySelector('.grid-cards__template').content;
const listCards = document.querySelector('.grid-cards__list');
const popupImage = document.querySelector('.popup_type_image');
//Функция создания карточки
function createCard(text,link){
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
//Вставка карточек из initialCards
initialCards.forEach(function(elem){
  listCards.append(createCard(elem.name,elem.link));
});
//Закрытие попапа картинки
popupImage.querySelector('.popup__button-close').addEventListener('click',function(){
  closePopup(popupImage);
});

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceTitle = document.querySelector('.popup__form-title');
const popupPlaceLink = document.querySelector('.popup__form-link');
const addButton = document.querySelector('.profile__add-button');
//Функция вставки карточки из формы
function insertCard(){
  listCards.prepend(createCard(popupPlaceTitle.value,popupPlaceLink.value));
}
//Открытие попапа места
addButton.addEventListener('click',function(){
  openPopup(popupPlace);
});
//Закрытие попапа места
popupPlace.querySelector('.popup__button-close').addEventListener('click',function(){
  closePopup(popupPlace);
});
//Функция очистки попапа места
function resetPopupPlace(){
  popupPlaceTitle.value = '';
  popupPlaceLink.value = '';
}
//Сохранение попапа места
function submitPlace (evt) {
  evt.preventDefault();
  insertCard();
  closePopup(popupPlace);
  resetPopupPlace();
}
popupPlace.querySelector('.popup__form').addEventListener('submit',submitPlace);


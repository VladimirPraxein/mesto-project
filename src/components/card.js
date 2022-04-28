const templateCard = document.querySelector('.grid-cards__template').content;
const popupProfile = document.querySelector('.popup_type_profile')
const popupProfileName = document.querySelector('.popup__form-name');
const popupProfileWork = document.querySelector('.popup__form-work');
export const listCards = document.querySelector('.grid-cards__list');
export const popupImage = document.querySelector('.popup_type_image');
//Сохранение попапа профиля
function submitProfile (evt) {
  evt.preventDefault();
  userName.textContent = popupProfileName.value;
  userWork.textContent = popupProfileWork.value;
  closePopup(popupProfile);
}
popupProfile.querySelector('.popup__form').addEventListener('submit', submitProfile);

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



const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceTitle = document.querySelector('.popup__form-title');
const popupPlaceLink = document.querySelector('.popup__form-link');
const addButton = document.querySelector('.profile__add-button');
//Функция вставки карточки из формы
function insertCard(){
  listCards.prepend(createCard(popupPlaceTitle.value,popupPlaceLink.value));
}
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

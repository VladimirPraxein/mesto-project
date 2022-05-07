import { createCard, countLikes } from "./card.js";
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '28d7f0d3-a669-484f-a111-3c43e10b44aa',
    'Content-Type': 'application/json'
  }
}
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const listCards = document.querySelector('.grid-cards__list');
//Обработка ответа
function processRequest(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
//Показать ошибку
function showError(err) {
  console.log(err);
}
//Обработка информации о пользователе
function processUserInfo(info) {
  profileName.textContent = info.name;
  profileWork.textContent = info.about;
  profileAvatar.src = info.avatar;
}
//ID пользователя
let userId
//Загрузка ифнормации о пользователе
export function loadUserInfo() {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers
  })
    .then(processRequest)
    .then(res => {
      processUserInfo(res);
      userId = res._id;
    })
    .catch(showError)
}

//Загрузка карточек с сервера
export function loadCards() {
  return fetch(`${config.baseUrl}/cards`,{
    headers: config.headers
  })
    .then(processRequest)
    .then(cards => {
      cards.forEach(card => {
        listCards.append(createCard(card, userId));
      });
    })
    .catch(showError)
}
//Сохранение данных профиля
export function saveUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(processRequest)
    .then(res => {
      processUserInfo(res);
    })
    .catch(showError)
}
//Добавление карточки
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(processRequest)
    .then(card => {
        listCards.prepend(createCard(card, userId));
    })
    .catch(showError)
}
//Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
    .then(processRequest)
    .catch(showError)
}
//Поставить лайк
export function addLike(cardId, likes, numberLikes) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: likes
  })
  })
    .then(processRequest)
    .then(res => {
      countLikes(numberLikes, res.likes)
    })
    .catch(showError)
}
//Убрать лайк
export function deleteLike(cardId, numberLikes) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
    .then(processRequest)
    .then(res => {
      countLikes(numberLikes, res.likes)
    })
    .catch(showError)
}
//Обновление аватара
export function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: link
      })
  })
      .then(processRequest)
      .then(res => {
        processUserInfo(res);
      })
      .catch(showError)
}
//Уведомить пользователя о процессе загрузки
export function renderLoading(isLoading, button) {
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

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '28d7f0d3-a669-484f-a111-3c43e10b44aa',
    'Content-Type': 'application/json'
  }
}
//Обработка ответа
function processRequest(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
//Загрузка ифнормации о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers
  })
    .then(processRequest)
}

//Загрузка карточек с сервера
export function getCards() {
  return fetch(`${config.baseUrl}/cards`,{
    headers: config.headers
  })
    .then(processRequest)
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
}
//Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
    .then(processRequest)
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
}
//Убрать лайк
export function deleteLike(cardId, numberLikes) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
    .then(processRequest)
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
}


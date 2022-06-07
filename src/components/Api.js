class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  //Обработка ответа
  processRequest(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Загрузка ифнормации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`,{
      headers: this.headers
    })
      .then(this.processRequest)
  }

  //Загрузка карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`,{
      headers: this.headers
    })
      .then(this.processRequest)
  }
  //Сохранение данных профиля
  saveUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this.processRequest)
  }
  //Добавление карточки
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`,{
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.processRequest)
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.processRequest)
  }
  //Поставить лайк
  addLike(cardId, likes, numberLikes) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        likes: likes
    })
    })
      .then(this.processRequest)
  }
  //Убрать лайк
  deleteLike(cardId, numberLikes) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this.processRequest)
  }
  //Обновление аватара
  updateAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(this.processRequest)
  }
}

 export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
    headers: {
      authorization: '28d7f0d3-a669-484f-a111-3c43e10b44aa',
      'Content-Type': 'application/json'
    }
  });



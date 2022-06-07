import { api } from './Api.js';
import {userId} from './index.js';
export class Card {
  constructor({ link, name, likes, owner, _id }, {selector, handleCardClick}) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner._id;
    this._cardId = _id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }
  _getElement() {
    const contentCard = document.querySelector(this._selector).content.querySelector('.grid-cards__item').cloneNode(true);
    return contentCard;
  }
  _deleteCard() {
    this.buttonDelete.addEventListener('click', (evt) => {
      api.deleteCard(this._cardId)
        .then(() => {evt.target.closest('.grid-cards__item').remove()})
        .catch(api.showError)
    });
  }
  _countLikes(numberLikes, likes) {
    numberLikes.textContent = likes.length;
  }
  _likeCard() {
    this.buttonLike.addEventListener('click', (evt) => {
      if(!evt.target.classList.contains('grid-cards__like-button_active')) {
        api.addLike(this._cardId, this._likes, this.numberLikes)
          .then(res => {
            evt.target.classList.add('grid-cards__like-button_active');
            this._countLikes(this.numberLikes, res.likes)
          })
          .catch(api.showError)
      } else {
        api.deleteLike(this._cardId, this.numberLikes)
          .then(res => {
            evt.target.classList.remove('grid-cards__like-button_active');
            this._countLikes(this.numberLikes, res.likes)
          })
          .catch(api.showError)
      }
    });
  }
  _setEventListeners() {
    this._likeCard();
    this._deleteCard();
  }
  generate() {
    this.contentCard = this._getElement();
    this.imageCard = this.contentCard.querySelector('.grid-cards__image');
    this.titleCard = this.contentCard.querySelector('.grid-cards__title');
    this.buttonDelete = this.contentCard.querySelector('.grid-cards__delete-button');
    this.buttonLike = this.contentCard.querySelector('.grid-cards__like-button');
    this.numberLikes = this.contentCard.querySelector('.grid-cards__like-number');
    this.titleCard.textContent = this._name;
    this.imageCard.src = this._link;
    this.imageCard.alt = this._name;
    this._countLikes(this.numberLikes, this._likes);
    if(this._likes.find(user => { return user._id === userId })) {
      this.buttonLike.classList.add('grid-cards__like-button_active');
    }
    if(this._owner === userId) {
      this.buttonDelete.classList.add('grid-cards__delete-button_active');
    }
    this._setEventListeners();
    this._handleCardClick(this.imageCard);
    return this.contentCard;
  }
}



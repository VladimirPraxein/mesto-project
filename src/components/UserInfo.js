import {api} from './api.js';
export let userId;
export class UserInfo {
  constructor(data) {
    this._name = data.querySelector('.profile__name');
    this._about = data.querySelector('.profile__work');
    this._avatar = data.querySelector('.profile__avatar');
  }

  getUserInfo() {
    api.getUserInfo()
      .then(res => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        this._avatar.src = res.avatar;
        userId = res._id;
      });
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
  }
}

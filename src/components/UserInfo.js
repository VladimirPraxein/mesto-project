export class UserInfo {
  constructor(data) {
    this._name = data.querySelector('.profile__name');
    this._about = data.querySelector('.profile__work');
    this._avatar = data.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
  }
}

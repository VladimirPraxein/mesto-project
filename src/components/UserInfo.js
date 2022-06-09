export default class UserInfo {
  constructor({ profileName, profileWork, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileWork = document.querySelector(profileWork);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileWork.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileWork.textContent = about;
    this._profileAvatar.src = avatar;
    this.userId = _id;
  }
}

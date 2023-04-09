export class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    //Имя ползователя
    this._userName = document.querySelector(userNameSelector);
    //Информация о пользователе
    this._userInfo = document.querySelector(userInfoSelector); 
    //Изображение
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  //Метод, который возвращает объект с данными о пользователе
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src
    };
  }

  //Метод, который принимает новые данные о пользователе
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }

  addAvatarImage(data) {
    this._userAvatar.src = data.avatar;
  }
}
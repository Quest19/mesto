export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    //Имя ползователя
    this._userName = document.querySelector(userNameSelector);
    //Информация о пользователе
    this._userInfo = document.querySelector(userInfoSelector); 
  }

  //Метод, который возвращает объект с данными о пользователе
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  //Метод, который принимает новые данные о пользователе
  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
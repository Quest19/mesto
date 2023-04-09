export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getAllTasks() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    })
    .then(this._getJSON)
    .then((results) => {
      console.log(results)
    });
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Информация о пользователе с сервера 
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  //Карточки с сервера 
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  setProfileInfo(item) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then(this._getJSON)
  }

  addNewCard(item) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item),
    })
    .then(this._getJSON)
  }

  setProfileAvatar(item) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
    .then(this._getJSON)
  }

  setLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJSON)
  }
}
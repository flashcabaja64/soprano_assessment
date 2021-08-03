import config from '../config'

const UserService = {
  registerUser(data) {
    return fetch(`${config.API_ENDPOINT}/user/register`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : res.json())
  },
  userLogin(data) {
    return fetch(`${config.API_ENDPOINT}/user/login`, {
      method: "POST",
      headers: { 'content-type': "application/json" },
      body: JSON.stringify(data)
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : res.json())
  },
  getUserProfile(id) {
    return fetch(`${config.API_ENDPOINT}/user/${id}`, {
      method: "GET",
      headers: { 'content-type': "application/json" }
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : res.json())
  },
  saveUserId(id) {
    window.localStorage.setItem('id', id)
  },
  getUserId(id) {
    return window.localStorage.getItem(id)
  },
  clearUserId() {
    window.localStorage.removeItem('id')
  },
  hasUserId() {
    return !!UserService.getUserId('id')
  }
};

export default UserService;
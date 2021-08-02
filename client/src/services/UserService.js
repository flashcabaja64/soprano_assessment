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
  editPost() {

  },
  deletePost(id) {
    return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
      method: "DELETE",
      headers: { 'content-type': "application/json" }
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : undefined)
  },
  saveUserId(id) {
    window.localStorage.setItem('id', id)
  }
};

export default UserService;
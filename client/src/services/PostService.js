import config from '../config'

const PostService = {
  getPosts() {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : res.json())
  },
  addNewPost(formData) {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: "POST",
      headers: { 'content-type': "application/json" },
      body: JSON.stringify(formData)
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : res.json())
  },
  editPost() {

  },
  deletePost(id) {
    return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
      method: "DELETE",
      headers: { 'content-type': "application/json" }
    }).then(res => !res.status === 200 ? res.json().then(e => Promise.reject(e)) : undefined)
  }
};

export default PostService;
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'semantic-ui-react';

import UserService from '../../services/UserService';
import PostService from '../../services/PostService';
import PostList from './PostList';
import PostModal from './PostModal';
import EditPostModal from './EditPostModal';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  
  useEffect(() => {
    PostService.getPosts(UserService.getUserId('id'))
      .then(post => setPosts(...posts, post.posts))
      .catch(err => console.log(err))
  }, [])

  const deletePost = (id) => {
    PostService.deletePost(id)
      .then(() => {
        let newPosts = posts.filter(post => post._id !== id)
        setPosts(newPosts);
      })
      .catch(error => console.log(error))
  }

  const getEditPost = (id) => {
    
    let singlePost = posts.find(post => post._id === id);
    setEditPost(singlePost);
    setEditModal(true);
    console.log(singlePost)
  }
  
  return (
    <Container fluid className="home" textAlign="center">    
      {
        !posts.length ? 
        <>
          <Button
            primary
            onClick={() => setModal(true)}
            content="Add Post"
          /> 
          {/* <PostModal 
            modal={modal}
            closeModal={() => setModal(false)}
          /> */}
        </>
        :
        <>
          <Button
            primary
            onClick={() => setModal(true)}
            content="Add Post"
          /> 
          <PostModal 
            modal={modal}
            closeModal={() => setModal(false)}
          />
          <EditPostModal
            modal={editModal}
            editPost={editPost}
            closeModal={() => setEditModal(false)}
          />
          <PostList 
            posts={posts} 
            deletePost={deletePost} 
            getEditPost={getEditPost}
            modal={() => setEditModal(true)}
          />
        </>  
      }
    </Container>
  )
}

export default Post;
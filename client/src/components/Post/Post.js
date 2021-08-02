import React, { useEffect, useState } from 'react';
import { Container, Button } from 'semantic-ui-react';

import PostService from '../../services/PostService';
import PostList from './PostList';
import PostModal from './PostModal';
import EditPost from './EditPost';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    PostService.getPosts(PostService.getUserId('id'))
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

  const editPost = (id) => {

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
          <PostModal 
            modal={modal}
            closeModal={() => setModal(false)}
          />
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
          <EditPost 
            modal={modal}
            closeModal={() => setModal(false)}
          />
          <PostList posts={posts} deletePost={deletePost} />
        </>  
      }
    </Container>
  )
}

export default Post;
import React, { useState, useEffect } from 'react';
import mime from 'mime-types';
import { Button, Form, Image, Modal, Segment } from 'semantic-ui-react';

import PostService from '../../services/PostService';
import ValidationError from '../../utils/ValidationError';

const EditPostModal = ({ closeModal, modal, editPost }) => {
  const [post, setPost] = useState([])
  const [values, setValues] = useState({ title: '', description: ''})
  const [img, setImg] = useState(null);
  const [authorized] = useState(['image/jpeg', 'image/png', 'image/jpg']);

useEffect(() => {
  setPost(editPost)
  setImg(post.image);
  setValues({
    title: post.title,
    description: post.description,
    image: post.image
  })
  console.log(post)
  
}, [modal])

const handleChange = (e) => {
  const { id, value } = e.target;
  setValues({ ...values, [id]: value})
} 


const addFile = e => {
  const image = e.target.files[0];
  const reader = new FileReader();

  if(image) {
    reader.onload = e => {
      setImg(e.target.result);
      setValues({...values, image})
    }
    reader.readAsDataURL(e.target.files[0]);
  } 
}

const isAuthorized = fileName => authorized.includes(mime.lookup(fileName));

const sendPost = () => { 
  if(values.image !== null && isAuthorized(values.image.name)) {
    
    let formData = {
      title: values.title,
      description: values.description,
      image: img,
      fileName: values.image.name
    }

    closeModal();
    
    PostService.editPost(post._id, formData)
      .then(() => {
        setImg(null);
        window.location.reload();
      })
      .catch(error => console.error(error))
  }
}

  return (
    <Modal
      onClose={closeModal}
      open={modal}
    >
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Content>
        <Image 
          size="medium" 
          src={img == undefined ? '' : img} 
          centered 
          style={{ display: img !== null ? 'flex' : 'none' }}
        />
        <Segment>
          <Form size="large">
            <Form.Input
              fluid
              id="title"
              icon="newspaper"
              iconPosition="left"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
            />
            {/* {errors.title && <ValidationError message={errors.title}/>} */}
            <Form.Input
              fluid
              icon="pencil"
              iconPosition="left"
              placeholder="Description"
              id="description"
              value={values.description}
              onChange={handleChange}
            />
            {/* {errors.description && <ValidationError message={errors.description}/>} */}
            <Form.Input
              fluid
              hidden
              label="File types: jpg, jpeg, png"
              name="file"
              type="file"
              id="image" 
              onChange={addFile}
            />
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Edit Post"
          labelPosition='right'
          icon='checkmark'
          positive
          onClick={sendPost}
        />
        <Button color='red' onClick={closeModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditPostModal;
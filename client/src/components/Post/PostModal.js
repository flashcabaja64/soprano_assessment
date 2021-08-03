import React, { useState } from 'react';
import mime from 'mime-types';
import { Button, Form, Image, Modal, Segment } from 'semantic-ui-react';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';

const PostModal = ({ modal, closeModal }) => {
  const [img, setImg] = useState(null);
  const [authorized] = useState(['image/jpeg', 'image/png', 'image/jpg']);
  const [values, setValues] = useState({ title: '', description: '', image: '' })


  const handleChange = e => {
    const { id, value } = e.target;
    setValues({...values, [id]: value })
  }
  
  const sendPost = () => { 
    if(values.image !== null && isAuthorized(values.image.name)) {

      let formData = {
        title: values.title,
        description: values.description,
        image: img,
        fileName: values.image.name,
        id: UserService.getUserId('id')
      }

      closeModal();
      
      PostService.addNewPost(formData)
        .then(() => {
          setImg(null);
          window.location.reload();
        })
        .catch(error => console.error(error))
    }
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

  return (
    <Modal
      onClose={closeModal}
      open={modal}
    >
      <Modal.Header>Add a Post</Modal.Header>
      <Modal.Content>
        <Image 
          size="medium" 
          src={img} 
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
            <Form.Input
              fluid
              icon="pencil"
              iconPosition="left"
              placeholder="Description"
              id="description"
              value={values.description}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              hidden
              label="File types: jpg, jpeg, png"
              name="file"
              type="file"
              id="image"
              //value={values.image}
              onChange={addFile}
            />
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Add Post"
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

export default PostModal;
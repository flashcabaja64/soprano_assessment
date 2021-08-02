import React, { useState } from 'react';
import { Button, Form, Image, Modal, Segment } from 'semantic-ui-react';

const EditPost = ({ closeModal, modal }) => {
  const [img, setImg] = useState(null);
  const [authorized] = useState(['image/jpeg', 'image/png', 'image/jpg']);
  const [values, setValues] = useState({ title: '', description: '', image: '' })


  const handleChange = e => {
    const { id, value } = e.target;
    setValues({...values, [id]: value })
  }

  return (
    <Modal
      onClose={closeModal}
      open={modal}
    >
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Content>
        <Image 
          size="large" 
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
              //onChange={addFile}
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
          //onClick={editPost}
        />
        <Button color='red' onClick={closeModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditPost;
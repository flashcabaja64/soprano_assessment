import React, { useEffect, useState } from 'react';
import empty from '../../assets/empty.jpg'
import { Dimmer, Loader, Card, Image, Button, Grid } from 'semantic-ui-react';

const PostList = ({ posts, deletePost }) => {
  return (
    <div style={{ marginTop:"2rem" }}>
      {
        !posts.length ? 
        <Dimmer active>
          <Loader />
        </Dimmer> 
        : (
          <Card.Group itemsPerRow={4}>
            {posts.map((post, idx) => (
              <Card raised key={idx}>
                {post.image ?
                  <Image src={post.image} wrapped ui={false}/>
                  : 
                  <Image src={empty} wrapped ui={false}/>
                }
                <Card.Content textAlign="center">
                  <Card.Header>{post.title}</Card.Header>
                  <Card.Description>{post.description}</Card.Description>
                </Card.Content>

                  <Card.Content extra textAlign="center">
                    <Button color="green" size="small">
                      Edit
                    </Button>
                    <Button color="red" size="small" onClick={() => deletePost(post._id)}>
                      Delete
                    </Button>
                  </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )
      }
    </div>
  )
}

export default PostList;
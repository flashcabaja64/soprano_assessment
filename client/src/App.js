import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './app.css'

import Home from './components/Home'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login';
import Post from './components/Post/Post'

function App() {
  return (
    <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Post} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
    </div>
  );
}

export default App;

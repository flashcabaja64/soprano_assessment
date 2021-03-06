import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './components/context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


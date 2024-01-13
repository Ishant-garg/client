import React from 'react';
import ReactDOM from 'react-dom/client';
import {  HashRouter } from 'react-router-dom';  
// import { appRouter } from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter><App/></HashRouter>
  </Provider>,
);

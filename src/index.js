import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import { indexReducers } from './redux/indexReducers';

const mainReduces = combineReducers({
  indexReducers: indexReducers
})

const initailState = {
  indexReducers: {
    cartProducts: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : []
  }
}

const store = createStore( mainReduces,initailState)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <App />

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* eslint-disable */
import React from "react";

// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import { Provider } from 'react-redux';
import { configureStore } from './_mock/configureStore';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import axios from "axios";


////base URL
//axios.defaults.baseURL = 'https://drab-cyan-fossa-kilt.cyclic.app';
axios.defaults.baseURL = 'http://localhost:420';

// ----------------------------------------------------------------------
const store  = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
  
root.render(
  <Provider store={store}>
     <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
  </Provider>
 
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

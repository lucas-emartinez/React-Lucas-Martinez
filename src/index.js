import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getFireStoreApp } from './firebase/config';

getFireStoreApp()
ReactDOM.render(<App />,  document.getElementById('root'));

reportWebVitals();

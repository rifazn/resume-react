import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import defaultdata from './resume-data.json'

const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : defaultdata

console.log(data);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
);


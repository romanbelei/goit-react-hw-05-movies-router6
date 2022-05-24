import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App.jsx';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="goit-react-hw-05-movies">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

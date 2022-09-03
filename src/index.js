import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FoodsProvider from './context/FoodsProvider';
import DrinksProvider from './context/DrinksProvider';

ReactDOM.render(
  <BrowserRouter basename={ process.env.PUBLIC_URL }>
    <FoodsProvider>
      <DrinksProvider>
        <App />
      </DrinksProvider>
    </FoodsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

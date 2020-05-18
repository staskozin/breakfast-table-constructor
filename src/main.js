import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers';

import Info from './component/Info/Info';
import Form from './component/Form/Form';

import { loadState, saveState } from './store/localStorage';

export const store = createStore(rootReducer, loadState());
store.subscribe(() => saveState(store.getState()));

import './main.scss';

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-5">
          <h1>Конструктор столиков</h1>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-7">
          <Info />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <p>Изображение столика</p>
        </div>
        <Form />
      </div>
    </div>
  </Provider>,
  document.getElementById('app')
);

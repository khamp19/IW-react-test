import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import rootReducer from './Reducers';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
, document.getElementById("root"))

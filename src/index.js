import React from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// import reducer from "./store/reducer";  Ref only

import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

// const reduxDevToolExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Define custom middleware
const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] prev state", store.getState());
      console.log("[Middleware] Dispatching", action);
      const result = next(action); // Dispatches the action type and here you can store the new store state and do something with it.
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);

// const store = createStore(reducer, reduxDevToolExtension); // ref before split reducers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

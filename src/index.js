import React from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers } from "redux";
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

const reduxDevToolExtension =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, reduxDevToolExtension);
// const store = createStore(reducer, reduxDevToolExtension); // ref before split reducers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

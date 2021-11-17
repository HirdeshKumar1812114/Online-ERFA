import React from "react";
import 'core-js'
import 'react-app-polyfill/stable'
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import App from "./App";



ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister()
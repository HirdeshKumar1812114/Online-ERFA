import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

import AdminLogin from "views/Login/adminLogin";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={AdminLogin} />
      {/* <Route path="/" component={Components} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

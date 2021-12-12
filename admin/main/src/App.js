import * as serviceWorker from "./serviceWorker";
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Router } from "react-router-dom";
import "./scss/style.scss";
import ProtectedRoute from "./Auth/protectedRoute";
import Register from "views/Pages/register/Register";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Page404 = React.lazy(() => import("./views/Pages/page404/Page404"));
import "assets/scss/material-kit-react.scss?v=1.10.0";

import AdminLogin from "views/Login/adminLogin";

var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <HashRouter history={hist}>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login"
              render={(props) => <AdminLogin {...props} />}
            />
            <ProtectedRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

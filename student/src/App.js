import * as serviceWorker from "./serviceWorker";
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Router,useParams } from "react-router-dom";
import "./scss/style.scss";
import ProtectedRoute from "./Auth/protectedRoute";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
// import "assets/scss/material-kit-react.scss?v=1.10.0";

import StudentLogin from "views/Login/studentLogin";
import StudentSignUp from "views/SignUp/studentSignUp";
import ForgetPassword from "views/Login/forgetPassword";
import RestPassword from "views/Login/resetPassword";

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
              render={(props) => <StudentLogin {...props} />}
            />
            <Route
              exact
              path="/signup"
              name="SignUp"
              component={StudentSignUp}
            />
            <Route
              exact
              path="/forget-password"
              name="Forget Password"
              render={(props) => <ForgetPassword {...props} />}
            />
              <Route
              exact
              path="/reset-password/:id"
              name="Rest Password"
              render={(props) => <RestPassword {...props} />}
            />
            <ProtectedRoute path="/" name="Home" component={DefaultLayout} />
            {/* <Route path="/" name="Home" component={DefaultLayout} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

import * as serviceWorker from './serviceWorker'
import React, { Component } from 'react'
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Router } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
import "assets/scss/material-kit-react.scss?v=1.10.0";

import AdminLogin from "views/Login/adminLogin";

var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <HashRouter history={hist}>
        <React.Suspense fallback={loading}>
          <Switch>
            
            <Route exact path="/login" name="Login" render={(props) => <AdminLogin {...props} />} />
            {/* <Route exact path="*" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />

            {/* 
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
             */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App

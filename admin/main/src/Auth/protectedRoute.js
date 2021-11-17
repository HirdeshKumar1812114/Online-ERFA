import React, { Component } from 'react'
import { HashRouter, Route, Switch, Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from './auth'

function ProtectedRoute({ component: Component,auth, ...rest }) {
    return (
        <Route {...rest} 
        render={props => (
            Auth.isAuthenticated() ?
                <Component {...props} /> :
                <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }

                    }

                } />)
        } />
    );
}

export default ProtectedRoute;
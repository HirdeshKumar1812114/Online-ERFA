import React, { Component } from 'react'
import { HashRouter, Route, Switch, Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from './auth'
import { useCookies } from 'react-cookie';

function ProtectedRoute({ component: Component,auth, ...rest }) {
    const [token, setToken] = useCookies(['token']);
    console.log(token.token)
        

    return (<>
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
        }/>
    </>
    );

}

export default ProtectedRoute;
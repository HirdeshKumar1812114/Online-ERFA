import React, { Suspense, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useCookies } from 'react-cookie';
// routes config
import routes from '../routes'

const AppContent = () => {
  const [userType, setUserType] = useCookies(['onlineerfa_admin_userType']);
  const [usertype, setUsertype] = useState(userType.onlineerfa_admin_userType)
  console.log('userType=> Dashboard>', usertype);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}

          {usertype == 'faculty' ?
            <Redirect from="/" to="/pannelist" />
            :
            <Redirect from="/" to="/dashboard" />
          }
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

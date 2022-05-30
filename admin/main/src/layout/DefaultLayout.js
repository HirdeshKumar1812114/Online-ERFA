import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Pannelist  from '../views/Pannelist/pannelist'
import { useCookies } from 'react-cookie';

const DefaultLayout = () => {

  const [userType, setUserType] = useCookies(['onlineerfa_admin_userType']);


  return (
    <div>
      {userType.onlineerfa_admin_userType === 'faculty' ? <></>
        :
        <AppSidebar />
      }
      
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {userType.onlineerfa_admin_userType === 'faculty' ?
          <>
            <Pannelist />

          </>
            :
            <AppContent />
          }
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

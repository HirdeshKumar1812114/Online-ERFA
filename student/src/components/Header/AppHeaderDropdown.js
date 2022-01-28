import React from 'react'
import Auth from '../../Auth/auth'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useCookies } from 'react-cookie';

import avatar8 from './../../assets/images/avatars/8.jpg'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const AppHeaderDropdown = props => {
  const [token, setToken, removeToken] = useCookies(['token']);
  const [userName, setUserName, removeUserName] = useCookies(['userID']);
  const [userType, setUserType, removeType] = useCookies(['userType']);
  console.log('this is header ==> ', userName.userID)

  const logout = () => {
   
    
    
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <CButton color="light" shape="rounded-pill">{userName.userID == "undefined" ? 'Admin' : userName.userID  }</CButton>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Notifications
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={
         ()=>{ 
          removeToken('token',{path:'/',maxAge:0})
          removeUserName('userID',{path:'/',maxAge:0})
          removeType('userType',{path:'/',maxAge:0})

          Auth.logout(
            () => {
            return <Redirect to="/login"/>
          })

         }
        }
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

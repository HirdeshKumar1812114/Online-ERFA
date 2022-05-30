import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CButton,
  CBadge,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./Header/index";
import { logo } from "../assets/brand/logo";
import { useCookies } from 'react-cookie';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [userType, setUserType] = useCookies(['onlineerfa_admin_userType']);
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        {userType.onlineerfa_admin_userType === 'faculty' ? <></>
          :
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
          >

            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>}

        <CHeaderBrand className="mx-auto d-md-none" to="/">
          Pannelist Portal
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              activeClassName="active"
            >{userType.onlineerfa_admin_userType === 'faculty' ? <>Pannelist's Portal</>
              :
            userType.onlineerfa_admin_userType === 'officer' ? <>Officer's Portal</>
            :  
              <>Admin's Dashboard</>}
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink   href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink    href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CButton color="link" className="position-relative">
                <CIcon icon={cilBell} size="lg" />
                <CBadge color="danger" position="top-end" shape="rounded-pill">
                  5
                </CBadge>
              </CButton>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {userType.onlineerfa_admin_userType === 'faculty' ?
      <></>:
      <>
     <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
     </> 
      }
    </CHeader>
  );
};

export default AppHeader;

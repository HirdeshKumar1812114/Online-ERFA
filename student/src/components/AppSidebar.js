import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CImage
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


import { AppSidebarNav } from "./AppSidebarNav";

import logo  from "assets/images/logo.png";
import logo2  from "assets/images/logo2.png";


import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";



// sidebar nav config
import navAdmin from "../_nav";
import navOfficer from "../_navOfficer";
import { useCookies } from "react-cookie";

const AppSidebar = () => {
  const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);
  const [userRegID, setUserRegID] = useCookies(["onlineerfa_student_userRegID"]);
  const [userStudentName, setUserStudentName] = useCookies(["onlineerfa_student_userStudentName"]);

  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  // const [usertype, setUsertype] = useState(userType.userType);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
      style={{ "background-color": "#203f9a" }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage className="sidebar-brand-full" rounded src={logo} height={35} />
        <CImage className="sidebar-brand-narrow" rounded src={logo2} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navOfficer} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

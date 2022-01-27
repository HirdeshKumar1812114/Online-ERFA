import React, { useState } from "react";
import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar'
const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
 
  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>Scholarship Postintg</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          
        </CCardBody>
      </CCard>
      

    </CContainer>
  );
};

export default Layout;

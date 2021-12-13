import React, { useState, useEffect } from "react";

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
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";

const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
  const [Newdesignation, setNewDesignation] = useState("");
  const [NewcellNumber, setNewCellNumber] = useState("");
  const [Newemail, setNewEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState("");
  const [isMatched, setIsMatched] = useState();
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false);
  const [usertoUpdate, setUsertoUpdate] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 1000,
  });

  useEffect(() => {
    api
      .get(`officer/details/${localStorage.getItem("userUpdate")}`)
      .then((res) => {
        setUsertoUpdate(res.data);
      })
      .catch((error) => console.log(error));
    setDesignation(usertoUpdate.designation);
    setCellNumber(usertoUpdate.cellnumber);
  }, [usertoUpdate]);

  const submitData = () => {
    // console.log(Newdesignation)
    // console.log(Newemail)
    // console.log(NewcellNumber)

    api
      .put(
        `officer/edit/${localStorage.getItem("userUpdate")}`,
        {
          designation: Newdesignation,
          cellnumber: NewcellNumber,
        },
        setLoading(true)
      )
      .then((result) => {
        // console.log(result)
        window.alert("User Updated");
        setValid("true");
        setLoading(false);
        props.history.push("view-users");
        // console.log(result)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setValid("error");
      });
  };

  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>Update User Form</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          {loading == true ? (
            <>
              <br />
              <RingLoader color={color} css={override} size={100} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </>
          ) : (
            <CForm className="row g-3" onSubmit={submitData}>
              <CCol md={6}>
                <CFormLabel htmlFor="inputUserName4">Name</CFormLabel>
                <CFormInput
                  disabled
                  value={usertoUpdate.username}
                  type="text"
                  id="inputUsername4"
                  placeholder="First_Name   Middle_Name   Last_Name"
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                <CFormInput
                  disabled
                  value={usertoUpdate.email}
                  type="email"
                  id="inputEmail"
                />
              </CCol>

              <CCol xs={6}>
                <CFormLabel htmlFor="inputNic">NIC Number</CFormLabel>
                <CFormInput
                  disabled
                  value={usertoUpdate.nic}
                  id="inputNic"
                  placeholder="XXXX-XXXXXXX-X (13-digits with dashes)"
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputDob">Date of Birth</CFormLabel>
                <CFormInput
                  disabled
                  value={usertoUpdate.dob}
                  id="inputDob"
                  type="date"
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="designation">Designation</CFormLabel>
                <CFormInput
                  value={Newdesignation}
                  type="text"
                  id="designation"
                  placeholder={designation}
                  onChange={(e) => {
                    setNewDesignation(e.target.value);
                  }}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputCellNo">Cell Number</CFormLabel>
                <CFormInput
                  value={NewcellNumber}
                  type="number"
                  id="inputCellNo"
                  placeholder={cellNumber}
                  onChange={(e) => {
                    setNewCellNumber(e.target.value);
                  }}
                />
              </CCol>

              <CCol xs={12}>
                <CButton
                  type="submit"
                  onClick={() => {
                    Newdesignation == ""
                      ? setNewDesignation(designation)
                      : Newdesignation;
                    Newemail == "" ? setNewEmail(email) : Newemail;
                    NewcellNumber == ""
                      ? setNewCellNumber(cellNumber)
                      : NewcellNumber;
                  }}
                >
                  Update User
                </CButton>
              </CCol>
            </CForm>
          )}
        </CCardBody>
      </CCard>

      {/* <prev >{JSON.stringify(username, null, 2)}</prev>
      <prev >{JSON.stringify(password, null, 2)}</prev>
      <prev >{JSON.stringify(nic, null, 2)}</prev>
      <prev >{JSON.stringify(dob, null, 2)}</prev>
      <prev >{JSON.stringify(re_password, null, 2)}</prev>
      <prev >{JSON.stringify(valid, null, 2)}</prev>
      <prev >{JSON.stringify(isMatched, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

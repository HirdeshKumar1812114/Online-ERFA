import React, { useState, useEffect } from "react";

import {
  CContainer,
  CButton,
  CCard,
  CModal,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import CheckUser from 'components/CheckUser'

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

  const [visible, setVisible] = useState(null);
  const [userValid, setUserValid] = useState(null)

  const api = axios.create({
    baseURL: "http://140.238.227.14:5000/",
  });
  const setVis = (value) => {
    // console.log({value});
    setVisible(value)
  }

  const checkUser= (value)=>{
    setUserValid(value)
  }
  useEffect(()=>{
    if(userValid==true){
     updateData();
    }
  })

  const updateData=()=>{
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
      // window.alert("User Updated");
      setValid("true");
      setLoading(false);
      props.history.push("view-users");
      // console.log(result)
    })
    .catch((err) => {
      setLoading(false);
      // console.log(err);
      setValid("error");
    });
  }

  useEffect(() => {
    api
      .get(`officer/details/${localStorage.getItem("userUpdate")}`)
      .then((res) => {
        setUsertoUpdate(res.data);
        setDesignation(usertoUpdate.designation);
        setCellNumber(usertoUpdate.cellnumber);
      })
      .catch((error) => console.log(error));

  }, [loading]);

  const submitData = () => {
    // console.log(Newdesignation)
    // console.log(Newemail)
    // console.log(NewcellNumber)

    setVisible(!visible);

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
                  value={usertoUpdate.firstname + ' ' + usertoUpdate.lastname}
                  type="text"
                  id="inputUsername4"
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
                  value={usertoUpdate.designation}
                  disabled
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputCellNo">Cell Number</CFormLabel>

                <CFormInput
                  value={usertoUpdate.cellnumber}
                  disabled
                />
              </CCol>


              <CCol md={6}>
                <CFormLabel htmlFor="designation">Designation</CFormLabel>

                <CFormSelect aria-label="Default select example"
                  value={Newdesignation}
                  onChange={(e) => {
                    setNewDesignation(e.target.value);
                  }}
                  required
                >
                  <option>Select type</option>
                  <option value="Officer">Officer</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Head">Head</option>

                </CFormSelect>

              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputCellNo">New Cell Number</CFormLabel>
                {/* <CFormInput
                  value={NewcellNumber}
                  type="number"
                  id="inputCellNo"
                  placeholder={cellNumber}
                  onChange={(e) => {
                    setNewCellNumber(e.target.value);
                  }}
                /> */}


                <CFormInput
                  required
                  value={NewcellNumber}
                  type="text"
                  placeholder={cellNumber}
                  pattern="[0-9]*"
                  maxlength="11"
                  id="inputCellNo"
                  onChange={(e) => {
                    e.target.validity.valid ?
                      setNewCellNumber(e.target.value)
                      :
                      setNewCellNumber(NewcellNumber)
                  }}
                />
              </CCol>

              <CCol xs={12}>
                <CButton
                  type="submit"
                  onClick={() => {
                    Newdesignation == ""
                      ? setNewDesignation(usertoUpdate.designation)
                      : Newdesignation;
                    Newemail == "" ? setNewEmail(email) : Newemail;
                    NewcellNumber == ""
                      ? setNewCellNumber(usertoUpdate.cellnumber)
                      : NewcellNumber;
                  }}
                >
                  Update User
                </CButton>
              </CCol>
            </CForm>
          )}

          <CModal
            alignment="center"
            scrollable
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <CheckUser
              title="Update User"
              description="Enter password for confirmation to update user."
              action='update'
              chkUser={checkUser}
              setModel={setVis}
            />
          </CModal>
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

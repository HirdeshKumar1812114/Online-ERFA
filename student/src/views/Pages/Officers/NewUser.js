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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRepassword] = useState("");
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
  const [confPass, setConfPass] = useState('')
  const [passmath, setPassmath] = useState('')
  const [passstats, setpassstats] = useState();
  const [error, setError] = useState('')
  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      isMatched === false ||
      valid === "userExist"
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValid("incomplete");
      alert();
    }

    if (password === confPass) {
      setIsMatched(true);
      submitData();
    } else {
      setIsMatched(false);
      event.preventDefault();
      event.stopPropagation();
      setValid("invalidPassword");
    }
     
    
    setValidated(true);
  };

  const confirmPassword = (e) => {
    setConfPass(e.target.value)
    const confPass = e.target.value
    if (password === '' || confPass === '') {
      setPassmath('')
    } else {
      if (password !== confPass) {
        setPassmath('Password did not matched with your password')
        setpassstats(false)
        setIsMatched(false);
        setValid("invalidPassword");

      }
      //
      else {
        setIsMatched(true);
        setValid("");
        alert();
        setPassmath('Password Matched')
        setpassstats(true)


      }
    }
  }

  const submitData = () => {
    if (
      (firstName !== "" && lastName !== "" && password !== "",
        designation !== "" &&
        cellNumber !== "" &&
        email !== "" &&
        nic !== "" &&
        dob != "" )
    ) {
      api
        .post(
          "officer/addofficer",
          {
            firstname: firstName,
            lastname: lastName,
            password,
            designation,
            cellNumber,
            email,
            nic,
            dob,
          },
          setLoading(true)
        )
        .then((result) => {
          // console.log(result.data.message)
          if (result.data.message === "userAlreadyExisted") {
            setLoading(false);
            setValid("userExist");
            alert();
          } else {
            setValid("true");
            setFirstName("");
            setLastName("");
            setPassword("");
            setDesignation("");
            setCellNumber("");
            setEmail("");
            setNic("");
            setDob("");
            setRepassword("");
            alert();
            setLoading(false);
            props.history.push("/officers/view-users");
            // console.log(result)
            alert()
            props.history.push('view-users')
          }
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err)
          setValid("error");

          alert();
        });
    } else {
      setValid("incomplete");
      alert();
    }
  };

  const alert = () => {
    
    if (valid != "") {
      if (valid == "true") {
        return (
          <>
            <br />
            <br />
            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              severity="success"
            >
              SUCCESS - <strong>New ERFA user created successfully.</strong>
            </Alert>
            {/* <Redirect to='/' /> */}
          </>
        );
      } else if (valid == "userExist") {
        return (
          <>
            <br />
            <br />
            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              severity="error"
            >
              ERROR — <strong>User with this email is already existed!</strong>
            </Alert>
          </>
        );
      } else if (valid == "invalidPassword") {
        return (
          <>
            <br />
            <br />
            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              severity="error"
            >
              ERROR — <strong>Password not matched!</strong>
            </Alert>
          </>
        );
      } else if (valid == "incomplete") {
        return (
          <>
            <br />
            <br />

            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              severity="warning"
            >
              ALERT — <strong> Invalid form, please fill all fields proberly!</strong>
            </Alert>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>New User Form</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          {alert()}
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
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormLabel htmlFor="inputFirstName4">First Name</CFormLabel>
                <CFormInput
                  required
                  value={firstName}
                  type="text"
                  id="inputFirstname4"
                  placeholder="First_Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputLastName4">Last Name</CFormLabel>
                <CFormInput
                  required
                  value={lastName}
                  type="text"
                  id="inputLastname4"
                  placeholder="Last_Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </CCol>





              <CCol md={6}>
                <CFormLabel htmlFor="designation">Designation</CFormLabel>

                <CFormSelect aria-label="Default select example" 
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
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
                <CFormLabel htmlFor="inputCellNo">Cell Number</CFormLabel>
                <CFormInput
                  required
                  value={cellNumber}
                  type="text"
                  placeholder="0303XXXXXXX"
                  pattern="[0-9]*"
                  maxlength = "11"
                  id="inputCellNo"
                  onChange={(e) => {
                    e.target.validity.valid ?
                    setCellNumber(e.target.value)
                    :
                    setCellNumber(cellNumber)
                  }}
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                <CFormInput
                  required
                  value={email}
                  type="email"
                  id="inputEmail"
                  placeholder="xyz@szabist.pk"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputNic">NIC Number</CFormLabel>
                <CFormInput
                  required
                  value={nic}
                  type="text"
                  maxlength = "13"
                  pattern="[0-9]*"
                  id="inputNic"
                  placeholder="XXXXXXXXXXXX (13-digits without dashes)"
                  onChange={(e) => {
                    e.target.validity.valid ?
                    setNic(e.target.value)
                    :
                    setNic(nic)
                  }}
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
                <CFormInput
                  required
                  value={password}
                  type="password"
                  id="inputPassword4"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <PasswordStrengthBar password={password} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputRePassword4">
                  Retype Password
                </CFormLabel>
                <CFormInput
                  required
                  value={confPass}
                  type="password"
                  id="inputRePassword4"
                  onChange={confirmPassword}
                />
                <CFormFeedback
                  style={
                    passstats !== true
                      ? { 'font-size': '10px', color: 'red' }
                      : { 'font-size': '10px', color: 'green' }
                  }
                >
                  {passmath}

                </CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputDob">Date of Birth</CFormLabel>
                <CFormInput
                  required
                  value={dob}
                  id="inputDob"
                  type="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </CCol>
              <CCol xs={12}>
                <CButton type="submit">Add User</CButton>
              </CCol>
            </CForm>
          )}
        </CCardBody>
      </CCard>
      {/* <prev >{JSON.stringify(username, null, 2)}</prev>
      <prev >{JSON.stringify(password, null, 2)}</prev>
      <prev >{JSON.stringify(designation, null, 2)}</prev>
      <prev >{JSON.stringify(cellNumber, null, 2)}</prev>
      <prev >{JSON.stringify(nic, null, 2)}</prev>
      <prev >{JSON.stringify(dob, null, 2)}</prev>
      <prev >{JSON.stringify(re_password, null, 2)}</prev>
      <prev >{JSON.stringify(valid, null, 2)}</prev>
      <prev >{JSON.stringify(isMatched, null, 2)}</prev> */}

    </CContainer>
  );
};

export default Layout;

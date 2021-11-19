import React, { useState } from 'react'
import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel
} from '@coreui/react'
import Alert from '@mui/material/Alert';
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from 'axios';


const override = css`
  margin: 0 auto;
`;


const Layout = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRepassword] = useState('')
  const [designation, setDesignation] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [email, setEmail] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState('')
  const [isMatched, setIsMatched] = useState()
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false)

  const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
  });


  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false || isMatched === false || valid === 'userExist') {
      event.preventDefault()
      event.stopPropagation()
      setValid("incomplete")
      alert()
    }

    if (password === re_password) {
      setIsMatched(true)
      submitData()
    }
    else {
      setIsMatched(false)
      event.preventDefault()
      event.stopPropagation()
      setValid('invalidPassword')
      alert()
    }

    setValidated(true)
  }

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     setValid("incomplete")
  //     alert()
  //   } else {

  //     if (password === re_password) {
  //       setIsMatched(true)
  //       setValidated(true)
  //       submitData()
  //     }
  //     else {
  //       setIsMatched(false)
  //       setValid('invalidPassword')
  //       alert()
  //     }
  //   }



  // }
  const submitData = () => {



    if (username !== '' && password !== '', designation !== '' && cellNumber !== '' && email !== '' && nic !== '' && dob != '') {


      api.post('officer/addofficer', {
        username,
        password,
        designation,
        cellNumber,
        email,
        nic,
        dob
      }, setLoading(true))
        .then(result => {

          // console.log(result.data.message)
          if (result.data.message === "userAlreadyExisted") {
            setLoading(false)
            setValid("userExist")
            alert()
          } else {
            setValid("true")
            setUsername("")
            setPassword("")
            setDesignation("")
            setCellNumber("")
            setEmail("")
            setNic("")
            setDob("")
            setRepassword("")
            setLoading(false)
            // console.log(result)
            alert()
          }

        }).catch(err => {
          setLoading(false)
          // console.log(err)
          setValid("error")
          alert()
        })





    } else {
      setValid("incomplete")
      alert()


    }


  }

  const alert = () => {
    
    if (valid != "") {
      if (valid == "true") {
        return (
          <>
            <br />
            <br />
            <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="success">SUCCESS - <strong>New ERFA user created successfully.</strong></Alert>
            {/* <Redirect to='/' /> */}
          </>
        )
      }
      else if (valid == "userExist") {

        return (
          <>
            <br />
            <br />
            <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="error">ERROR — <strong>User with this email is already existed!</strong></Alert>
          </>
        )
      }
      else if (valid == "invalidPassword") {

        return (
          <>
            <br />
            <br />
            <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="error">ERROR — <strong>Password not matched!</strong></Alert>
          </>
        )
      }
      else if (valid == "incomplete") {
        return (
          <>
            <br />
            <br />
           
              <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="warning">ALERT — <strong> Incomplete form, please fill all fields!</strong></Alert>
           
          </>
        )
      }
    }
    else {
      return (
        <>
        </>)
    }

    
  }

  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong><h3>New User Form</h3></strong>
        </CCardHeader>
        <CCardBody>

          {alert()}
          {loading == true ?
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
            :

            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >

              <CCol md={12}>
                <CFormLabel htmlFor="inputUserName4">User Name</CFormLabel>
                <CFormInput required value={username} type="text" id="inputUsername4" placeholder="First_Name   Middle_Name   Last_Name"
                  onChange={
                    (e) => { setUsername(e.target.value) }

                  }
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="designation">Designation</CFormLabel>
                <CFormInput required value={designation} type="text" id="designation" placeholder="Manager"
                  onChange={
                    (e) => { setDesignation(e.target.value) }
                  }
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputCellNo">Cell Number</CFormLabel>
                <CFormInput required value={cellNumber} type="number" id="inputCellNo"
                  onChange={
                    (e) => { setCellNumber(e.target.value) }
                  }
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                <CFormInput required value={email} type="email" id="inputEmail" placeholder="xyz@szabist.pk"
                  onChange={
                    (e) => { setEmail(e.target.value) }
                  }
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputNic">NIC Number</CFormLabel>
                <CFormInput required value={nic} id="inputNic" placeholder="XXXX-XXXXXXX-X (13-digits with dashes)"
                  onChange={
                    (e) => { setNic(e.target.value) }
                  }
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
                <CFormInput required value={password} type="password" id="inputPassword4"
                  onChange={
                    (e) => { setPassword(e.target.value) }
                  }
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputRePassword4">Retype Password</CFormLabel>
                <CFormInput required value={re_password} type="password" id="inputRePassword4"
                  onChange={
                    (e) => {
                      setRepassword(e.target.value)

                    }
                  }
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputDob">Date of Birth</CFormLabel>
                <CFormInput required value={dob} id="inputDob" type="date"
                  onChange={
                    (e) => { setDob(e.target.value) }
                  }
                />
              </CCol>
              <CCol xs={12}>

                <CButton type="submit">Add User</CButton>


              </CCol>
            </CForm>
          }
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
  )
}

export default Layout

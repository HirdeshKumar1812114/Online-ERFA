import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Alert from '@mui/material/Alert';




const Layout = () => {

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
  
  

  const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
  });

  const submitData = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '', designation !== '' && cellNumber !== '' && email !== '' && nic !== '' && dob != '') {
     
      if(password === re_password){
      setValid("true")
        setIsMatched(true)
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
            setLoading(false)
            // console.log(result.data)
            // console.log(result.data.token)
            alert()
            setValid("true")
            Auth.login(() => {
              props.history.push("/")
            })
            // window.alert('Welcome to Admin Portal')
  
          }).catch(err => {
            setLoading(false)
            console.log(err)
            setValid("false")
            alert()
          })
  
      }else{
        setValid('invalidPassword')
        alert()

      }
      

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
            <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="success">OK - <strong>Form Complete. </strong></Alert>
            {/* <Redirect to='/' /> */}
          </>
        )
      }
      else if (valid == "userExist") {

        return (
        <>
        <br />
        <br />
        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="error">ERROR — <strong>Invalid Credentials!</strong></Alert>
        </>
      )}
      else if (valid == "invalidPassword") {

        return (
        <>
        <br />
        <br />
        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="error">ERROR — <strong>Password not Matched</strong></Alert>
        </>
      )}
      else if (valid == "incomplete") {
        return (
        <>
        <br />
        <br />
        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="warning">ALERT — <strong> Incomplete form, please fill all fields !</strong></Alert>
        </>
        )}
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
       
          <CForm className="row g-3">

            <CCol md={12}>
              <CFormLabel htmlFor="inputUserName4">User Name</CFormLabel>
              <CFormInput type="text" id="inputUsername4" placeholder="First_Name   Middle_Name   Last_Name"
                onChange={
                  (e) => { setUsername(e.target.value) }
                }
              />
            </CCol>
            
            <CCol md={6}>
              <CFormLabel htmlFor="designation">Designation</CFormLabel>
              <CFormInput type="text" id="designation" placeholder="Manager"
                onChange={
                  (e) => { setDesignation(e.target.value) }
                }
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCellNo">Cell Number</CFormLabel>
              <CFormInput type="number" id="inputCellNo"
                onChange={
                  (e) => { setCellNumber(e.target.value) }
                }
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
              <CFormInput type="email" id="inputEmail" placeholder="xyz@szabist.pk"
                onChange={
                  (e) => { setEmail(e.target.value) }
                }
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="inputNic">NIC Number</CFormLabel>
              <CFormInput id="inputNic" placeholder="XXXX-XXXXXXX-X (13-digits with dashes)"
                onChange={
                  (e) => { setNic(e.target.value) }
                }
              />
            </CCol>
            
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
              <CFormInput type="password" id="inputPassword4"
                onChange={
                  (e) => { setPassword(e.target.value) }
                }
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputRePassword4">Retype Password</CFormLabel>
              <CFormInput type="password" id="inputRePassword4"
                onChange={
                  (e) => { setRepassword(e.target.value) }
                }
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputDob">Date of Birth</CFormLabel>
              <CFormInput id="inputDob" type="date"
                onChange={
                  (e) => { setDob(e.target.value) }
                }
              />
            </CCol>
            <CCol xs={12}>
              <CButton type="submit" onClick={submitData}>Sign in</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
      <prev >{JSON.stringify(username, null, 2)}</prev>
      <prev >{JSON.stringify(password, null, 2)}</prev>
      <prev >{JSON.stringify(designation, null, 2)}</prev>
      <prev >{JSON.stringify(cellNumber, null, 2)}</prev>
      <prev >{JSON.stringify(nic, null, 2)}</prev>
      <prev >{JSON.stringify(dob, null, 2)}</prev>
      <prev >{JSON.stringify(re_password  , null, 2)}</prev>
      <prev >{JSON.stringify(valid  , null, 2)}</prev>
      <prev >{JSON.stringify(isMatched  , null, 2)}</prev>






    </CContainer>
  )
}

export default Layout

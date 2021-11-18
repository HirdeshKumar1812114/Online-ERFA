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

const Layout = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [designation, setDesignation] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [email, setEmail] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')


  return (
    <CContainer fluid>
    <CCard>
      <CCardHeader>
       <strong><h3>New User Form</h3></strong>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3">

        <CCol md={6}>
            <CFormLabel htmlFor="inputUserName4">User Name</CFormLabel>
            <CFormInput type="text" id="inputUsername4"
            onChange={
              (e)=>{setUsername(e.target.value)}
            }
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
            <CFormInput type="password" id="inputPassword4" 
            onChange={
              (e)=>{setPassword(e.target.value)}
            }
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputEmail4">Designation</CFormLabel>
            <CFormInput type="text" id="inputEmail4"  
            onChange={
              (e)=>{setDesignation(e.target.value)}
            }
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputPassword4">Cell Number</CFormLabel>
            <CFormInput type="number" id="inputPassword4" 
            onChange={
              (e)=>{setCellNumber(e.target.value)}
            }
            />
          </CCol>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
            <CFormInput type="email" id="inputEmail" placeholder="xyz@szabist.pk" 
            onChange={
              (e)=>{setEmail(e.target.value)}
            }
            />
          </CCol>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputAddress2">NIC Number</CFormLabel>
            <CFormInput id="inputAddress2" placeholder="XXXX-XXXXXXX-X (13-digits with dashes)" 
            onChange={
              (e)=>{setNic(e.target.value)}
            }
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputCity">Date of Birth</CFormLabel>
            <CFormInput id="inputDob" type="date"
            onChange={
              (e)=>{setDob(e.target.value)}
            }
            />
          </CCol>
          
          <CCol xs={12}>
            <CButton type="submit">Sign in</CButton>
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



  </CContainer>
  )
}

export default Layout

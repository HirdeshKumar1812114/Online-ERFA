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
  CFormTextarea,
  CFormSelect,
  CFormFeedback,
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";

import { DropzoneArea } from 'material-ui-dropzone';
const override = css`
  margin: 0 auto;
`;

const api = axios.create({
<<<<<<< HEAD
  baseURL: "https://server.syedmustafaimam.com/",
=======
  baseURL: "https://5000-syedmustafai-onlineerfa-47btspgvx5g.ws-eu42.gitpod.io/",
>>>>>>> 776863cb2be79b28d1540dfd049d21aa58c623e1
});

const Layout = (props) => {

  const [title, setTitle] = useState('');
  const [applicationstart, setApplicationStart] = useState('');
  const [applicationdeadline, setApplicationEnd] = useState('');
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [tags, setTags] = useState([])


  const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      submitData();
  };
  const submitData = () => {
    const data = new FormData()
    data.append('file', poster, poster[0].name)
    data.append(title)
    data.append(applicationstart)
    data.append(applicationdeadline)
    data.append(description)
    data.append(tags)
    
    
  api.post('scholarship/add',{
    data
  }).then(data => {
    // // console.log("Data Posted in DB");
    // // console.log('Response', data)
  }).catch(err =>{
    // console.log("Error occured : ", err)
  })
  
  }
  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>Scholarship Posting</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CCol md={12}>
              <CFormLabel htmlFor="title">Title</CFormLabel>
              <CFormInput type="text" id="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="inputDob">Applicaiton starting date</CFormLabel>
              <CFormInput
                required
                value={applicationstart}
                id="inputStartDate"
                type="date"
                onChange={(e) => {
                  setApplicationStart(e.target.value);
                }}
              />
            </CCol>


            <CCol md={6}>
              <CFormLabel htmlFor="inputDob">Applicaiton ending date</CFormLabel>
              <CFormInput
                required
                value={applicationdeadline}
                id="inputEndDate"
                type="date"
                onChange={(e) => {
                  setApplicationEnd(e.target.value);
                }}
              />
            </CCol>

            <CCol md={12}>
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea id="description" rows="5"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              >
              </CFormTextarea>
            </CCol>


            <CCol md={12}>
              <CFormLabel htmlFor="description">Eligibility</CFormLabel>
              <CFormTextarea id="description" rows="3"
                onChange={(e) => {
                  let ele = e.target.value.split(".")
                  setEligibility(ele);
                }}
                value={eligibility}
              ></CFormTextarea>
            </CCol>

            <CCol md={12}>
              <CFormLabel htmlFor="inputDob">Tags</CFormLabel>
              <CFormInput
                required
                value={tags}
                id="inputStartDate"
                type="text"
                onChange={(e) => {
                  let next = e.target.value.split(",")
                  setTags(next);
                }}
              />
            </CCol>
            <br />
            <br />

            <CCol md={12}>
              <CFormLabel htmlFor="formFile">Load Poster Image</CFormLabel>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => {
                  // console.log('Files:', files);
                  setPoster(files)
                }}
              />
            </CCol>
            <br />
            <br />
            <br />

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>



        </CCardBody>
      </CCard>

      <prev >{JSON.stringify(title, null, 2)}</prev>
      <prev >{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev >{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev >{JSON.stringify(poster, null, 2)}</prev>
      <prev >{JSON.stringify(description, null, 2)}</prev>
      <prev >{JSON.stringify(eligibility, null, 2)}</prev>
      <prev >{JSON.stringify(tags, null, 2)}</prev>

    </CContainer>
  );
};

export default Layout;

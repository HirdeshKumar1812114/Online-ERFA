import React, { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";

import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { CBadge } from '@coreui/react'

const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [applicationstart, setApplicationStart] = useState("");
  const [applicationdeadline, setApplicationDeadline] = useState("");
  const [poster, setPoster] = useState();
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false)
  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  useEffect(() => {
    api
      .get(`scholarship/view/${localStorage.getItem("viewPostUrl")}`, setLoading(true))
      .then((res) => {
        // console.log(res.data)
        setId(res.data._id)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setEligibility(res.data.eligibility)
        setApplicationStart(res.data.applicationstart)
        setApplicationDeadline(res.data.applicationdeadline)
        setPoster(res.data.poster)
        setImageName(res.data.poster)
        setTags(res.data.tags)
        setLoading(false)
      })
      .catch((error) => console.log(error));
    // console.log('Image=>', imageName);

  }, []);


  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {

      updateData()
    }
    setValidated(true)
  }

  const updateData = () => {
    //  console.log('poster1==>',poster);
    //  console.log('poster.length==>',);

    var data = new FormData();
    data.append("poster", poster[0]);
    data.append("title", title);
    data.append("applicationstart", applicationstart);
    data.append("applicationdeadline", applicationdeadline);
    data.append("eligibility", eligibility)
    data.append("description", description);
    data.append("tags", tags);

  
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    api
      .put(`scholarship/edit/${localStorage.getItem("viewPostUrl")}`, data, setLoading(true), config)
      .then((result) => {
        for (var value of data.values()) {
          // console.log('Values=>',value);
       }
       
        // console.log("Response==>", result);
        setLoading(false);
        if (result.data.message == 'alreadExisted') {
          window.alert('Scholarship with this title alrady exists!')
        } else {
        setLoading(false);

          window.alert('Scholarship updated!')
          
          props.history.push("view-post");

        }
      })
      .catch((err) => {
        setLoading(false);
        window.alert('Connection Error!')
        // console.log("Error occured : ", err);
      });
  };


  return (
    <CContainer fluid>
      <CCard>
        {loading == true && (poster == '' || poster == 'undifined') ? (
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
          <>
            <CCardHeader>
              <strong>
                <h3 style={{ 'margin': '20px' }}>{title}</h3>
                <p style={{ 'margin': '20px' }}>Application Starts: {applicationstart} | Application Deadline: {applicationdeadline}</p>

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
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={12}>
                    <CFormLabel htmlFor="title">Title</CFormLabel>
                    <CFormInput
                      required
                      type="text"
                      id="title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                    />
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="inputDob">
                      Applicaiton starting date
                    </CFormLabel>
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
                    <CFormLabel htmlFor="inputDob">
                      Applicaiton ending date
                    </CFormLabel>
                    <CFormInput
                      required
                      value={applicationdeadline}
                      id="inputEndDate"
                      type="date"
                      onChange={(e) => {
                        setApplicationDeadline(e.target.value);
                      }}
                    />
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="description">Description</CFormLabel>
                    <CFormTextarea
                      required
                      id="description"
                      rows="5"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                    ></CFormTextarea>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="description">Eligibility</CFormLabel>
                    <CFormTextarea
                      required
                      id="description"
                      rows="3"
                      onChange={(e) => {
                        setEligibility(e.target.value);
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
                        let next = e.target.value.split(",");
                        setTags(next);
                      }}
                    />
                  </CCol>
                  <br />
                  <br />

                  <CCol md={6}>
                    <CFormLabel htmlFor="formFile">Existing Poster</CFormLabel>
                    {<CImage fluid src={`http://localhost:5000/getPoster/${imageName}`} />}
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="formFile">Load Poster Image</CFormLabel>
                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      dropzoneText={"Update image"}
                      onChange={(files) => {
                        // console.log("Files:", files);
                        setPoster(files);
                      }}
                    />
                  </CCol>
                  <br />
                  <br />
                  <br />
              {validated == true ? <><span style={{ "font-size": "14px", "color": 'red' }}>*Fill all fields!</span></> : <></>}

                  <CButton type="submit" color="success">
                    <span style={{'color':"white"}}>Update Scholarship</span> 
                  </CButton>
                </CForm>
              )}
            </CCardBody>
          </>
        )}
      </CCard>

      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(poster, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

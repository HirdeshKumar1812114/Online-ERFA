import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Checkbox from 'rc-checkbox';
// import 'rc-checkbox/assets/index.css';

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
  CFormCheck,
  CBadge,
  CRow
} from "@coreui/react";

import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

const override = css`
  margin: 0 auto;
`;

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const Layout = (props) => {

  let [color, setColor] = useState("#49A54D");

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState('');
  const [applicationComplete, setApplicationComplete] = useState('');
  const [status, setStatus] = useState('notreviewed');

  const [disabled, setDisabled] = useState(false);
  const [formName, setFormName] = useState('');
  const [yourMessage, setYourMessage] = useState('');
  const [officerMessage, setOfficerMessage] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);

  useEffect(() => {
    api.
      post('scholarship-form/applicationform', { scholarship: localStorage.getItem("viewPostUrl"), student: userID.onlineerfa_student_userID },
        setLoading(true)).
      then((res) => {
        let { form, status, messageStudent, messageOfficer, _id } = res.data
        console.log(res.data)
        setPdf(form)
        setFormName(form)
        setStatus(status)
        setYourMessage(messageStudent)
        setOfficerMessage(messageOfficer)
        setApplicationId(_id)
        setLoading(false)
      })
  }, [title])


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    // if (pdf.length == 0) {
    //   event.stopPropagation();
    //   setValidated(true);
    // } else {
      
    // }
    setValidated(false);
      submitData();
  };



  const stautsBadge = (status) => {
    if (status === 'accepted') {
      return (
        <>
          <CBadge color="success">Accepted</CBadge>
        </>
      )
    }
    else if (status === 'paused') {
      return (
        <>
          <CBadge color="warning">Paused</CBadge>
        </>)
    }
    else if (status === 'rejected') {
      return (
        <>
          <CBadge color="danger">Rejected</CBadge>
        </>
      )
    }
    else {
      return (
        <>
          <CBadge color="primary">To be evaluated</CBadge>
        </>
      )
    }
  }

  const submitData = () => {
    console.log('pdf1==>', pdf);
    let scholarshipID = localStorage.getItem("viewPostUrl")
    console.log(JSON.parse(JSON.stringify(scholarshipID)));
    console.log(userID.onlineerfa_student_userID)

    var data = new FormData();
    data.append("form", pdf[0]);
    data.append("scholarship", JSON.parse(JSON.stringify(scholarshipID)));
    data.append("student", userID.onlineerfa_student_userID);
    data.append("messageStudent", yourMessage)
    // console.log("FormData ==>", data);
    // for (var value of data.values()) {
    //   console.log('loop values==>', value);
    // }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    api
      .put(`scholarship-form/edit/${applicationId}`, data, setLoading(true), config)
      .then((result) => {
        // console.log("Data Posted in DB");
        // console.log("Response==>", result);
        setLoading(false);
        console.log(result.data)
        window.alert("Data Submitted! Please be patient for the response.");
      })
      .catch((err) => {
        setLoading(false);
        window.alert("Connection Error!");

        // console.log("Error occured : ", err);
      });

  };
  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>{localStorage.getItem('ScholarshipTitle')} - Form </h3>
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
            <>
              <CCol md={12}>
                <CFormLabel htmlFor="formFile">Status of the Application:</CFormLabel>
                &nbsp;&nbsp;&nbsp;   {stautsBadge(status)}
              </CCol>

              {
                status == 'notreviewed' || status == 'paused' || !status ?
                  <>
                    <br />
                    <CForm
                      disabled
                      className="row g-3 needs-validation"
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Form:</CFormLabel>
                        <CCol sm={10}>
                          <CFormInput type="text" defaultValue="Form not uploaded" value={formName == '' ? 'Please upload form!' : formName} readOnly plainText />
                        </CCol>
                      </CRow>

                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Message for officer:</CFormLabel>
                        <CFormTextarea id="exampleFormControlTextarea1" placeholder={'Type your message here!'} value={yourMessage != '' ? yourMessage : ''}
                          onChange={(e) => { setYourMessage(e.target.value) }}
                          rows="3"></CFormTextarea>
                      </CCol>

                      <CCol md={12}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Message from officer:</CFormLabel>
                        <CFormTextarea id="exampleFormControlTextarea1" value={officerMessage == '' ? 'Application not evaluated yet!' : officerMessage} readOnly rows="3"></CFormTextarea>
                      </CCol>


                      <CCol md={12}>
                        <CFormLabel htmlFor="formFile">Upload Completed Document</CFormLabel>
                        <DropzoneArea
                          acceptedFiles={[".pdf"]}
                          dropzoneText={"Drag and drop an pdf here or click"}
                          onChange={(files) => {
                            // console.log("Files:", files);
                            setPdf(files);
                          }}
                        />
                      </CCol>
                      <br />
                      <br />
                      {validated == true ? (
                        <>
                          <span style={{ "font-size": "14px", color: "red" }}>
                            *Please fill all the fields and upload a pdf!
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <CButton type="submit" color="primary">
                        Upload document
                      </CButton>
                    </CForm>
                  </> :
                  <>
                    <h4>
                      Application closed!
                    </h4>
                    <CCol md={12}>
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Message from officer:</CFormLabel>
                      <CFormTextarea id="exampleFormControlTextarea1" value={officerMessage == '' ? 'Application not evaluated yet!' : officerMessage} readOnly rows="3"></CFormTextarea>
                    </CCol>
                  </>
              }
            </>
          )}
        </CCardBody>
      </CCard>

      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(yourMessage, null, 2)}</prev>
      <prev>{JSON.stringify(pdf, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

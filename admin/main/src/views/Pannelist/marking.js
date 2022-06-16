import { React, useState } from "react";
import { CContainer, CRow, CForm, CCol, CFormInput, CFormLabel, CFormRange, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'

import { useCookies } from 'react-cookie';
import Fade from 'react-reveal/Fade';

import AllPagesPDFViewer from "./all-pages";
import RingLoader from "react-spinners/RingLoader";
import Alert from "@mui/material/Alert";
import { css } from "@emotion/react";
import axios from "axios";
const override = css`
  margin: 0 auto;
`;


import "./pdf.css";

export default function Marking(props) {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState("");
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false);
  const [per, setPer] = useState('')
  const [comment, setComment] = useState('')

  const [dataSubmited, setDataSubmited] = useState(false)
  const [userId, setUserId] = useCookies(['onlineerfa_admin_userId']);

  props.func(dataSubmited)

  // console.log('pannelistId: ',userId.onlineerfa_admin_userId)

  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false || per == "" || comment == "") {
      event.preventDefault()
      event.stopPropagation()
      setValid("incomplete");
      alert();
    } else {
      submitData();
    }

    setValidated(true)
  }


  const submitData = () => {
    api
      .post(
        "interview/evaluatesapplication",
        {
          score: per,
          remark: comment,
          application: props.applicationId,
          panelist: props.pannelistId
        },
        setLoading(true)
      )
      .then((result) => {
        console.log(result.data)
        window.alert('Evaluation Done!')
        setLoading(false);
        setDataSubmited(true)
        setValid("true");
        alert();
        console.log(result)
        // props.history.push("view-users");

        if (result.message === 'Interview panelist has evaluated this candiate.') {
          setValid("already");
          alert()
          setDataSubmited(true)

        }
      })
      .catch((err) => {
        window.alert('You have evaluated this candiate.')
        setLoading(false);
        console.log(err)
        setDataSubmited(true)

      });

  }

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
              SUCCESS - <strong>Student found!</strong>
            </Alert>
            {/* <Redirect to='/' /> */}
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
              ALERT —{" "}
              <strong>
                {" "}
                Invalid form, please fill all the fields properly!
              </strong>
            </Alert>
          </>
        );
      }
      else if (valid == "already") {
        return (
          <>
            <br />
            <br />

            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              severity="error"
            >
              404 —{" "}
              <strong>
                {" "}
                Interview panelist has evaluated this candiate!
              </strong>
            </Alert>
          </>
        );
      }
    }

    else {
      return <></>;
    }
  };



  return (
    <CContainer>
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
        <CRow>
          <CCol>

            <Fade left>
              <CCard>
                <CCardHeader>
                  Student Evaluation
                </CCardHeader>
                <CCardBody>
                  <CForm
                    noValidate
                    className="row g-3 needs-validation"
                    validated={validated}
                    onSubmit={handleSubmit}
                  >

                    <CRow className="mb-12">
                      <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">Name</CFormLabel>
                      <CCol sm={9}>
                        <CFormInput style={{ 'font-weight': 'bold' }} type="text" id="staticEmail" defaultValue={props.name} readOnly plainText />
                      </CCol>
                    </CRow>

                    <CRow className="mb-12">
                      <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">Reg. No.</CFormLabel>
                      <CCol sm={9}>
                        <CFormInput style={{ 'font-weight': 'bold' }} type="text" id="staticEmail" defaultValue={props.regNo} readOnly plainText />
                      </CCol>
                    </CRow>

                    <CRow className="mb-12">
                      <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">Program</CFormLabel>
                      <CCol sm={9}>
                        <CFormInput style={{ 'font-weight': 'bold' }} type="text" id="staticEmail" defaultValue={props.program} readOnly plainText />
                      </CCol>
                    </CRow>

                    <CRow className="mb-12">
                      <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">Section</CFormLabel>
                      <CCol sm={9}>
                        <CFormInput style={{ 'font-weight': 'bold' }} type="text" id="staticEmail" defaultValue={props.section} readOnly plainText />
                      </CCol>
                    </CRow>

                    <CFormLabel htmlFor="staticEmail" className="col-form-label">Comments</CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      label="Remarks"
                      placeholder="He should be awared for 100%"
                      required
                      onChange={(e) => { setComment(e.target.value) }}
                    />
                    <CFormLabel htmlFor="staticEmail" className="col-form-label">Select Percentage</CFormLabel>
                    <CFormRange min="0" max="100" label="Example range" step="25" defaultValue="0" onChange={(e) => { setPer(e.target.value) }} id="customRange2" />
                    <CFormInput type="text" id="staticEmail" defaultValue={per} readOnly plainText style={{ 'font-weight': 'bold' }} />
                    <br />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton type="submit" color="success" className="me-md-2">
                      Post Results
                      </CButton>
                      <CButton color="warning" onClick={() =>{setDataSubmited(true)}}> Go back</CButton>
                    </div>
                  </CForm>
                  {/* <prev >{JSON.stringify(per, null, 2)}</prev> */}
                </CCardBody>
              </CCard>
            </Fade>
          </CCol>

          <CCol sm={8} >
            <Fade right>
              <CCard>
                <CCardHeader>
                  Application form
                </CCardHeader>
                <CCardBody>
                  <div className="App">

                    <div className="all-page-container">
                      <AllPagesPDFViewer pdf={`http://localhost:5000/getForm/${props.form}`} />
                    </div>

                    {/* https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf */}

                    {/* <object
              data='http://localhost:5000/getForm/form_1650629418470.pdf'
              type="application/pdf"
              width="100%"
              height="678"
            >

              <iframe
                src='http://localhost:5000/getForm/form_1650629418470.pdf'
                width="100%"
                height="678"
              >
                <p>This browser does not support PDF!</p>
              </iframe>
            </object> */}

                    <hr />

                  </div>
                </CCardBody>
              </CCard>
            </Fade>
          </CCol>

        </CRow>
      )}

    </CContainer>

  );
}

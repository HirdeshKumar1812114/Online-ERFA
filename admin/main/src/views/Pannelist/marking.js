import { React, useState } from "react";
import { CContainer, CRow, CForm, CCol, CFormInput, CFormLabel, CFormRange, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'

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

  const [dataSubmited,setDataSubmited] = useState(false)

  props.func(dataSubmited)

  return (
    <CContainer>
      <CRow>
        <CCol>


          <CCard>
            <CCardHeader>
              Student Evaluation
            </CCardHeader>
            <CCardBody>
              <CForm>

                <CRow className="mb-12">
                  <CFormLabel htmlFor="staticEmail" className="col-sm-3 col-form-label">Name</CFormLabel>
                  <CCol sm={9}>
                    <CFormInput  style={{ 'font-weight': 'bold' }} type="text" id="staticEmail" defaultValue={props.name} readOnly plainText />
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
                  text="Must be 8-20 characters long."
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormLabel htmlFor="staticEmail" className="col-form-label">Select Percentage</CFormLabel>
                <CFormRange min="0" max="100" label="Example range" step="25" defaultValue="0" onChange={(e) => { setPer(e.target.value) }} id="customRange2" />
                <CFormInput type="text" id="staticEmail" defaultValue={per} readOnly plainText style={{ 'font-weight': 'bold' }} />
                <br/>
                <CButton type="submit" className="mb-3" onClick={()=>{setDataSubmited(true)}}>
                  Post Results
                </CButton>
              </CForm>
              {/* <prev >{JSON.stringify(per, null, 2)}</prev> */}
            </CCardBody>
          </CCard>

        </CCol>

        <CCol sm={8} >
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
        </CCol>

      </CRow>

    </CContainer>

  );
}

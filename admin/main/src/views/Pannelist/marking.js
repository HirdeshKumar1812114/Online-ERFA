import { React, useState } from "react";
import { CContainer, CRow, CForm, CCol, CFormInput, CFormLabel, CFormRange, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'

import AllPagesPDFViewer from "./all-pages";
/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/


import "./pdf.css";

export default function Marking() {

  const [per, setPer] = useState('')

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
                <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">Comments</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  label="Remarks"
                  placeholder="He should be awared for 100%"
                  text="Must be 8-20 characters long."
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">Select Percentage</CFormLabel>
                <CFormRange min="0" max="100" label="Example range" step="25" defaultValue="0" onChange={(e) => { setPer(e.target.value) }} id="customRange2" />
                <CFormInput type="text" id="staticEmail" defaultValue={per} readOnly plainText style={{ 'font-weight': 'bold' }} />
                <CButton type="submit" className="mb-3">
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
              <AllPagesPDFViewer pdf={"https://server.syedmustafaimam.com/getForm/form_1650629418470.pdf"} />
            </div>

            {/* https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf */}

            {/* <object
              data='https://server.syedmustafaimam.com/getForm/form_1650629418470.pdf'
              type="application/pdf"
              width="100%"
              height="678"
            >

              <iframe
                src='https://server.syedmustafaimam.com/getForm/form_1650629418470.pdf'
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

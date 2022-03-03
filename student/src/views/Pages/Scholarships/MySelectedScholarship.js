import React, { useState } from "react";
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
  CFormCheck
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
  const [applicationstart, setApplicationStart] = useState("");
  const [applicationdeadline, setApplicationEnd] = useState("");
  const [pdf, setPdf] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [checkedPrograms, setPorgrams] = useState([]);
  const [tags, setTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);




  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (pdf.length == 0) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      submitData();
    }
  };

  const onChange = (e) => {
    let { checked, value } = e.target
    // console.log('Checkbox checked:', (checked));
    // console.log('Value', value);

    if (checked == true) {
      setPorgrams((checkedPrograms) => ([...checkedPrograms, e.target.value]))
    }
    else {
      const arr = checkedPrograms.filter((item) => item !== value);
      setPorgrams(arr);
    }
  }

  const toggle = () => {
    setDisabled(!disabled)
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const submitData = () => {
     console.log('pdf1==>',pdf);
     let scholarshipID = localStorage.getItem("viewPostUrl")
    console.log(JSON.parse(JSON.stringify(scholarshipID)));
    console.log(userID.onlineerfa_student_userID)
    if (pdf.length !== 0) {
      var data = new FormData();
      data.append("form", pdf[0]);
      data.append("scholarship", JSON.parse(JSON.stringify(scholarshipID)));
      data.append("student",userID.onlineerfa_student_userID);
     

      // console.log("FormData ==>", data);
      // for (var value of data.values()) {
      //   console.log('loop values==>', value);
      // }

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      api
        .post("scholarship-form/add", data, setLoading(true), config)
        .then((result) => {
          // console.log("Data Posted in DB");
          // console.log("Response==>", result);
          setLoading(false);
         
            window.alert("Document Uploaded!");
        })
        .catch((err) => {
          setLoading(false);
          window.alert("Connection Error!");

          // console.log("Error occured : ", err);
        });
    } else {
      setValidated(true);
      setLoading(false);
      // window.alert("Please upload pdf.");
    }
  };
  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>Scholarship Posting</h3>
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
              disabled
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >

              <CCol md={12}>
                <CFormLabel htmlFor="formFile">Upload Completed Document</CFormLabel>
                <DropzoneArea
                  required
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
          )}
        </CCardBody>
      </CCard>

      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(pdf, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

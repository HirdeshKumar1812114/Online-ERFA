import React, { useState, useEffect } from "react";
import Marking from './marking'

import { CContainer, CRow, CForm, CCol, CFormInput, CFormSelect, CFormLabel, CFormRange, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import RingLoader from "react-spinners/RingLoader";
import Alert from "@mui/material/Alert";
import { css } from "@emotion/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const override = css`
  margin: 0 auto;
`;

export default function SearchStudent(props) {
  const [scholarship, setScholarship] = useState('')
  const [regNo, setRegNo] = useState('')

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [valid, setValid] = useState("");
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });
  useEffect(() => {
    api.get("scholarship/all").then((res) => {
      // console.log('getPost=>', getPost)
      localStorage.setItem("posts", JSON.stringify(res.data));
      let posts = res.data;
      console.log('posts=>', posts)
      setPost(posts);
    });
  }, []);
  let history = useHistory();


  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false || scholarship == "" || regNo == "") {
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
        "interview/getstudentdetails",
        {
          studentId: regNo,
          scholarshipTitle: scholarship,
        },
        setLoading(true)
      )
      .then((result) => {
        // console.log(result.data.message)
        

        setValid("true");
        alert();
        setLoading(false);
        
        console.log(result)
        // props.history.push("view-users");

       
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
        setValid("notFound");
          alert()
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
      else if (valid == "notFound") { 
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
                Student record does exist!
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
    <CContainer fluid>
      <CCard style={{ "width": "40%", "margin": "0 auto" }}>
        <CCardHeader><h4>Search Student</h4></CCardHeader>
        <CCardBody>
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

              <CForm
                noValidate
                className="row g-3 needs-validation"
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={12}>
                  <CRow>
                    <CFormLabel htmlFor="registration" className="col-sm-4 col-form-label">Registration No. </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        value={regNo}
                        text="Enter the registration number of the student."
                        onChange={(e) => { setRegNo(e.target.value) }}
                        required

                      />

                    </CCol>
                  </CRow>
                </CCol>

                <CCol md={12}>
                  <CRow>
                    <CFormLabel htmlFor="title" className="col-sm-4 col-form-label">Scholarship title</CFormLabel>
                    <CCol sm={8}>

                      <CFormSelect
                        value={scholarship}
                        onChange={(e) => {
                          setScholarship(e.target.value)
                        }}
                        id="validationCustom04"
                        label="ScholarshipTitle"
                        required
                      >
                        <option >Select scholarship</option>
                        {post.map((value, key) => {
                          return (
                            <option value={value.title} >{value.title}</option>
                          )
                        })}
                      </CFormSelect>



                    </CCol>
                  </CRow>
                </CCol>


                <div className="d-grid gap-2">
                  <CButton type="submit" color="primary">Search</CButton>
                </div>
              </CForm>
            </CRow>
          )}
        </CCardBody>
      </CCard>

      {/* <prev >{JSON.stringify(scholarship, null, 2)}</prev>
      <prev >{JSON.stringify(regNo, null, 2)}</prev> */}


    </CContainer>

    // <Marking />

  );
}

import React, { useState, useEffect } from "react";
import Marking from './marking'
import Fade from 'react-reveal/Fade';
import { CContainer, CRow, CForm, CCol, CFormInput, CFormSelect, CFormLabel, CFormRange, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import RingLoader from "react-spinners/RingLoader";
import Alert from "@mui/material/Alert";
import { css } from "@emotion/react";
import axios from "axios";
const override = css`
  margin: 0 auto;
`;
import { useCookies } from 'react-cookie';

export default function App() {
  const [scholarship, setScholarship] = useState('')
  const [dataSubmited, setDataSubmited] = useState(false)
  const [regNo, setRegNo] = useState('')
  const [studentFound, setStudentFound] = useState(false)
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [valid, setValid] = useState("");
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false);
  const [userId, setUserId] = useCookies(['onlineerfa_admin_userId']);

  let [studentData, setStudentData] = useState({
    name: '',
    regNo: '',
    program: '',
    section: '',
    form: '',
    applicationId: '',
    pannelistId: '',
  })

  const pull_data = (data) => {
    console.log('data from Marking=>', data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    if (data == true) {
      setStudentFound(false)
    }
  }

  const [showSearch, setShowSearch] = useState(false);

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

        if (result.data.scholarship.emailSented == 'Yes') {
          console.log(result.data)
          setStudentData({
            name: `${result.data.studentdetails.firstname} ${result.data.studentdetails.lastname}`,
            regNo: result.data.studentdetails.regid,
            program: result.data.studentdetails.program,
            section: result.data.studentdetails.section,
            form: result.data.scholarship.form,
            applicationId: result.data.scholarship._id,
            pannelistId: userId.onlineerfa_admin_userId,
          })

          setValid("true");
          alert();
          setLoading(false);
          setStudentFound(true);
          setShowSearch(false)
          console.log(result)
          // props.history.push("view-users");
        }else{
          setLoading(false);
          setValid("notFound");
          alert()
        }



        if (result.message === 'Not Found') {
          setValid("notFound");
          alert()
        }
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
              SUCCESS - <strong>Evaluation done!</strong>
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

  const searchStudent = () => {
    return (
      <Fade bottom>
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
                          required
                          value={scholarship}
                          onChange={(e) => {
                            setScholarship(e.target.value)
                          }}
                        >
                          <option  selected="" value="">Select scholarship</option>
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
      </Fade >
    )
  }



  return (
    <CContainer fluid>
      {studentFound === false ?
        searchStudent()
        : <>
          <Fade top>

            <Marking
              name={studentData.name}
              regNo={studentData.regNo}
              program={studentData.program}
              section={studentData.section}
              form={studentData.form}
              applicationId={studentData.applicationId}
              pannelistId={studentData.pannelistId}
              func={pull_data}
            />
          </Fade>

        </>}

      {/* <prev >{JSON.stringify(scholarship, null, 2)}</prev>
       */}
      {/* <prev >{JSON.stringify(studentData, null, 2)}</prev> */}


    </CContainer>

    // 

  );
}

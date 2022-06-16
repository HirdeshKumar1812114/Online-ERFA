import React, { useState, useEffect } from "react";
import {
  CContainer,
  CButton,
  CCard,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CCardBody,
  CCardHeader,
  CBadge,
  CCol,
  CButtonGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CRow,
  CFormSelect
} from "@coreui/react";
import { useCookies } from 'react-cookie';

import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

const Layout = (props) => {
  const [visible, setVisible] = useState(false);
  const [getApplications, setApplications] = useState([]);
  const [deleteConfirm, setDelete] = useState(false);
  const [applicationtoDelete, setapplicationtoDel] = useState("");
  const [applicationtoUpdate, setapplicationtoUpdate] = useState("");
  const [applicationEmail, setapplicationEmail] = useCookies(['onlineerfa_admin_applicationEmail']);
  const [email, setEmail] = useState(applicationEmail.onlineerfa_admin_applicationEmail)
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')
  const [post, setPost] = useState([]);
  const [scholarship, setScholarship] = useState('')

  const [selectStatus, setSelectStatus] = useState('')


  var applications = [];
  const stautsBadge = (status) => {
    if (status === true) {
      return (
        <>
          <CBadge color="success">Evaluation Done!</CBadge>
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

  const checkPassword = () => {
    if (password != '') {
      console.log({ email, password });
      api.post('erfa/login', { email, password }).then(result => {
        setValid("true")
        alert()
        deleteapplication()


      }).catch(err => {
        // console.log(err)
        setValid("false")
        alert()
      })
    } else {
      setValid("fillForm")
      alert()
    }

  }
  const alert = () => {
    if (valid != "") {
      if (valid == "true") {
        return (
          <>
            <strong style={{ 'color': 'green' }}>   OK - application Verified. </strong>
          </>
        )
      }
      else if (valid == "false") {
        return (
          <strong style={{ 'color': 'red' }}> ERROR — Invalid Credentials!</strong>
        )
      }
      else {
        return (
          <strong style={{ 'color': 'orange' }}>ALERT — Please fill all fields!</strong>)
      }
    }
    else {
      return (
        <>
        </>)
    }
  }


  useEffect(() => {
    api.get("scholarship/all").then((res) => {
      // console.log('getPost=>', getPost)
      localStorage.setItem("posts", JSON.stringify(res.data));
      let posts = res.data;
      console.log('posts=>', posts)
      setPost(posts);
    });
  }, []);

  // useEffect(() => {
  //   api.get("scholarship-form/all").then((res) => {
  //     console.log('all Data=>',res.data)
  //     localStorage.setItem("all-applications", JSON.stringify(res.data));
  //     applications = res.data;
  //     console.log('1', applications)
  //     setApplications(res.data);
  //   });
  // }, []);



  useEffect(() => {
    if (scholarship != "") {
      api.post('scholarship-form/acceptedapplicationsscholarship', { scholarshipTitle: scholarship })
      .then(res => {
        localStorage.setItem("all-applications", JSON.stringify(res.data));
        applications = res.data;
        console.log('2', applications)
        setApplications(res.data);
      }).catch((err) => console.log(err))
    }
  }, [scholarship])

  // const showAll = () => {
  //   api.get("scholarship-form/all").then((res) => {
  //     // console.log(getapplications)
  //     localStorage.setItem("all-applications", JSON.stringify(res.data));
  //     applications = res.data;
  //     console.log('3', applications)
  //     setApplications(res.data);
  //   });
  // }
  const deleteapplication = () => {
    // console.log('application to delte: ',applicationtoDelete)
    api
      .delete(`officer/delete/${applicationtoDelete}`)
      .then((res) => {
        // console.log(res)
        // window.alert("application deleted.")
        setapplicationtoDel("");
        setDelete(false);
        setVisible(false);
        deleteConfirm(true)
      })
      .catch((err) => {
        // console.log(err)
        // window.alert("Error Occured");
        setapplicationtoDel("");
        setVisible(false);
      });
  };

  const applicationUpdate = () => {
    props.history.push("selected-evaluation");
  };



  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol md={4} sm={4}>
              <strong>
                <h3>All Evaluations</h3>
              </strong>
            </CCol>
            <CCol md={8} sm={8}>
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


                {/* <CFormSelect aria-label="Default select example" color="primary" onChange={(e) => { setSelectStatus(e.target.value) }}>
                  <option>Filter all applications</option>
                  <option value='accepted' >Accepted</option>
                  <option value='paused'>Paused</option>
                  <option value='rejected'>Rejected</option>
                  <option value='submitted'>Not Reviewed</option>



                </CFormSelect> */}
              </CCol>
              
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Name </CTableHeaderCell>
                <CTableHeaderCell scope="col">Student Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {getApplications.map((application, key) => {
                return (
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                    {`${application.studentdetails.firstname} ${application.studentdetails.lastname}  `}
                    </CTableHeaderCell>
                    <CTableDataCell>{application.studentdetails.regid}</CTableDataCell>
                    <CTableDataCell>{application.scholarshipdetails.applicationstart}</CTableDataCell>
                    <CTableDataCell style={{ 'color': 'red' }}>{application.scholarshipdetails.applicationdeadline}</CTableDataCell>
                    <CTableDataCell>{stautsBadge(application.acceptedForScholarship)}</CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <CButton
                          color="warning"
                          onClick={() => {
                            localStorage.setItem("viewPostUrl", application.scholarship);
                            localStorage.setItem("studentId", application.student);
                            localStorage.setItem("ScholarshipTitle", application.scholarshipdetails.title);

                            localStorage.setItem("student-details", JSON.stringify(application.studentdetails))
                            applicationUpdate();
                          }}
                        >
                          View
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>

          <CModal
            alignment="center"
            scrollable
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <CModalHeader>
              <CModalTitle>
                <strong>Delete application</strong>
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <b>
                Enter password for confirmation to delete this application.
              </b>
              <br />
              <br />
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">applicationname:</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={email} />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
              </div>
              {alert()}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton
                color="primary"
                onClick={() => {
                  checkPassword()
                }}
              >
                Confirm
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>

      </CCard>
    </CContainer>
  );
};

export default Layout;

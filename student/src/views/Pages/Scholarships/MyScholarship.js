import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Checkbox from 'rc-checkbox';
// import 'rc-checkbox/assets/index.css';

import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CBadge,
  CImage,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormCheck,
  CProgress,
  CProgressBar
} from "@coreui/react";
import { saveAs } from "file-saver";

import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

const override = css` y
  margin: 0 auto;
`;


const api = axios.create({
  baseURL: "http://localhost:5000/",
});
const Layout = (props) => {
  const viewPost = () => {
    props.history.push("selected-applications");
  }

  let [color, setColor] = useState("#49A54D");
  const [loading, setLoading] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [applied, setApplied] = useState([])
  const [scholarships, setScholarships] = useState([]);
  const [userRegID, setUserRegID] = useCookies([
    "onlineerfa_student_userRegID",
  ]);
  useEffect(() => {
    var regNo = localStorage.getItem('student_id')
     console.log(JSON.stringify(regNo))
    //  // console.log('regid=>',studentData.regid)
    api
      .post('student/appliedscholarships', { regid: userRegID.onlineerfa_student_userRegID })
      .then((res) => {
        setLoading(false)
        setApplied(res.data)
      })
      .catch((error) => {
        setLoading(false)

        // console.log(error)
      });

  }, [regNo]);

  useEffect(() => {
    let lengthofarry = applied.length
    // console.log(lengthofarry)
    for (let i = 0; i < lengthofarry; i++) {
      // console.log( applied[i])
      api
        .get(`scholarship/view/${applied[i]}`, setLoading(true))
        .then((res) => {
          setLoading(false)

          setScholarships((scholarships) => ([...scholarships, res.data]))
        })
        .catch((error) => {
          setLoading(false)

          // console.log(error)
        });
    }

  }, [applied]);

  return (
    <CContainer fluid>

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
          {scholarships.map((posts, key) => {
            return (
              <a style={{ 'text-decoration': 'none' }} onClick={() => {
                localStorage.setItem("viewPostUrl", posts._id);
                localStorage.setItem('ScholarshipTitle', posts.title);

                viewPost()
              }}>
                <CCard>
                  <CCardBody>
                    <CRow>
                      <CCol sm={10}>
                        <h3>
                          {posts.title}
                        </h3>
                        <p style={{ 'font-size': '18px', 'margin': '20px' }}>
                          Start Date: {posts.applicationstart} |
                          <span style={{ 'color': 'red' }}> End Date: {posts.applicationdeadline}</span>
                        </p>
                        {posts.tags.map((tag, i) => {
                          return (<CBadge color="info" shape="rounded-pill" style={{ 'margin': '4px' }}>{tag}</CBadge>)
                        })
                        }
                      </CCol>
                      <CCol sm={2}>
                        <CImage fluid src={`http://localhost:5000/getPoster/${posts.poster}`} />

                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
                <br />
              </a>
            )
          })}
        </>
      )}




      {/* <prev>{JSON.stringify(checkedPrograms, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/*
      
      <prev>{JSON.stringify(applied, null, 2)}</prev>
      <prev>{JSON.stringify(scholarships, null, 2)}</prev>
      <prev>{JSON.stringify(firstName, null, 2)}</prev>
      <prev>{JSON.stringify(lastName, null, 2)}</prev>
      <prev>{JSON.stringify(dob, null, 2)}</prev>
      <prev>{JSON.stringify(fatherName, null, 2)}</prev>
      <prev>{JSON.stringify(program, null, 2)}</prev>
      <prev>{JSON.stringify(section, null, 2)}</prev>
      <prev>{JSON.stringify(nic, null, 2)}</prev>
      <prev>{JSON.stringify(cellNumber, null, 2)}</prev>
      <prev>{JSON.stringify(mailingAddress, null, 2)}</prev>
      <prev>{JSON.stringify(permanentAddress, null, 2)}</prev>
      <prev>{JSON.stringify(userID.onlineerfa_student_userID, null, 2)}</prev>
      
      <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(poster, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

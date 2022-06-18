import React, { lazy, useState, useEffect } from "react";
import Flip from 'react-reveal/Flip';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCardText,
  CCol,
  CCardTitle,
  CContainer,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/",
});
import { useCookies } from 'react-cookie';

const Dashboard = (props) => {
  const [studentId, setStudentId] = useCookies(['onlineerfa_student_userRegID']);

  const [getPost, setPost] = useState([]);
  const [getResult, setResult] = useState([]);

  var posts = [];

  useEffect(() => {

    api.post("scholarship-form/acceptedapplicationsstudent",
      { regid: studentId.onlineerfa_student_userRegID })
      .then((res) => {
        console.log('getResult=>', res.data)
        localStorage.setItem("stdResult", JSON.stringify(res.data));
        setResult(res.data)
        // console.log('getResult=>', res.data)

      })
      .catch((err) => {
        console.log('getResultError=>', err)
      })

  }, [])

  useEffect(() => {
    api.get("scholarship/last3").then((res) => {
      console.log('getPost=>', res.data)
      // localStorage.setItem("posts", JSON.stringify(res.data));
      posts = res.data;
      // // console.log('posts=>', posts)
      setPost(res.data);
    });
  }, []);
  const viewPost = () => {
    props.history.push("scholarship/view-post");
  }

  return (
    <>
      <CContainer>
        {
          getResult.length != 0 ?
            <CCard>
              <CCardHeader>
                <h3>Your notice board</h3>
              </CCardHeader>
              <CCardBody>

                <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
                  {
                    getResult.map((posts, key) => {
                      return (
                        <>
                          { posts.acceptedForScholarship === true ?
                            <CCol xs>
                              <Flip left>
                                <CCard
                                  color={posts.scholarshipPercentage !== '0%' ? "success" : "danger"}
                                  textColor={"white"}
                                  className="mb-3"
                                  style={{ maxWidth: '18rem' }}
                                >
                                  <CCardHeader>Scholarship Result</CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>{posts.scholarshipdetails.title}</CCardTitle>
                                    <CCardText>
                                      {posts.scholarshipPercentage !== true ?
                                        <p>
                                          Congratulations you have been successful awared <span style={{ color: '#09014A', fontWeight: 'bold' }}>{posts.scholarshipPercentage}</span> % scholarship for your academic year 2022 - 2023.
                                        </p>
                                        :
                                        <p>
                                          We regret to inform you that you did not qualify for this scholarship for your academic year 2022 - 2023.
                                        </p>
                                      }


                                    </CCardText>
                                  </CCardBody>
                                </CCard>
                              </Flip>
                            </CCol>
                          :
                          <></>
                          }

                        </>
                      )
                    })
                  }
                </CRow>
              </CCardBody>
            </CCard>
            :
            <></>
        }
        <br />
        <br />


        <CCard>
          <CCardBody>
            <Flip left cascade>
              <h3>Latest Scholarships</h3>
            </Flip>
          </CCardBody>
          <CCardFooter>
            {/* <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardBody>
                </CCard>

                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <•••••••CButton href="#">Go somewhere</•••••••CButton>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow> */}

            <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
              {
                getPost.map((posts, key) => {
                  return (
                    <CCol xs>

                      <CCard className="h-100">
                        <Flip left>
                          <CCardImage
                            orientation="top"
                            src={`http://localhost:5000/getPoster/${posts.poster}`}
                          />
                        </Flip>
                        <CCardBody>
                          <CCardTitle>{posts.title}</CCardTitle>
                          <CCardText>
                            {posts.description.substring(0, 200)}... read more.
                          </CCardText>
                        </CCardBody>
                        <CCardFooter>
                          <CButton
                            onClick={() => {
                              localStorage.setItem("viewPostUrl", posts._id);
                              viewPost()
                            }}
                          >Quick Apply</CButton>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  )
                })
              }


            </CRow>
            <br></br>
            <br></br>

            <CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <CButton
                  color="primary"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    props.history.push("scholarship/list-posts");
                  }}
                >
                  View All Scholarships
                </CButton>
              </div>
            </CRow>
            <br></br>
            <br></br>
          </CCardFooter>
        </CCard>
      </CContainer>
    </>
  );
};

export default Dashboard;

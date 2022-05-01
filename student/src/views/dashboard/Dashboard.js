import React, { lazy, useState, useEffect } from "react";

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
<<<<<<< HEAD
  baseURL: "https://server.syedmustafaimam.com/",
=======
  baseURL: "https://5000-syedmustafai-onlineerfa-47btspgvx5g.ws-eu42.gitpod.io/",
>>>>>>> 776863cb2be79b28d1540dfd049d21aa58c623e1
});
const Dashboard = (props) => {

  const [getPost, setPost] = useState([]);
  var posts = [];

  useEffect(() => {
    api.get("scholarship/last3").then((res) => {
      // // console.log('getPost=>', getPost)
      localStorage.setItem("posts", JSON.stringify(res.data));
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
        <CCard>
          <CCardBody>
            <h3>Latest Scholarships </h3>
          </CCardBody>
          <CCardFooter>
            {/* <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage orientation="top" src="https://server.syedmustafaimam.com/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardBody>
                </CCard>

                <CCard className="h-100">
                  <CCardImage orientation="top" src="https://server.syedmustafaimam.com/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
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
                        <CCardImage
                          orientation="top"
                          src={`https://server.syedmustafaimam.com/getPoster/${posts.poster}`}
                        />
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

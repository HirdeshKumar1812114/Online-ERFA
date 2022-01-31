import React, { useState, useEffect } from "react";
import {
  CContainer,
  CButton,
  CCard,
  CImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CCardBody,
  CCardHeader,
  CCol,
  CButtonGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CRow,
} from "@coreui/react";
import { CBadge } from '@coreui/react'

import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const Layout = (props) => {
  const [visible, setVisible] = useState(false);
  const [getPost, setPost] = useState([]);
  const [deleteConfirm, setDelete] = useState(false);
  const [poststoDelete, setpoststoDel] = useState("");
  const [poststoUpdate, setpoststoUpdate] = useState("");

  var posts = [];

  useEffect(() => {
    api.get("scholarship/all").then((res) => {
      // console.log('getPost=>', getPost)
      localStorage.setItem("posts", JSON.stringify(res.data));
      posts = res.data;
      // console.log('posts=>', posts)
      setPost(res.data);
    });
  }, [deleteConfirm, visible]);



  const viewPost = () => {
    props.history.push("view-post");
  }
  return (
    <CContainer>
        {/* <CCardHeader>
          <strong>
            <h3>Scholarship Posts</h3>
          </strong>
        </CCardHeader> */}
        
          {/* <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tags</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {getPost.map((posts, key) => {
                return (
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      <CButton color="link" onClick={() => {
                        localStorage.setItem("viewPostUrl", posts._id);
                        viewPost()
                      }}>
                        {posts.title}
                      </CButton>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      {posts.tags.map((tag, i) => {
                        return (<CBadge color="info" shape="rounded-pill" style={{ 'margin': '4px' }}>{tag}</CBadge>)
                      })
                      }</CTableDataCell>
                    <CTableDataCell>{posts.applicationstart}</CTableDataCell>
                    <CTableDataCell>{posts.applicationdeadline}</CTableDataCell>

                    <CTableDataCell>
                      <CButtonGroup
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <CButton
                          color="warning"
                          style={{ width: "100px" }}
                          onClick={() => {
                            localStorage.setItem("viewPostUrl", posts._id);
                            postsUpdate();
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          style={{ width: "100px" }}
                          onClick={() => {
                            setVisible(!visible);
                            setpoststoDel(posts._id);
                          }}
                        >
                          Delete
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable> */}
          {getPost.map((posts, key) => {
            return (
              <>
      <CCard>

              <CCardBody>
              <CRow>
                <CCol sm={10}>
                 
                    <CButton color="link" onClick={() => {
                      localStorage.setItem("viewPostUrl", posts._id);
                      viewPost()
                    }}>
                      <h3>{posts.title}</h3> 
                    </CButton>
                  <p style={{'font-size': '18px', 'margin': '20px' }}>
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
<br/>

</>
            )
          })}

      
    </CContainer>
  );
};

export default Layout;

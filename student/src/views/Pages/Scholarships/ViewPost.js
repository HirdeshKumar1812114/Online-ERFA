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
      // // console.log('getPost=>', getPost)
      localStorage.setItem("posts", JSON.stringify(res.data));
      posts = res.data;
      // // console.log('posts=>', posts)
      setPost(res.data);
    });
  }, [deleteConfirm, visible]);



  const viewPost = () => {
    props.history.push("view-post");
  }
  return (
    <CContainer>
     
      {getPost.map((posts, key) => {
        return (
          <>
            <CCard>
              <CCardBody>
                <a style={{ 'text-decoration': 'none' }} onClick={() => {
                  localStorage.setItem("viewPostUrl", posts._id);
                  viewPost()
                }}>
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
                </a>
              </CCardBody>
            </CCard>
            <br />
          </>
        )
      })}


    </CContainer>
  );
};

export default Layout;

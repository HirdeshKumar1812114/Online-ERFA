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
  CCol,
  CButtonGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
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

  const deleteposts = () => {
    // console.log('posts to delte: ',poststoDelete)
    api
      .delete(`scholarship/delete/${poststoDelete}`)
      .then((res) => {
        // console.log(res)
        // window.alert("posts deleted.")
        setpoststoDel("");
        setDelete(false);
        setVisible(false);
      })
      .catch((err) => {
        // console.log(err)
        // window.alert("Error Occured");
        setpoststoDel("");
        setVisible(false);
      });
  };

  const postsUpdate = () => {
    props.history.push("update-post");
  };
  const viewPost = () => {
    props.history.push("view-post");
  }
  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>All Posts</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tags</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
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
          </CTable>

          <CModal
            alignment="center"
            scrollable
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <CModalHeader>
              <CModalTitle>
                <strong>posts Delete Confirmation</strong>
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete the selected posts!
              <br />
              If yes then press the confirm button.
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton
                color="primary"
                onClick={() => {
                  deleteposts();
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

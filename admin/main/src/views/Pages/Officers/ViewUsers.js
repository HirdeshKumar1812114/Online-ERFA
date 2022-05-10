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
import { useCookies } from 'react-cookie';

import axios from "axios";
const api = axios.create({
  baseURL: "https://server.syedmustafaimam.com/",
});

const Layout = (props) => {
  const [visible, setVisible] = useState(false);
  const [getUsers, setUsers] = useState([]);
  const [deleteConfirm, setDelete] = useState(false);
  const [usertoDelete, setUsertoDel] = useState("");
  const [usertoUpdate, setUsertoUpdate] = useState("");
  const [userEmail, setUserEmail] = useCookies(['onlineerfa_admin_userEmail']);
  const [email, setEmail] = useState(userEmail.onlineerfa_admin_userEmail)
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')

  var users = [];



  const checkPassword = () => {
    if (password != '') {
      console.log({ email, password });
      api.post('erfa/login', { email, password }).then(result => {
        setValid("true")
        alert()
        deleteUser()
        

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
            <strong style={{ 'color': 'green' }}>   OK - User Verified. </strong>
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
    api.get("officer/details").then((res) => {
      // console.log(getUsers)
      localStorage.setItem("userData", JSON.stringify(res.data));
      users = res.data;
      // console.log(users)
      setUsers(res.data);
    });
  }, [deleteConfirm, visible]);

  const deleteUser = () => {
    // console.log('user to delte: ',usertoDelete)
    api
      .delete(`officer/delete/${usertoDelete}`)
      .then((res) => {
        // console.log(res)
        // window.alert("User deleted.")
        setUsertoDel("");
        setDelete(false);
        setVisible(false);
        deleteConfirm(true)
      })
      .catch((err) => {
        // console.log(err)
        // window.alert("Error Occured");
        setUsertoDel("");
        setVisible(false);
      });
  };

  const userUpdate = () => {
    props.history.push("update-user");
  };

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>All Users</h3>
          </strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">User's Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {getUsers.map((user, key) => {
                return (
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      {user.firstname}{" "}{user.lastname}
                    </CTableHeaderCell>
                    <CTableDataCell>{user.designation}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <CButton
                          color="warning"
                          style={{ width: "100px" }}
                          onClick={() => {
                            localStorage.setItem("userUpdate", user._id);
                            userUpdate();
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          style={{ width: "100px" , "color":"white"}}
                          onClick={() => {
                            setVisible(!visible);
                            setUsertoDel(user._id);
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
                <strong>Delete User</strong>
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <b>
              Enter password for confirmation to delete this user.
              </b>
              <br />
              <br />
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Username:</label>
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

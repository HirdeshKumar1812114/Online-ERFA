import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
})




const Layout = (props) => {
  const [visible, setVisible] = useState(false)
  const [getUsers, setUsers] = useState([])
  const [deleteConfirm, setDelete] = useState(false)
  const [usertoDelete, setUsertoDel] = useState('')
  const [usertoUpdate, setUsertoUpdate] = useState('')

  var users = [];


  useEffect(() => {
    api.get('officer/details')
      .then(res => {
        setUsers(res.data)
        // console.log(getUsers)
        localStorage.setItem('userData', JSON.stringify(res.data));
        users = res.data
        // console.log(users)
      })
  }, [getUsers]);

  const deleteUser = () => {
    // console.log('user to delte: ',usertoDelete)
    api.delete(`officer/delete/${usertoDelete}`)
      .then(res => {
        // console.log(res)
        // window.alert("User deleted.")
        setUsertoDel("")
        setDelete(false)
        setVisible(false)
      }).catch(
        err => {
          // console.log(err)
          window.alert("Error Occured")
          setUsertoDel("")
        }
      )


  }

  const userUpdate = () => {    
    props.history.push('update-user')
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <strong><h3>All Users</h3></strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>

              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                getUsers.map((user, key) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{user.username}</CTableHeaderCell>
                      <CTableDataCell>{user.designation}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic mixed styles example">
                          <CButton color="warning" style={{ 'width': '100px' }}
                            onClick={() => {
                              localStorage.setItem('userUpdate', user._id);
                              userUpdate()
                            }}
                          >
                            Edit
                          </CButton>
                          <CButton color="danger" style={{ 'width': '100px' }}
                            onClick={() => {
                              setVisible(!visible)
                              setUsertoDel(user._id)
                            }}>
                            Delete
                          </CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>

                  )
                }
                )
              }

            </CTableBody>
          </CTable>

          <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle><strong>User Delete Confirmation</strong></CModalTitle>
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete the selected user!
              <br />
              If yes then press the confirm button.
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => { deleteUser() }}>Confirm</CButton>
            </CModalFooter>
          </CModal>

        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Layout

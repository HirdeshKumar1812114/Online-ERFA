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
  baseURL: "https://server.syedmustafaimam.com/",
});

const Layout = (props) => {
  const [visible, setVisible] = useState(false);
  const [getSchedule, setSchedule] = useState([]);
  const [deleteConfirm, setDelete] = useState(false);
  const [applicationtoDelete, setapplicationtoDel] = useState("");
  const [applicationtoUpdate, setapplicationtoUpdate] = useState("");
  const [applicationEmail, setapplicationEmail] = useCookies(['onlineerfa_admin_applicationEmail']);
  const [email, setEmail] = useState(applicationEmail.onlineerfa_admin_applicationEmail)
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')
  const [selectStatus, setSelectStatus] = useState('')
  let i=0;

  var applications = [];
 
  
 

// This will be used for sending emails.
//   useEffect(() => {
//     {api.post('scholarship-form/sortstatus', { status: 'accepted' })
//       .then(res => {
//         localStorage.setItem("all-applications", JSON.stringify(res.data));
//         applications = res.data;
//         setApplications(res.data);
//       }).catch((err) => console.log(err))}
//   }, [])

   useEffect(() => {
    {api.get('interview/getSchedule')
      .then(res => {
        // localStorage.setItem("all-applications", JSON.stringify(res.data));
        applications = res.data;
        console.log(applications)
        setSchedule(res.data);
   /*     console.log(applications[0].scholarshipdetails.title) 
        console.log(applications[1].scholarshipdetails.title) */
      }).catch((err) => console.log(err))}
  }, [])

  const sendEmails = () => {
    props.history.push("send-emails");
  };

  

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol md={4} sm={4}>
              <strong>
                <h3>All Schedules</h3>
              </strong>
            </CCol>
          
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Applicaiton title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Time</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Time</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Venue</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
             {getSchedule.map((application, key) => {
                return (
                  <CTableRow>
                
                    <CTableHeaderCell scope="row">
                  {application.scholarshipdetails.title}
                    </CTableHeaderCell>
                    <CTableDataCell>{application.startDate}</CTableDataCell>
                    <CTableDataCell style={{'color':'red'}}>{application.endDate}</CTableDataCell>
                    <CTableDataCell>{application.startTime}</CTableDataCell>
                    <CTableDataCell  style={{'color':'red'}}>{application.endTime}</CTableDataCell>
                    <CTableDataCell>{application.venue}</CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                       <CButton
                          color="warning"
                          onClick={() => {
                            localStorage.setItem("interviewId", application._id);
                            localStorage.setItem("interviewScholarshipId", application.scholarship);
                            localStorage.setItem("interviewScholarshipTitle", application.scholarshipdetails.title);
                            props.history.push('re-scheduling')
                          }}
                        >
                          Re-schedule
                        </CButton>
                        <CButton
                          color="success"
                          onClick={() => {
                            localStorage.setItem("interviewId", application._id);
                            localStorage.setItem("interviewScholarshipId", application.scholarship);
                            sendEmails();
                          }}
                          style={{'color':'white'}}
                        >
                          Send Emails
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                    
                  </CTableRow>
                );
              })} 
            </CTableBody>
          </CTable>
        </CCardBody>
    
      </CCard>
    </CContainer>
  );
};

export default Layout;

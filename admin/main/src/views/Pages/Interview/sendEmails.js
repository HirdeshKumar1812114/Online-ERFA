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
import { ApiOutlined } from "@mui/icons-material";
const api = axios.create({
    baseURL: "http://localhost:5000/",
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
    const [selectStatus, setSelectStatus] = useState('')
    const [getStudents, setStudents] = useState([]);

    var applications = [];
    const stautsBadge = (status) => {
        if (status === 'accepted') {
            return (
                <>
                    <CBadge color="success">Accepted</CBadge>
                </>
            )
        }
        else if (status === 'paused') {
            return (
                <>
                    <CBadge color="warning">Paused</CBadge>
                </>)
        }
        else if (status === 'rejected') {
            return (
                <>
                    <CBadge color="danger">Rejected</CBadge>
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

  

    useEffect(() => {
        api.post("scholarship-form/sorttitlestatus",{status: "accepted", title: localStorage.getItem("interviewScholarshipTitle") })
        .then((res) => {
            // console.log(getapplications)
            localStorage.setItem("all-applications", JSON.stringify(res.data));
            applications = res.data;
            console.log(res.data)
            setApplications(res.data);
        });
    }, []);

    let appendStudent = (student) => {
        if (!getStudents.includes(student) ) {
            setStudents((getStudents) => ([...getStudents, student]))
        }
    }

    useEffect(() => {
        let len = getApplications.length
        for (let i = 0; i < len; i++) {
            appendStudent(getApplications[i]._id)
            // 
        }
    }, [applications])

    // useEffect(() => {
    //     if (selectStatus != "") {
    //         api.post('scholarship-form/sortstatus', { status: selectStatus })
    //         .then(res => {
    //             localStorage.setItem("all-applications", JSON.stringify(res.data));
    //             applications = res.data;
    //             console.log('2', applications)
    //             setApplications(res.data);
    //         }).catch((err) => console.log(err))
    //     }
    // }, [selectStatus])

    const showAll = () => {
        api.get("scholarship-form/all").then((res) => {
            // console.log(getapplications)
            localStorage.setItem("all-applications", JSON.stringify(res.data));
            applications = res.data;
            console.log('3', applications)
            setApplications(res.data);
        });
    }
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
        props.history.push("selected-applicaiton");
    };

    const sendEmails = ()=>{
        console.log('localStorage.getItem("interviewId")=>',localStorage.getItem("interviewId"))
        console.log(getStudents);
        api.post('interview/selectinterviewee',{interview:localStorage.getItem("interviewId"),students:getStudents})
        .then((res) => {
            console.log(res)
            window.alert('Email Sent')
        }).catch((err) => console.log(err))
    }


    return (
        <CContainer>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md={8} sm={12}>
                            <strong>
                                <h3>{localStorage.getItem("interviewScholarshipTitle")}</h3>
                            </strong>
                        </CCol>
                        <CCol md={4} sm={12}>
                            <CButton color="success" style={{ "color": "white" }} onClick={() => { sendEmails() }} >Send interview confirmation email</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Student Id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Student Section</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {getApplications.map((application, key) => {

                                return (

                                    <CTableRow>
                                        <CTableHeaderCell scope="row">
                                            {application.studentdetails.firstname} {application.studentdetails.lastname}
                                        </CTableHeaderCell>
                                        <CTableDataCell>{application.studentdetails.regid}</CTableDataCell>
                                        <CTableDataCell>{application.studentdetails.section}</CTableDataCell>
                                        <CTableDataCell>{stautsBadge(application.status)}</CTableDataCell>
                                    </CTableRow>
                                );

                            })


                            }
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
                <prev>{JSON.stringify(getStudents, null, 2)}</prev>
            </CCard>
        </CContainer>
    );
};

export default Layout;

import React, { useState } from "react";
import validator from "validator";
import {
    CContainer,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormFeedback,
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import emailjs from '@emailjs/browser';
const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
    const [startDate,setStartDate] =useState('');
    const [endDate,setEndDate] =useState('');
    const [startTime,setStartTime] =useState('');
    const [endTime,setEndTime] =useState('');
    const [venue, setVenue] = useState('');
    const [scholarship, setScholarship] = useState('')
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState("");
    let [color, setColor] = useState("#49A54D");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const [toSend, setToSend] = useState({
        sendfirstname: '',
        sendlastname: '',
        senddesignation: '',
        sendemail: '',
        sendconfirmpass: '',


    });
    const emailSubString = "@szabist.pk";

    const api = axios.create({
        baseURL: "http://localhost:5000/",
    });


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (
            form.checkValidity() === false ||
            isMatched === false ||
            valid === "userExist"
        ) {
            event.preventDefault();
            event.stopPropagation();
            setValid("incomplete");
            alert();
        }

        if (password === confPass) {
            setIsMatched(true);
            submitData();
        } else {
            setIsMatched(false);
            event.preventDefault();
            event.stopPropagation();
            setValid("invalidPassword");
        }

        setValidated(true);
    };





    const submitData = () => {
        if (
            (firstName !== "" && lastName !== "" && password !== "",
                designation !== "" &&
                cellNumber !== "" &&
                email !== "" &&
                nic !== "" &&
                dob != "" &&
                isEmailMatch === true && isMatched === true && passQualityMsg === true
            )
        ) {
            api
                .post(
                    "officer/addofficer",
                    {
                        firstname: firstName,
                        lastname: lastName,
                        password,
                        designation,
                        cellNumber,
                        email,
                        nic,
                        dob,
                    },
                    setLoading(true)
                )
                .then((result) => {
                    // console.log(result.data.message)
                    if (result.data.message === "userAlreadyExisted") {
                        setLoading(false);
                        setValid("userExist");
                        alert();
                    } else {

                        setValid("true");
                        setFirstName("");
                        setLastName("");
                        setPassword("");
                        setDesignation("");
                        setCellNumber("");
                        setEmail("");
                        setNic("");
                        setDob("");
                        setRepassword("");
                        alert();
                        setLoading(false);
                        props.history.push("/officers/view-users");
                        // console.log(result)
                        alert();
                        props.history.push("view-users");

                        emailjs.send('service_9lp7w9p', 'template_ib9o549', toSend, 'user_LHyukq9RbaH7yE5Rz9zIQ')
                            .then((result) => {
                                console.log(result.text);
                            }, (error) => {
                                console.log(error.text);
                            });


                    }
                })
                .catch((err) => {
                    setLoading(false);
                    // console.log(err)
                    setValid("error");

                    alert();
                });
        } else {
            setValid("incomplete");
            alert();
        }
    };

    const alert = () => {
        if (valid != "") {
            if (valid == "true") {
                return (
                    <>
                        <br />
                        <br />
                        <Alert
                            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
                            severity="success"
                        >
                            SUCCESS - <strong>New ERFA user created successfully.</strong>
                        </Alert>
                        {/* <Redirect to='/' /> */}
                    </>
                );
            } else if (valid == "userExist") {
                return (
                    <>
                        <br />
                        <br />
                        <Alert
                            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
                            severity="error"
                        >
                            ERROR — <strong>User with this email is already existed!</strong>
                        </Alert>
                    </>
                );
            } else if (valid == "invalidPassword") {
                return (
                    <>
                        <br />
                        <br />
                        <Alert
                            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
                            severity="error"
                        >
                            ERROR — <strong>Password not matched!</strong>
                        </Alert>
                    </>
                );
            } else if (valid == "incomplete") {
                return (
                    <>
                        <br />
                        <br />

                        <Alert
                            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
                            severity="warning"
                        >
                            ALERT —{" "}
                            <strong>
                                {" "}
                                Invalid form, please fill all the fields properly!
                            </strong>
                        </Alert>
                    </>
                );
            }
        } else {
            return <></>;
        }
    };

    return (
        <CContainer fluid>
            <CCard>
                <CCardHeader>
                    <strong>
                        <h3>Interview Scheduling</h3>
                    </strong>
                </CCardHeader>
                <CCardBody>
                    {alert()}
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
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol md={12}>
                                <CFormLabel htmlFor="selectScholarship">Select Scholarship</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    value={scholarship}
                                    onChange={(e) => {
                                        setScholarship(e.target.value)
                                    }}
                                    required
                                >
                                    <option value="Merit">Merit</option>
                                    <option value="NeedBased">NeedBased</option>
                                    <option value="Sindh">Sindh</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="startDate">Interviews Start Date</CFormLabel>
                                <CFormInput
                                    required
                                    type="date"
                                    value={startDate}
                                    id="inputLastname4"
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="InterviewsEndDate">Interviews End Date</CFormLabel>
                                <CFormInput
                                    required
                                    type="date"
                                    value={endDate}
                                    id="inputLastname4"
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="startTime">Start Time</CFormLabel>
                                <CFormInput
                                    required
                                    type="time"
                                    value={startTime}
                                    id="inputLastname4"
                                    onChange={(e) => {
                                        setStartTime(e.target.value);
                                    }}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="endTime">End Time</CFormLabel>
                                <CFormInput
                                    required
                                    type="time"
                                    value={endTime}
                                    id="inputLastname4"
                                    onChange={(e) => {
                                        setEndTime(e.target.value);
                                    }}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="venue">Venue</CFormLabel>
                                <CFormInput
                                    required
                                    type="text"
                                    value={venue}
                                    onChange={(e) => {
                                        setVenue(e.target.value);
                                    }}
                                />
                            </CCol>
                           

                            <CCol xs={12}>
                                <CButton type="submit">Schedule Interviews</CButton>
                            </CCol>
                        </CForm>
                    )}
                </CCardBody>
            </CCard>
            <prev >{JSON.stringify(scholarship, null, 2)}</prev>
      <prev >{JSON.stringify(startDate, null, 2)}</prev>
      <prev >{JSON.stringify(endDate, null, 2)}</prev>
      <prev >{JSON.stringify(startTime, null, 2)}</prev>
      <prev >{JSON.stringify(endTime, null, 2)}</prev>
      <prev >{JSON.stringify(venue, null, 2)}</prev>
      
        </CContainer>
    );
};

export default Layout;

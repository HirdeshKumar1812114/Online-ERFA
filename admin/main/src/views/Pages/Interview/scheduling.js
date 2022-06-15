import React, { useState, useEffect } from "react";
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
const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venue, setVenue] = useState('');
    const [postId, setPostId] = useState('');

    const [scholarship, setScholarship] = useState('')
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [valid, setValid] = useState("");
    let [color, setColor] = useState("#49A54D");
    const [validated, setValidated] = useState(false);




    const api = axios.create({
        baseURL: "http://localhost:5000/",
    });
    useEffect(() => {
        api.get("scholarship/all").then((res) => {
            // console.log('getPost=>', getPost)
            localStorage.setItem("posts", JSON.stringify(res.data));
            let posts = res.data;
            console.log('posts=>', posts)
            setPost(posts);
        });
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (
            form.checkValidity() === false 
        ) {
            event.preventDefault();
            event.stopPropagation();
            setValid("incomplete");
            alert();
        } else {
            submitData();
        }

        setValidated(true);
    };





    const submitData = () => {
        api
            .post(
                "interview/schedule",
                {
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    venue,
                    scholarship,
                },
                setLoading(true)
            )
            .then((result) => {
                // console.log(result.data.message)


                setValid("true");
                setScholarship("");
                setStartTime("");
                setEndTime("");
                setStartDate("");
                setEndDate("");
                setVenue("")
                alert();
                setLoading(false);
                // props.history.push("/officers/view-users");
                // console.log(result)
                alert();
                // props.history.push("view-users");
            })
            .catch((err) => {
                setLoading(false);
                // console.log(err)
                setValid("error");

                alert();
            });

    }

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
                            SUCCESS - <strong>New scehedule created successfully.</strong>
                        </Alert>
                        {/* <Redirect to='/' /> */}
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
            {/* {console.log(post)} */}
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
                                <CFormLabel htmlFor="selectScholarship">Scholarship Title</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    value={scholarship}
                                    onChange={(e) => {
                                        setScholarship(e.target.value)
                                    }}
                                    required
                                >
                                    <option >Select scholarship</option>
                                    {post.map((value, key) => {
                                        return (
                                            <option value={value._id} >{value.title}</option>
                                        )
                                    })}
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
            {/* <prev >{JSON.stringify(postId, null, 2)}</prev>
            <prev >{JSON.stringify(scholarship, null, 2)}</prev> */}
                
                </CCardBody>
            </CCard>

            {/* <prev >{JSON.stringify(scholarship, null, 2)}</prev>
            <prev >{JSON.stringify(startDate, null, 2)}</prev>
            <prev >{JSON.stringify(endDate, null, 2)}</prev>
            <prev >{JSON.stringify(startTime, null, 2)}</prev>
            <prev >{JSON.stringify(endTime, null, 2)}</prev>
            <prev >{JSON.stringify(venue, null, 2)}</prev> */}

        </CContainer>
    );
};

export default Layout;

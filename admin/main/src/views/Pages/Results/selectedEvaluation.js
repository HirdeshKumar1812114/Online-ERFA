import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Checkbox from 'rc-checkbox';

import {
    CContainer,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CFormCheck,
    CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
    CBadge,
    CRow
} from "@coreui/react";

import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

const override = css`
  margin: 0 auto;
`;

const api = axios.create({
    baseURL: "http://localhost:5000",
});

const Layout = (props) => {

    let [color, setColor] = useState("#49A54D");

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [pdf, setPdf] = useState('');
    const [applicationComplete, setApplicationComplete] = useState('');
    const [status, setStatus] = useState('notreviewed');

    const [disabled, setDisabled] = useState(false);
    const [formName, setFormName] = useState('');
    const [yourMessage, setYourMessage] = useState('');
    const [officerMessage, setOfficerMessage] = useState('');
    const [applicationId, setApplicationId] = useState('');

    const [studentName, setName] = useState('')
    const [regid, setregid] = useState('')
    const [getRemarks, setRemarks] = useState([])
    const [checkInterview, setCheckInterview]= useState(false)
    const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);

    var remarks=[];
    useEffect(() => {
        api.
            post('scholarship-form/applicationform', { scholarship: localStorage.getItem("viewPostUrl"), student: localStorage.getItem("studentId") },
                setLoading(true)).
            then((res) => {
                let { form, status, messageStudent, messageOfficer, _id } = res.data
                console.log(res.data)
                setPdf(form)
                setFormName(form)
                setStatus(status)
                setApplicationId(res.data._id)
                setYourMessage(messageStudent)
                setOfficerMessage(messageOfficer)
                setApplicationId(_id)
                setLoading(false)
            })
            let {firstname, lastname, regid} = JSON.parse(localStorage.getItem("student-details"))
            setName(`${firstname} ${lastname}`)
            setregid(regid)
    }, [title])

    useEffect(() => {
        if(applicationId!=""){api.post('interview/getallremarksapplication', { application:applicationId })
          .then(res => {
              
       console.log(res.data);
        remarks=res.data;
        setCheckInterview(true)
        setRemarks(res.data);
          console.log("Record 0",res.data[0])
          console.log("Record 1",res.data[0].erfadetails.email)
          }).catch((err) => console.log(err))}
      }, [applicationId])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // if (pdf.length == 0) {
        //   event.stopPropagation();
        //   setValidated(true);
        // } else {

        // }
        setValidated(false);
        submitData();
    };



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

    const submitData = () => {
        console.log('pdf1==>', pdf);
        let scholarshipID = localStorage.getItem("viewPostUrl")
        console.log(JSON.parse(JSON.stringify(scholarshipID)));
        console.log(userID.onlineerfa_student_userID)

        var data = new FormData();
        data.append('messageOfficer', officerMessage)
        data.append('status', status)

        // console.log("FormData ==>", data);
        // for (var value of data.values()) {
        //   console.log('loop values==>', value);
        // }

        const config = {
            headers: { "content-type": "multipart/form-data" },
        };

        api
            .put(`scholarship-form/sendofficer/${applicationId}`, { messageOfficer: officerMessage, status: status }, setLoading(true), config)
            .then((result) => {
                // console.log("Data Posted in DB");
                // console.log("Response==>", result);
                setLoading(false);
                console.log(result.data)
                window.alert("Evaluation done!");
                props.history.push('applications')
            })
            .catch((err) => {
                setLoading(false);
                window.alert("Connection Error!");

                // console.log("Error occured : ", err);
            });

    };
    return (
        <CContainer fluid>
            <CCard>
                <CCardHeader>
                    <strong>
                        <h3>{localStorage.getItem('ScholarshipTitle')} - Form </h3>
                    </strong>
                </CCardHeader>
                <CCardBody>
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
                        <>
                        <CRow>
                            <CCol md={6}>Student Name: <span style={{'fontWeight':'bold'}}>{studentName}</span></CCol>
                            <CCol md={6}> Registration Id: <span style={{'fontWeight':'bold'}}>{regid}</span></CCol>
                        </CRow>
                        <br></br>
                        <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Panelist Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
                <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
             
              </CTableRow>
            </CTableHead>  
            <CTableBody>
            {getRemarks.map((remark,key) => {   
    return(  
        
               <CTableRow>
  <CTableDataCell>{`${remark.erfadetails.firstname} ${remark.erfadetails.lastname}`}</CTableDataCell>
  <CTableDataCell>{remark.erfadetails.designation}</CTableDataCell>
  <CTableDataCell>{remark.score}</CTableDataCell>
  <CTableDataCell>{remark.remark}</CTableDataCell>
               </CTableRow>
            
            );}   )}
            </CTableBody> 
                       </CTable> 
                        <br></br>
                            <>
                                <br />
                                <CForm
                                    disabled
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <CRow className="mb-3">

                                    </CRow>

                                 

                                    {formName == '' || !formName || formName == undefined ?
                                        <span style={{ 'color': 'red' }}>
                                            Form Not uploaded
                                        </span>
                                        :
                                        <>
                                            <CCol md={12}>
                                                {/* <PDFViewer
                                                    document={{
                                                        url: 'http://localhost:5000/getForm/form_1646489636119.pdf',
                                                    }}
                                                /> */}
                                                {/* <iframe src="http://localhost:5000/getForm/form_1646489636119.pdf" width="100%" height="500px">
                                                </iframe> */}
                                                Open the file <a href={`http://localhost:5000/getForm/${formName}`} target='_blank'>{formName}</a>
                                            </CCol>
                                        </>

                                    }
                                    <CCol md={12}>
                                        <CFormLabel htmlFor="formFile">Update status:</CFormLabel>
                                        <CFormSelect aria-label="Default select example" onChange={(e) => { setStatus(e.target.value) }}>
                                            <option >Select status</option>
                                            <option value="accepted">Accept Application</option>
                                            <option value="paused">Pause Application</option>
                                            <option value="rejected" >Reject Applicaiton</option>
                                        </CFormSelect>
                                    </CCol>
                                    <br />
                                    <br />
                                    <CButton type="submit" color="primary">
                                        Update Evaluation Form
                                    </CButton>
                                </CForm>
                            </>
                        </>
                    )}
                </CCardBody>
            </CCard>

            {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
            {/* <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(yourMessage, null, 2)}</prev>
      <prev>{JSON.stringify(pdf, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
    <prev>{JSON.stringify(applicationId, null, 2)}</prev> 
        </CContainer>
    <prev>{JSON.stringify(tags, null, 2)}</prev> */}
     
     <prev>{JSON.stringify(checkInterview, null, 2)}</prev>
        </CContainer>
        
    );
};

export default Layout;

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Checkbox from 'rc-checkbox';
// import 'rc-checkbox/assets/index.css';

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
  CFormTextarea,
  CFormCheck
} from "@coreui/react";
import { saveAs } from "file-saver";

import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

const override = css` y
  margin: 0 auto;
`;

import ExampleDoc from 'assets/files/need-based.pdf'

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const Layout = (props) => {
  const downloadFile = () => {
    window.location.href = ExampleDoc
  }
  const saveFile = () => {
    saveAs(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "example.pdf"
    );
  }
  let [color, setColor] = useState("#49A54D");

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [applicationstart, setApplicationStart] = useState("");
  const [applicationdeadline, setApplicationEnd] = useState("");
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [checkedPrograms, setPorgrams] = useState([]);
  const [tags, setTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const programs = ['BBA', 'BEME', 'BABS', 'BS-BIO', 'BS-BIOTECH', 'BS-ENTRE', 'BSAF', 'BSCS', 'BSAI', 'BSMS', 'BSSS', 'MA-EDU', 'MBA-EVE-36', 'MBA-EVE-72', 'MSMD', 'MSPM', 'PhD-BIO', 'MS-Mecha', 'MSCS', 'MSMS', 'PhDMS', 'MSPH', 'MSSS', 'PhDSS']

  //Scholarship Form
  const [regNo, setRegNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [program, setProgram] = useState('');
  const [section, setSection] = useState('');
  const [nic, setNic] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    api
      .get(`student/find/${userID.onlineerfa_student_userID}`, setLoading(true))
      .then((res) => {
        setRegNo(res.data.regid)
        setFirstName(res.data.firstname)
        setLastName(res.data.lastname)
        setFatherName(res.data.fathername)
        setDob(res.data.dob)
        setSection(res.data.section)
        setProgram(res.data.program)
        setPermanentAddress(res.data.permanentaddress)
        setMailingAddress(res.data.mailingaddress)
        setEmail(res.data.email)
        setCellNumber(res.data.cellnumber)
        setLoading(false)
      })
      .catch((error) => console.log(error));

  }, [regNo]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false || checkedPrograms.length == 0) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      submitData();
    }
  };

  const onChange = (e) => {
    let { checked, value } = e.target
    // console.log('Checkbox checked:', (checked));
    // console.log('Value', value);

    if (checked == true) {
      setPorgrams((checkedPrograms) => ([...checkedPrograms, e.target.value]))
    }
    else {
      const arr = checkedPrograms.filter((item) => item !== value);
      setPorgrams(arr);
    }
  }

  const toggle = () => {
    setDisabled(!disabled)
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const submitData = () => {
    //  console.log('poster1==>',poster);
    // console.log('poster.length==>',);
    // console.log(checkedPrograms.length);
    if (poster.length !== 0) {
      var data = new FormData();
      data.append("poster", poster[0]);
      data.append("title", title);
      data.append("applicationstart", applicationstart);
      data.append("applicationdeadline", applicationdeadline);
      data.append("eligibility", eligibility);
      data.append("description", description);
      data.append("tags", tags);
      data.append("checkedPrograms", checkedPrograms)

      // console.log("FormData ==>", data);
      // for (var value of data.values()) {
      //   console.log('loop values==>', value);
      // }

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      api
        .post("scholarship/add", data, setLoading(true), config)
        .then((result) => {
          // console.log("Data Posted in DB");
          // console.log("Response==>", result);
          setLoading(false);
          if (result.data.message == "alreadExisted") {
            window.alert("Scholarship with this title already exist!");
          } else {
            window.alert("Scholarship posted!");
            setTitle("");
            setApplicationStart("");
            setApplicationEnd("");
            setPoster("");
            setDescription("");
            setEligibility("");
            setTags("");
            setValidated(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          window.alert("Connection Error!");

          // console.log("Error occured : ", err);
        });
    } else {
      setValidated(true);
      setLoading(false);
      // window.alert("Please upload poster.");
    }
  };
  return (
    <CContainer fluid>
      <CCard>
        <CCardHeader>
          <strong>
            <h3>{localStorage.getItem('ScholarshipTitle')} Form</h3>
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
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >

              <CCol md={6}>
                <CFormLabel htmlFor="firstName">
                  Student Name
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={firstName}
                  id="firstName"
                  type="text"

                />
              </CCol>


              <CCol md={6}>
                <CFormLabel htmlFor="">
                  Father Name
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={fatherName}
                  id="fatherName"
                  type="text"

                />
              </CCol>


              <CCol md={6}>
                <CFormLabel htmlFor="regNo">Registration Number</CFormLabel>
                <CFormInput
                  readOnly
                  type="text"
                  placeholder="1812XXX"
                  pattern="[0-9]*"
                  maxlength="7"
                  id="regNo"

                  value={regNo}
                />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                <CFormInput
                  readOnly
                  value={email}
                  type="email"
                  id="inputEmail"
                  placeholder="xyz@szabist.pk"
                />

              </CCol>



              <CCol md={6}>
                <CFormLabel htmlFor="dob">
                  Date of Birth
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={dob}
                  id="dob"
                  type="date"

                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="program">
                  Program
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={program}
                  id="program"
                  type="text"

                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="section">
                  Section
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={section}
                  id="section"
                  type="text"

                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="cellNumber">
                  Cell Number
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={cellNumber}
                  id="cellNumber"
                  type="text"
                  placeholder="0303XXXXXXX"
                  pattern="[0-9]*"
                  maxlength="11"

                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="mailingAddress">
                  Mailing Address
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={mailingAddress}
                  id="mailingAddress"
                  type="text"

                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor=" permanentAddress}">
                  Permanent Address
                </CFormLabel>
                <CFormInput
                  readOnly
                  value={permanentAddress}
                  id="permanentAddress"
                  type="text"

                />
              </CCol>
              <CFormCheck id="flexCheckChecked" label="Confirm that all the details are updated!" defaultChecked />
              <CCol md={12} >
                <a href={ExampleDoc} download="MyExampleDoc" target='_blank'>
                  <CButton color="primary">
                    Download Applicaion Form
                  </CButton>
                </a>
              </CCol>

            </CForm>
          )}
        </CCardBody>
      </CCard>


      {/* <prev>{JSON.stringify(checkedPrograms, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/*
      
      <prev>{JSON.stringify(regNo, null, 2)}</prev>
      <prev>{JSON.stringify(firstName, null, 2)}</prev>
      <prev>{JSON.stringify(lastName, null, 2)}</prev>
      <prev>{JSON.stringify(dob, null, 2)}</prev>
      <prev>{JSON.stringify(fatherName, null, 2)}</prev>
      <prev>{JSON.stringify(program, null, 2)}</prev>
      <prev>{JSON.stringify(section, null, 2)}</prev>
      <prev>{JSON.stringify(nic, null, 2)}</prev>
      <prev>{JSON.stringify(cellNumber, null, 2)}</prev>
      <prev>{JSON.stringify(mailingAddress, null, 2)}</prev>
      <prev>{JSON.stringify(permanentAddress, null, 2)}</prev>
      <prev>{JSON.stringify(userID.onlineerfa_student_userID, null, 2)}</prev>
      
      <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(poster, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

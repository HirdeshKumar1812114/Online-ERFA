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
  CFormCheck,
  CProgress,
  CProgressBar
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
  const [studentData, setStudentData] =useState('')
  useEffect(() => {
   setStudentData(localStorage.getItem('student_info')))
   console.log(JSON.parse(JSON.stringify(studentData)))
    api
      .post('student/appliedscholarships',{regid:regNo}, setLoading(true))
      .then((res) => {
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
        {console.log(localStorage.getItem('student_info'))}
      <CCard>
        <CCardHeader>
     
          <strong>
            <h3> My Scholarship</h3>
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
            </>
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

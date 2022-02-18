import React, { useState } from "react";

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

import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

const override = css`
  margin: 0 auto;
`;



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
    if (poster.length !== 0 ) {
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
            <h3>Scholarship Posting</h3>
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
              <CCol md={12}>
                <CFormLabel htmlFor="title">Title</CFormLabel>
                <CFormInput
                  required
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputDob">
                  Applicaiton starting date
                </CFormLabel>
                <CFormInput
                  required
                  value={applicationstart}
                  id="inputStartDate"
                  type="date"
                  onChange={(e) => {
                    setApplicationStart(e.target.value);
                  }}
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputDob">
                  Applicaiton ending date
                </CFormLabel>
                <CFormInput
                  required
                  value={applicationdeadline}
                  id="inputEndDate"
                  type="date"
                  onChange={(e) => {
                    setApplicationEnd(e.target.value);
                  }}
                />
              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                  required
                  id="description"
                  rows="5"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                ></CFormTextarea>
              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="description">Eligibility</CFormLabel>
                <CFormTextarea
                  required
                  id="description"
                  rows="3"
                  onChange={(e) => {
                    setEligibility(e.target.value);
                  }}
                  value={eligibility}
                ></CFormTextarea>
                <CFormLabel htmlFor="description">Check only those programs which are elegible for this scholarship</CFormLabel>
                <br></br>
                {programs.map((values) => {
                  return (
                    <>
                      <label>
                        <Checkbox
                          name="my-checkbox"
                          // defaultChecked
                          onChange={onChange}
                          disabled={disabled}
                          value={values}
                        />
                        &nbsp; {values}&nbsp;&nbsp;&nbsp;
                      </label>
                    </>
                  )
                })}
                {/* <label>
                <Checkbox
                  name="my-checkbox"
                  // defaultChecked
                  onChange={onChange}
                  disabled={disabled}
                  value="BBA"
                />
                &nbsp; BBA
                </label> */}

                {/* <button onClick={toggle}>Check and Uncheck all</button> */}

              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="inputDob">Tags</CFormLabel>
                <CFormInput
                  required
                  value={tags}
                  id="inputStartDate"
                  type="text"
                  onChange={(e) => {
                    let next = e.target.value.split(",");
                    setTags(next);
                  }}
                />
              </CCol>
              <br />
              <br />

              <CCol md={12}>
                <CFormLabel htmlFor="formFile">Load Poster Image</CFormLabel>
                <DropzoneArea
                  required
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => {
                    // console.log("Files:", files);
                    setPoster(files);
                  }}
                />
              </CCol>
              <br />
              <br />
              <br />
              {validated == true ? (
                <>
                  <span style={{ "font-size": "14px", color: "red" }}>
                    *Please fill all the fields and upload a poster!
                  </span>
                </>
              ) : (
                <></>
              )}
              <CButton type="submit" color="primary">
                Post Scholarship
              </CButton>
            </CForm>
          )}
        </CCardBody>
      </CCard>
      {/* <prev>{JSON.stringify(checkedPrograms, null, 2)}</prev> */}

      {/* <prev>{JSON.stringify(validated, null, 2)}</prev> */}
      {/* <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(poster, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

import React, { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Checkbox from 'rc-checkbox';

import {
  CContainer,
  CButton,
  CCard,
  CModal,
  CCardBody,
  CCardHeader,
  CImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CFormCheck
} from "@coreui/react";
import Alert from "@mui/material/Alert";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { CBadge } from "@coreui/react";
import CheckUser from 'components/CheckUser'

const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [applicationstart, setApplicationStart] = useState("");
  const [applicationdeadline, setApplicationDeadline] = useState("");
  const [poster, setPoster] = useState([]);
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [visible, setVisible] = useState(null);
  const [checkedPrograms, setPorgrams] = useState([]);
  const [checkedProgramsGet, setPorgramsGet] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [isChanged, setIsChanged] = useState(false)
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#49A54D");
  const [validated, setValidated] = useState(false);
  const [userValid, setUserValid] = useState(null)
  const programs = ['BBA', 'BEME', 'BABS', 'BS-BIO', 'BS-BIOTECH', 'BS-ENTRE', 'BSAF', 'BSCS', 'BSAI', 'BSMS', 'BSSS', 'MA-EDU', 'MBA-EVE-36', 'MBA-EVE-72', 'MSMD', 'MSPM', 'PhD-BIO', 'MS-Mecha', 'MSCS', 'MSMS', 'PhDMS', 'MSPH', 'MSSS', 'PhDSS']

  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });


  useEffect(() => {
    api
      .get(
        `scholarship/view/${localStorage.getItem("viewPostUrl")}`,
        setLoading(true)
      )
      .then((res) => {
        // console.log(res.data)
        setId(res.data._id);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setEligibility(res.data.eligibility);
        setApplicationStart(res.data.applicationstart);
        setApplicationDeadline(res.data.applicationdeadline);
        setPoster(res.data.poster);
        setImageName(res.data.poster);
        setTags(res.data.tags);
        setLoading(false);
        setPorgramsGet(res.data.checkedPrograms.split(","))
      })
      .catch((error) => console.log(error));
  }, []);


  const checkUser = (value) => {
    setUserValid(value)
  }

  useEffect(() => {
    if (userValid == true) {
      updateData();
    }
  })

  const setVis = (value) => {
    // console.log({value});
    setVisible(value)
  }

  const onChange = (e) => {
    let { checked, value } = e.target
    // console.log('Checkbox checked:', (checked));
    // console.log('Value', value);

    if (checked == true) {
      setPorgramsGet((checkedProgramsGet) => ([...checkedProgramsGet, e.target.value]))
      setIsChanged(true)
    }
    else {
      const arr = checkedProgramsGet.filter((item) => item !== value);
      setPorgramsGet(arr);
      setIsChanged(true)

    }
  }

  const toggle = () => {
    setDisabled(!disabled)
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      setValidated(false);
      setVisible(!visible);
    }
  };

  const updateData = () => {
    //  console.log('poster1==>',poster);
    //  console.log('poster.length==>',);
    if (isChanged == true || isPostEmpty(poster) == false || checkedPrograms.length != 0) {
      var data = new FormData();
      data.append("poster", poster[0]);
      data.append("title", title);
      data.append("applicationstart", applicationstart);
      data.append("applicationdeadline", applicationdeadline);
      data.append("eligibility", eligibility);
      data.append("description", description);
      data.append("tags", tags);
      data.append("checkedPrograms", checkedProgramsGet)

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      api
        .put(
          `scholarship/edit/${localStorage.getItem("viewPostUrl")}`,
          data,
          setLoading(true),
          config
        )
        .then((result) => {
          for (var value of data.values()) {
            // console.log('Values=>',value);
          }

          // console.log("Response==>", result);
          setLoading(false);
          if (result.data.message == "alreadExisted") {
            window.alert("Scholarship with this title already exist!");
          } else {
            setLoading(false);

            // window.alert("Scholarship updated!");

            props.history.push("view-post");
          }
        })
        .catch((err) => {
          setLoading(false);
          window.alert("Connection Error!");
          // console.log("Error occured : ", err);
        });
    } else {
      window.alert("Nothing Updated!")
      props.history.push("view-post");
    }
  }
  const isPostEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  return (

    <CContainer fluid>
      {
        console.log('CheckProg=>', checkedProgramsGet)

      }
      <CCard>
        {loading == true && (poster == "" || poster == "undifined") ? (
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
            <CCardHeader>
              <strong>
                <h3 style={{ margin: "20px" }}>{title}</h3>
                <p style={{ margin: "20px" }}>
                  Application Starts: {applicationstart} | Application Deadline:{" "}
                  {applicationdeadline}
                </p>
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
                        setIsChanged(true)
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
                        setIsChanged(true)
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
                        setApplicationDeadline(e.target.value);
                        setIsChanged(true)
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
                        setIsChanged(true)

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
                        setIsChanged(true)

                      }}
                      value={eligibility}
                    ></CFormTextarea>

                    <CFormLabel htmlFor="description">Check only those programs which are elegible for this scholarship</CFormLabel>
                    <br></br>

                    {
                      checkedProgramsGet.length !== 0 ?
                        programs.map((values) => {

                          if (checkedProgramsGet.find(val => val === values)) {

                            return (
                              <>
                                <label>
                                  <Checkbox
                                    name="my-checkbox"
                                    defaultChecked
                                    onChange={onChange}
                                    disabled={disabled}
                                    value={values}
                                  />
                                  &nbsp; {values}&nbsp;&nbsp;&nbsp;
                                </label>
                              </>
                            )

                          } else {
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
                          }
                        }


                        )

                        :
                        <></>
                    }


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
                        setIsChanged(true)

                      }}
                    />
                  </CCol>
                  <br />
                  <br />

                  <CCol md={6}>
                    <CFormLabel htmlFor="formFile">Existing Poster</CFormLabel>
                    {
                      <CImage
                        fluid
                        src={`http://localhost:5000/getPoster/${imageName}`}
                      />
                    }
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="formFile">
                      Load Poster Image
                    </CFormLabel>
                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      dropzoneText={"Update image"}
                      onChange={(files) => {
                        // console.log("Files:", files);

                        setPoster(files) ? setIsChanged(true) : setIsChanged(false);

                      }}
                    />
                  </CCol>
                  <br />
                  <br />
                  <br />
                  {validated == true ? (
                    <>
                      <span style={{ "font-size": "14px", color: "red" }}>
                        *Please fill all fields!
                      </span>
                    </>
                  ) : (
                    <></>
                  )}

                  <CButton type="submit" color="success">
                    <span style={{ color: "white" }}>Update Scholarship</span>
                  </CButton>
                </CForm>
              )}

              <CModal
                alignment="center"
                scrollable
                visible={visible}
                onClose={() => setVisible(false)}
              >
                <CheckUser
                  title="Update Post"
                  description="Enter password for confirmation to update scholarship post."
                  action='update'
                  chkUser={checkUser}
                  setModel={setVis}
                />
              </CModal>
            </CCardBody>
          </>
        )}
      </CCard>



      {/* 
      <prev>{JSON.stringify(validated, null, 2)}</prev>
      <prev>{JSON.stringify(checkedProgramsGet, null, 2)}</prev>
      <prev>{JSON.stringify(isChanged, null, 2)}</prev>
      <prev>{JSON.stringify(poster, null, 2)}</prev>
      <prev>{JSON.stringify(isPostEmpty(poster), null, 2)}</prev>
      <prev>{JSON.stringify(applicationstart, null, 2)}</prev>
      <prev>{JSON.stringify(applicationdeadline, null, 2)}</prev>
      <prev>{JSON.stringify(description, null, 2)}</prev>
      <prev>{JSON.stringify(eligibility, null, 2)}</prev>
      <prev>{JSON.stringify(tags, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

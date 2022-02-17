import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CImage,
  CButton,

  CCol,
} from "@coreui/react";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import axios from "axios";
import { CBadge } from '@coreui/react'

const override = css`
  margin: 0 auto;
`;

const Layout = (props) => {
  const [title, setTitle] = useState("");
  const [applicationstart, setApplicationStart] = useState("");
  const [applicationdeadline, setApplicationDeadline] = useState("");
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [eligibilityArr, setEligibilityArr] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [poststoDelete, setpoststoDel] = useState("");
  const [userID, setUserID] = useCookies(["onlineerfa_student_userID"]);
  const [visible, setVisible] = useState(false);
  const [scholarshipId, setScholarshipId]= useState("");
  const [studentId, setStudentId] = useState("");
  const [studentProgram,setStudentProgram] = useState("");
  const [studentEligibility, setStudentEligibility] = useState(false);

  let [color, setColor] = useState("#49A54D");

  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  useEffect(() => {
    api
      .get(`scholarship/view/${localStorage.getItem("viewPostUrl")}`, setLoading(true))
      .then((res) => {
        setScholarshipId(res.data._id)
        setStudentId(userID.onlineerfa_student_userID)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setEligibility(res.data.eligibility)
        setApplicationStart(res.data.applicationstart)
        setApplicationDeadline(res.data.applicationdeadline)
        setPoster(res.data.poster)
        setTags(res.data.tags)
        setLoading(false)
        setEligibilityArr(eligibility.split(/\r/))
        getStudentProgram()
      })
      .catch((error) =>  console.log(error));

  }, [eligibility]);

  const checkStudentScholarshipEligibilty=()=>{
    api
    .post(`student_scholarship/check_eligibility`,{program:studentProgram,scholarship:scholarshipId})
    .then((result)=>{

 if(result.data.message==='User is Eligible')
{
  console.log('User is Eligible')
  setStudentEligibility(true)
  console.log(studentEligibility)
}else{
  setStudentEligibility(false)
  console.log(studentEligibility)
}
    })
    .catch((error) => console.log(error));
  }
  const deleteposts = () => {
    // // console.log('posts to delte: ',poststoDelete)
    api
      .delete(`scholarship/delete/${poststoDelete}`)
      .then((res) => {
        // // console.log(res)
        // window.alert("posts deleted.")
        setpoststoDel("");
        props.history.push("list-posts");
        setDelete(false);
        setVisible(false);
      })
      .catch((err) => {
        // // console.log(err)
        // window.alert("Error Occured");
        setpoststoDel("");
        setVisible(false);
      });
  };
  
  const getStudentProgram = ()=>{
    api
    .get(`/student/find/${studentId}`)
    .then((result)=>{
      console.log(studentId)
      console.log(result.data.program)
      setStudentProgram(result.data.program)
    })
    .catch((err)=>{
      console.log(studentId)
      console.log(err)})
  }
  const postsUpdate = () => {
    props.history.push("update-post");
  };

  return (
    <CContainer fluid>
      <CCard>


        {loading == true && poster == '' ? (
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
                <h3 style={{ 'margin': '20px' }}>{title}</h3>
                <p style={{ 'margin': '20px' }}>Application Starts: {applicationstart} | Application Deadline: {applicationdeadline}</p>

              </strong>
            </CCardHeader>
            <CCardBody>

              {poster != '' ? <CImage fluid src={`http://localhost:5000/getPoster/${poster}`} /> : <>Loading</>}
              <br></br>


              <hr></hr>

              <p style={{ 'text-align': 'justify', 'margin': '20px' }}>{description}</p>
              <h3 style={{ 'margin': '20px' }}>Eligliblity</h3>
              <ul style={{ 'text-align': 'justify', 'margin': '10px' }}>
              {eligibilityArr.map((value,key)=>{
                 return (<li>{value}</li>)
              })}
              </ul>
              <h3 style={{ 'margin': '20px' }}>Timeline</h3>
              <p style={{ 'margin': '20px', 'font-size': '22px' }}>Start Date: {applicationstart}</p>
              <p style={{ 'margin': '20px', 'font-size': '22px', 'color': 'red' }}>End Date: <span style={{ 'color': 'red' }}>{applicationdeadline}</span></p>
              <h4 style={{ 'margin': '20px' }}>Tags</h4>
              <p style={{ 'margin': '20px', 'font-size': '18px' }}>
                {tags.map((tag, key) => {
                  return (<CBadge color="info" shape="rounded-pill" style={{ 'margin': '4px' }}>{tag}</CBadge>)
                })
                }
              </p>


              <br></br>
              <br></br>

            </CCardBody>
            <CCardFooter>
              <br></br>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <CButton color="success" size="lg" variant="outline" onClick={checkStudentScholarshipEligibilty}>Apply to this Scholarship</CButton>
              </div>
              <br></br>
            </CCardFooter>
          </>
        )}
      </CCard>
      <prev >{JSON.stringify(studentId, null, 2)}</prev>
      <prev >{JSON.stringify(studentProgram, null, 2)}</prev>
      <prev >{JSON.stringify(scholarshipId, null, 2)}</prev>
      <prev>{JSON.stringify(studentEligibility, null, 2)}</prev>
      {/* <prev >{JSON.stringify(username, null, 2)}</prev>
      <prev >{JSON.stringify(password, null, 2)}</prev>
      <prev >{JSON.stringify(nic, null, 2)}</prev>
      <prev >{JSON.stringify(dob, null, 2)}</prev>
      <prev >{JSON.stringify(re_password, null, 2)}</prev>
      <prev >{JSON.stringify(valid, null, 2)}</prev>
      <prev >{JSON.stringify(isMatched, null, 2)}</prev> */}
    </CContainer>
  );
};

export default Layout;

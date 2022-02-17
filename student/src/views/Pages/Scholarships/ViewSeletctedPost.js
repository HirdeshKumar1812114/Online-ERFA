import React, { useState, useEffect } from "react";

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
  const [visible, setVisible] = useState(false);

  let [color, setColor] = useState("#49A54D");

  const api = axios.create({
    baseURL: "https://online-erfa.herokuapp.com/",
  });

  useEffect(() => {
    api
      .get(`scholarship/view/${localStorage.getItem("viewPostUrl")}`, setLoading(true))
      .then((res) => {
        setTitle(res.data.title)
        setDescription(res.data.description)
        setEligibility(res.data.eligibility)
        setApplicationStart(res.data.applicationstart)
        setApplicationDeadline(res.data.applicationdeadline)
        setPoster(res.data.poster)
        setTags(res.data.tags)
        setLoading(false)
        setEligibilityArr(eligibility.split(/\r/))

      })
      .catch((error) =>  console.log(error));

  }, [eligibility]);

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

              {poster != '' ? <CImage fluid src={`https://online-erfa.herokuapp.com/getPoster/${poster}`} /> : <>Loading</>}
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
                <CButton color="success" size="lg" variant="outline">Apply to this Scholarship</CButton>
              </div>
              <br></br>
            </CCardFooter>
          </>
        )}
      </CCard>

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

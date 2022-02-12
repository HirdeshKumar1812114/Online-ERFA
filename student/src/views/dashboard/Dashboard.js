import React, { lazy } from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCardText,
  CCol,
  CCardTitle,
  CContainer,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

const Dashboard = (props) => {
  return (
    <>
      <CContainer>
        <CCard>
          <CCardBody>
            <h3>Latest Scholarships </h3>
          </CCardBody>
          <CCardFooter>
            {/* <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardBody>
                </CCard>

                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow> */}

            <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage
                    orientation="top"
                    src="http://localhost:5000/getPoster/poster_1643631802225.jpg"
                  />
                  <CCardBody>
                    <CCardTitle>Need-Based Scholarship 2021</CCardTitle>
                    <CCardText>
                    SZABIST Need-Based Scholarship is an award of scholarship with varying percentages 25%, 50%, 75% and 100% for the talented but financially challenged students.
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Quick Apply</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage
                    orientation="top"
                    src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.6435-9/s600x600/101296846_3046145455472596_901224652850855936_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEpUtXgw47rZSAyIVZDCQK9d-S0KrFkbvN35LQqsWRu80foQNFlverM_PyQnN2hefzy0vUjSJ3Qlaj8ufWKSRv_&_nc_ohc=E99HAcEfAAUAX8fZPQ1&_nc_ht=scontent.fkhi22-1.fna&oh=00_AT-T3tUfyk8I970HcpIoaEzBak3L_adU8xZsHXJ8Tbd-qg&oe=621E003F"
                  />
                  <CCardBody>
                    <CCardTitle>Need-Based Scholarship 2020</CCardTitle>
                    <CCardText>
                    SZABIST Need-Based Scholarship is an award of scholarship with varying percentages 25%, 50%, 75% and 100% for the talented but financially challenged students.
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Quick Apply</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage
                    orientation="top"
                    src="https://lrk.szabist.edu.pk/wp-content/uploads/2021/07/Scholarship-1.png"
                  />
                  <CCardBody>
                    <CCardTitle>USAID Funded Scholarship</CCardTitle>
                    <CCardText>
                    United States Agency for International Development USAID with its commitment to support the program of scholarship for academically qualified Pakistani students, who aspire to continue higher studies, but due to lack of financial resources are unable to continue. 
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Quick Apply</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
            <br></br>
            <br></br>

            <CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <CButton
                  color="primary"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    props.history.push("scholarship/list-posts");
                  }}
                >
                  View All Scholarships
                </CButton>
              </div>
            </CRow>
            <br></br>
            <br></br>
          </CCardFooter>
        </CCard>
      </CContainer>
    </>
  );
};

export default Dashboard;

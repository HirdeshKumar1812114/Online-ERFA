import React, { lazy } from 'react'

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
} from '@coreui/react'



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
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol xs>
                <CCard className="h-100">
                  <CCardImage orientation="top" src="http://localhost:5000/getPoster/poster_1643631802225.jpg" />
                  <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CCardText>
                  </CCardBody>
                  <CCardFooter>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
            <br></br>
            <br></br>

            <CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <CButton color="primary" size="lg" variant="outline" onClick={()=>{props.history.push('scholarship/list-posts')}}>View All Scholarships</CButton>
              </div>
            </CRow>
            <br></br>
            <br></br>
          </CCardFooter>
        </CCard>


      </CContainer>



    </>
  )
}

export default Dashboard

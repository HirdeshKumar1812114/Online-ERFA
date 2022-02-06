import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://syedmustafaimam.com/FypWork/Online_ERFA/index.html" target="_blank" rel="noopener noreferrer">
          ONLINE ERFA
        </a>
        <span className="ms-1">&copy; 2021 SZABIST.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.linkedin.com/in/syedmustafaimam/" target="_blank" rel="noopener noreferrer">
          Mustafa 
        </a>
        &nbsp; 
        & 
        &nbsp; 

        <a href="https://www.linkedin.com/in/hirdeshkumar2407/" target="_blank" rel="noopener noreferrer">
          Hirdesh 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

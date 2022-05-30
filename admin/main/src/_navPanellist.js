import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNewspaper,
  cilChartLine,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navPanellist = [
  {
    component: CNavItem,
    name: 'Panelist Portal',
    to: '/panelist-portal',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: "Panelist",
  },
  // Interview
  {
    component: CNavItem,
    name: "Interview",
    to: "/interview",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  }
]

export default _navPanellist

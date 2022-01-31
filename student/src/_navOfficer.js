import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilBullhorn,
  cilStar,
  cilGroup
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navOfficer = [
  {
    component: CNavItem,
    name: 'Announcements',
    to: '/announcements',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // Scholarships
  {
    component: CNavGroup,
    name: 'Scholarships',
    to: '/scholarship',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Posts',
        to: '/scholarship/list-posts',
      },
    ],
  },
  ]

export default _navOfficer

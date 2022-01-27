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
  cilStar,
  cilGroup
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navOfficer = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
        name: 'New Post',
        to: '/scholarship/new-post',
      },
      {
        component: CNavItem,
        name: 'List Posts',
        to: '/scholarship/list-posts',
      },
    ],
  },
  ]

export default _navOfficer

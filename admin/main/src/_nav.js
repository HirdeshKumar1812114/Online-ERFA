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

const _nav = [
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
    {
    component: CNavGroup,
    name: 'User Management',
    to: '/officers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        
        component: CNavItem,
        name: 'Create New',
        to: '/officers/create-new',
      },
      {
        component: CNavItem,
        name: 'View Users',
        to: '/officers/view-users',
      },
    ],
  },
  ]

export default _nav

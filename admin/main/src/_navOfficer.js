import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilClock,
  cilNewspaper,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilChartLine,
  cilGroup
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navOfficer = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: "Administration Settings",
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
  },{
    component: CNavTitle,
    name: "Applicaitons",
  },
  {
    component: CNavItem,
    name: "Application forms",
    to: "/applications",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
   },
   {
    component: CNavTitle,
    name: "Interview",
  },
  {
    component: CNavItem,
  name: "Scheduling",
    to: "/scheduling",
    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
  },
  ]

export default _navOfficer

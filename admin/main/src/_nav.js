import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilNewspaper,
  cilClock,
  cilPencil,
  cilChartLine,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilGroup,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _navAdmin = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
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
  {
    component: CNavGroup,
    name: "User Management",
    to: "/officers",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Create New",
        to: "/officers/create-new",
      },
      {
        component: CNavItem,
        name: "View Users",
        to: "/officers/view-users",
      },
    ],
  },
  // Scholarships
  {
    component: CNavGroup,
    name: "Scholarships",
    to: "/scholarship",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "New Post",
        to: "/scholarship/new-post",
      },
      {
        component: CNavItem,
        name: "List Posts",
        to: "/scholarship/list-posts",
      },
    ],
  },
  {
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
  {
    component: CNavItem,
    name: "List Schedule",
    to: "/list-schedule",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },

];

export default _navAdmin;

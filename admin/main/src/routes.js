import React from 'react'
// Officers  
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const NewUser = React.lazy(() => import('./views/Pages/Officers/NewUser'))
const ViewUsers = React.lazy(() => import('./views/Pages/Officers/ViewUsers'))
const UpdateUser = React.lazy(() => import('./views/Pages/Officers/UpdateUser'))
// Scholarships
const NewPost = React.lazy(() => import('./views/Pages/Scholarships/NewPost'))
const ViewPost = React.lazy(() => import('./views/Pages/Scholarships/ViewPost'))
const ViewSeletctedPost = React.lazy(() => import('./views/Pages/Scholarships/ViewSeletctedPost'))
const UpdateSeletctedPost = React.lazy(() => import('./views/Pages/Scholarships/UpdateSeletctedPost'))
// Applications
const listApplications = React.lazy(() => import('./views/Pages/Applications/listApplicaitons'))
const selectedApplications = React.lazy(() => import('./views/Pages/Applications/selectedApplications'))
// Interviews
const scheduling = React.lazy(() => import('./views/Pages/Interview/scheduling'))
const listSchedule = React.lazy(() => import('./views/Pages/Interview/listSchedule'))
const sendEmails = React.lazy(() => import('./views/Pages/Interview/sendEmails'))
const reSchedule = React.lazy(() => import('./views/Pages/Interview/reScheduling'))
// Pannelist
const Pannelist = React.lazy(() => import('./views/Pannelist/pannelist'))
const marking = React.lazy(() => import('./views/Pannelist/marking'))

// Results
const listEvaluation = React.lazy(() => import('./views/Pages/Results/listEvalutaion'))
const selectedEvaluation = React.lazy(() => import('./views/Pages/Results/selectedEvaluation'))
const sendResults = React.lazy(() => import('./views/Pages/Results/sendResults'))








// ROUTES

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/pannelist', name: 'Pannelist Portal', component: Pannelist },
  { path: '/pannelist/marking', name: 'Application', component: marking },

  // Officers Routes  
  { path: '/officers', name: 'User Management', component: NewUser, exact: true },
  { path: '/officers/create-new', name: 'Create New', component: NewUser },
  { path: '/officers/view-users', name: 'View Users', component: ViewUsers },
  { path: '/officers/update-user', name: 'Update User', component: UpdateUser },

  // Scholarships Routes
  { path: '/scholarship', name: 'Scholarships', component: NewUser, exact: true },
  { path: '/scholarship/new-post', name: 'New Post', component: NewPost },
  { path: '/scholarship/list-posts', name: 'List Posts', component: ViewPost },
  { path: '/scholarship/view-post', name: 'View Post', component: ViewSeletctedPost },
  { path: '/scholarship/update-post', name: 'Update Post', component: UpdateSeletctedPost },

  // Applications Routes
  { path: '/applications', name: 'All Applications', component: listApplications },
  { path: '/selected-applicaiton', name: 'Application', component: selectedApplications },

  // Interview Routes
  { path: '/scheduling', name: 'Scheduling', component: scheduling },
  { path: '/list-schedule', name: 'List Schedule', component: listSchedule },
  { path: '/re-scheduling', name: 'Re-scheduling', component: reSchedule },
  { path: '/send-emails', name: 'Send Emails', component: sendEmails },

  // Results Routes

  { path: '/list-evaluation', name: 'All Evaluations', component: listEvaluation },
  { path: '/selected-evaluation', name: 'Student Evaluation', component: selectedEvaluation },
  { path: '/send-results', name: 'Application', component: sendResults },
  


]

export default routes

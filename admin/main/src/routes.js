import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const NewUser = React.lazy(() => import('./views/Pages/NewUser'))
const ViewUsers = React.lazy(() => import('./views/Pages/ViewUsers'))
const UpdateUser = React.lazy(() => import('./views/Pages/UpdateUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/officers', name: 'User Management', component: NewUser, exact: true},
  { path: '/officers/create-new', name: 'Create New', component: NewUser },
  { path: '/officers/view-users', name: 'View Users', component: ViewUsers },
  { path: '/officers/update-user', name: 'Update User', component: UpdateUser },



]

export default routes

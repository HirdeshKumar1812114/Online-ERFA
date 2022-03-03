import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Scholarship = React.lazy(() =>
  import("./views/Pages/Scholarships/NewPost")
);



// Scholarships
const ViewPost = React.lazy(() =>
  import("./views/Pages/Scholarships/ViewPost")
);
const ViewSeletctedPost = React.lazy(() =>
  import("./views/Pages/Scholarships/ViewSeletctedPost")
);

const ScholarshipForm = React.lazy(() =>
import("./views/Pages/Scholarships/ScholarshipForm")
);

const MyScholarship = React.lazy(() =>
import("./views/Pages/Scholarships/MyScholarship")
);

const MySelectedScholarship = React.lazy(() =>
import("./views/Pages/Scholarships/MySelectedScholarship")
);

// ROUTES

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/announcements", 
  name: "Announcements", 
  component: Dashboard },

  // Scholarships Routes
  {
    path: "/scholarship",
    name: "Scholarships",
    component: Scholarship,
    exact: true,
  },
  { path: "/scholarship/list-posts",
    name: "List Posts", 
    component: ViewPost },
  {
    path: "/scholarship/view-post",
    name: "View Posts",
    component: ViewSeletctedPost,
  },
  {
    path: "/scholarship/scholarship-form",
    name: "Scholarship Form",
    component: ScholarshipForm,
  },
  {
    path: "/scholarship/my-applications",
    name: "My Applications",
    component: MyScholarship,
  },
  {
    path: "/scholarship/selected-applications",
    name: "Selected Application",
    component: MySelectedScholarship,
  }
   
   

];

export default routes;

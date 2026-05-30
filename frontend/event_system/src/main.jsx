import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EventDetail from './EventDetail.jsx';
import EditForm from './EditForm.jsx';
import AddForm from './AddForm.jsx';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/events/:id",
    element: <EventDetail />,
  },
  {
    path: "/events/edit/:id",
    element: <EditForm/>
  },
  {
    path: "/events/new",
    element: <AddForm/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

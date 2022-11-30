import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import FooterLayout from './pages/FooterLayout'
import ProtHeaderLayout from './pages/ProtHeaderLayout'
import UnprotHeaderLayout from './pages/UnprotHeaderLayout.js'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Error from './pages/Error'

import Protected from './components/Protected'
import Unprotected from './components/Unprotected'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FooterLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Unprotected><UnprotHeaderLayout /></Unprotected>,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "signup",
            element: <SignUp />
          }
        ]
      },
      {
        element: <Protected><ProtHeaderLayout /></Protected>,
        children: [
          {
            path: "feed",
            element: <Feed />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "users",
            element: <Users />
          }
        ]
      },
    ]
  }
])

export default router
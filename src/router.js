import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Users from './pages/Users'
import NotFound from './pages/NotFound'

import FooterLayout from './components/FooterLayout'
import UnprotHeaderLayout from './components/UnprotHeaderLayout.js'
import ProtHeaderLayout from './components/ProtHeaderLayout'
import ServerMessage from './components/ServerMessage'
import Protected from './components/Protected'
import Unprotected from './components/Unprotected'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServerMessage />,
    errorElement: <NotFound />,
    children: [
      {
        element: <FooterLayout />,
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
                path: "users",
                element: <Users />
              },
              {
                path: "users/:userID",
                element: <Profile />
              }
            ]
          },
        ]
      }
    ]
  }
])

export default router
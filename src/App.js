import { Outlet, createBrowserRouter } from "react-router-dom"
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from "./components/home/Home"
import Feed from "./components/Feed/Feed"
import Profile from "./components/Profile/Profile"
import UpdateProfile from "./components/updateProfile/UpdateProfile"

const App = () => {
  return (
    <>
    <Home/> 
    <Outlet/>
    </>
  )
}

export const appRouter = createBrowserRouter([{
  path: '/',
  element : <App/>,

  children : [
    {
      path : '/',
      element : <Feed/>
    },
    {
      path : '/profile/:userId',
      element : <Profile/>
    } ,{
      path : '/updateProfile',
      element : <UpdateProfile/>
    } 
     
  ]
},  {
  path : '/login',
  element : <Login/>
},
{
  path : '/Signup',
  element: <Signup/>
},


])
export default App
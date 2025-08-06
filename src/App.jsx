// GENERAL IMPORTS
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Donate } from './pages/Donate'

// COMPOENNETS..
import Layout from './Components/Layout'
import {Wallpaper,BloodDonationSteps,LearnAboutBlood} from './Components/HomePage'
import Register from './pages/Registration'
import Login from './pages/Login'
import { AdminDashboard } from './pages/AdminDashboard'
import UserDashboardLayout  from './pages/UserDashboardLayout'
import DashboardHome from './Components/UserDashboardHOme'
import BloodRequestList from './Components/BloodRequestList'
import Notifications from './pages/Notifications'
import { FilterPage } from './Components/AdminFilterPage'
import { EditUserProfile , EditDonorProfile, EditCamp } from './Components/EditByAdmin'
import BloodReq from './pages/BloodRequest'
import BloodCamp from './pages/Camp'
import AdminHome from './Components/AdminIndexPage'

import { NotificationProvider } from './contexts/NotificationContext'
import { EditRequest } from './Components/EditByAdmin'
import ReviewForm from './Components/ReviewsForm'
import ReviewSlider from './Components/showReviews'





// Component for Routes
let AnimatedRoutes=()=>{
  
  return (
    
     

      <Routes>
        {/* Public Pages under Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<><Wallpaper /><BloodDonationSteps /><LearnAboutBlood /><ReviewSlider/><ReviewForm/></>} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="Donate" element={<Donate />} />
          <Route path="BloodCamp" element={<BloodCamp />} />
          <Route path="BloodRequest" element={<BloodReq />} />
        </Route>

        {/* Admin Dashboard (without Layout) */}  

        {/* "/AdminDashboard/user/showAllUser/AdminDashboard/users/edit/2585"  */}
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome/>} />
          <Route path=":category/:filterType" element={<FilterPage />} />

          <Route path="users/edit/:id" element={<EditUserProfile/>} />
          <Route path="blood_donor/edit/:id" element={<EditDonorProfile />} />
          <Route path="camp/edit/:id" element={<EditCamp />} />
          <Route path="blood_request/edit/:id" element={<EditRequest />} />

         
        </Route>

      


        {/* User Dashboard (without Layout) */}
        
        <Route path="/UserDashboard" element={
          // notification context provided for the userdashboard
          <NotificationProvider>
             <UserDashboardLayout />
          </NotificationProvider>
        }>
           <Route index element={ <><BloodRequestList/>,<DashboardHome /></>} />
           <Route path="notifications" element={<Notifications />} />
           <Route path="userEditRequest" element={<EditRequest/>}/>
        </Route>
       

        

        
      </Routes>
   
  )
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />    
    </>
  )
}

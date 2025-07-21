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
import { UserDashboard } from './pages/userDashboard'
import { FilterPage } from './Components/AdminFilterPage'
import { EditUserProfile , EditDonorProfile, EditCamp } from './Components/EditByAdmin'
import BloodReq from './pages/BloodRequest'




// Component for Routes
let AnimatedRoutes=()=>{
  
  return (
    
     

      <Routes>
        {/* Public Pages under Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<><Wallpaper /><BloodDonationSteps /><LearnAboutBlood /></>} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="Donate" element={<Donate />} />
          <Route path="BloodRequest" element={<BloodReq />} />
          


        </Route>

        {/* Admin Dashboard (without Layout) */}  

        {/* "/AdminDashboard/user/showAllUser/AdminDashboard/users/edit/2585"  */}
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path=":category/:filterType" element={<FilterPage />} />
          
          <Route path="users/edit/:id" element={<EditUserProfile/>} />
          <Route path="blood_donor/edit/:id" element={<EditDonorProfile />} />
          <Route path="camp/edit/:id" element={<EditCamp />} />
         
        </Route>

      


        {/* User Dashboard (without Layout) */}
        <Route path="/UserDashboard" element={<UserDashboard />} />
        
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

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
import { EditUserProfile , EditDonorProfile } from './Components/EditByAdmin'




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
        </Route>

        {/* Admin Dashboard (without Layout) */}
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path=":category/:filterType" element={<FilterPage />} />
        </Route>

        <Route path="/users/edit/:id" element={<EditUserProfile />} />
        <Route path="/blood_donor/edit/:id" element={<EditDonorProfile />} />
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

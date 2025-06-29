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
          {/* user filter */}
          <Route path="user/email"/>
          <Route path="user/name"/>
          <Route path="user/gender"/>
          <Route path="user/newUser"/>
          <Route path="user/oldUser"/>


          {/* BloodDonor Filter  */}
          <Route path="donor/name"/>
          <Route path="donor/email"/>
          <Route path="donor/gender"/>
          <Route path="donor/latest"/>
          <Route path="donor/active"/>
          <Route path="donor/inactive"/>
          <Route path="donor/donationPeriod"/>
          <Route path="donor/location"/>
          <Route path="donor/camp"/>

          {/* BloodRequest Filter */}
          <Route path="req/date"/>
          <Route path="req/urgent"/>
          <Route path="req/city"/>

          {/* BloodCamp Filter */}
          <Route path="camp/city"/>
          <Route path="camp/date"/>

          

      
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

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





// Component for Routes
let AnimatedRoutes=()=>{
  
  return (
    
      <Routes>
        <Route path="/" element={<Layout/>}> 

          <Route index element={<> <Wallpaper/> <BloodDonationSteps/> <LearnAboutBlood/> </>}/>

          <Route path="Register" element={<Register/>}/>
          <Route path="Login" element={<Login />}/>
          <Route path="Donate" element={<Donate/>}/>

          <Route path="AdminDashboard" element={<AdminDashboard/>}></Route>

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

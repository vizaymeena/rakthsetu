// GENERAL IMPORTS
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// COMPOENNETS..
import Layout from './Components/Layout'
import {Wallpaper,BloodDonationSteps,LearnAboutBlood} from './Components/HomePage'
import Register from './pages/Registration'
import Login from './Components/Login'



// Component for Routes
let AnimatedRoutes=()=>{
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout/>}> 

          <Route index element={<> <Wallpaper/> <BloodDonationSteps/> <LearnAboutBlood/> </>}/>

          <Route path="Register" element={<Register/>}/>
          <Route path="Login" element={<Login />}/>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />
      
    </>
  )
}

// import './App.css'
// import Layout from './Components/Layout'
// import Register from './Components/Registration'
// import { Route,Routes } from 'react-router-dom'
// import { AnimatePresence } from "framer-motion";

// function App() {
  

//   return (
//     <>
//     <Routes>
//       {/* Landing page and its relative routes */}
//       <Route path='/' element={<Layout/>}>
       
//        {/* <Route path="Donate" element={<Donate/>} />
//         <Route path="Info" element={<Info/>} />
//         <Route path="Help" element={<Help/>}/> */}
//        <AnimatePresence mode="wait">
//         <Route path="Register" element={<Register/>} />
//         </AnimatePresence>
//       </Route>
//     </Routes>

     
    
    
//     </>
//   )
// }

// export default App



import './App.css'
import Layout from './Components/Layout'
import Register from './Components/Registration'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './Components/Login'

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />
    </>
  )
}

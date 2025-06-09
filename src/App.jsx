import './App.css'
import Layout from './Components/Layout'
import Register from './Components/Registration'
import { Route,Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>
      {/* Landing page and its relative routes */}
      <Route path='/' element>
       
       <Route path="Donate" element={<Donate/>} />
        <Route path="Info" element={<Info/>} />
        <Route path="Help" element={<Help/>}/>
       
        <Route path="Register" element={<Register/>} />
      </Route>
    </Routes>

     <Layout/>
     <Register/>
    
    
    </>
  )
}

export default App

// HOOKS


// COMPONENT
import { Link, Outlet } from 'react-router-dom'
import { useLogin } from '../contexts/LoginContext';
// ASSTES
import '../assets/styles/style.css'  
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
import footImg from '../assets/images/bloodishero.jpg';
import { useEffect, useState } from 'react';


// LAYOUT COMPONENT
export default function Layout() {
  let {admin,user,setLogin} = useLogin()

 
  


  // HANDLE LOGOUT
  let handleLogout=()=>{

    if(admin){
       console.log(`Deleting role : ${admin}`)
       sessionStorage.removeItem("admin")
       setLogin({
        admin:'',
        user:''
       })
    }
    else{
       console.log(`Deleting role : ${user}`)
       sessionStorage.removeItem("user")
       setLogin({
        admin:'',
        user:''
       })
    }    
  }


  return (
    <>
 <header className="siteHeader">
  <div className="navContainer flex justify-between items-center">

    {/* Logo */}
    <div className="logo">
      <h1><Link to="/">RakthSetu</Link></h1>
    </div>

    {/* Nav Links */}
    <nav className="navLinks flex space-x-6">
      <Link to="/">Home</Link>
      <Link to="/Donate">Donors</Link>
      <Link to="/BloodRequest">Blood Request</Link>
      <Link to="/BloodCamp">Camp</Link>
      {admin && <Link to="/AdminDashboard">Admin Dashboard</Link>}
      {user && <Link to="/UserDashboard">User Dashboard</Link>}
      {(!admin && !user) && <Link to="/Login">Login</Link>}
    </nav>

    {/* User Area */}
    <div className="userArea flex items-center space-x-4">
      {(admin || user) && (
        <div className="userCard flex items-center space-x-3">
          <img  alt="Profile" className="profilePic rounded-full" />
          <span className="userEmail">{admin ? admin : user}</span>
          <button onClick={handleLogout} className="logoutBtn">Logout</button>
        </div>
      )}
      {(!admin && !user) && (
        <Link to="/Register" className="registerBtn">Guest</Link>
      )}
    </div>

  </div>
</header>


      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <img src={footImg} alt="BloodHope" className="footer-logo" />
            <p className="footer-tagline">“Giving life. One drop at a time.”</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Info">About</Link></li>
              <li><Link to="/Donate">Donate</Link></li>
              <li><Link to="#">Events</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <address>
              Bagoniya, Bhopal, India<br/>
              <a href="mailto:vizaymeena@gmail.com">vizaymeena@gmail.com</a><br/>
              <a href="tel:+917987725298">7987725298</a><br/>
              Mon-Fri: 9 AM - 6 PM
            </address>
            <div className="social-icons">
              <a href="#"><FaInstagram/></a>
              <a href="#"><FaTwitter/></a>
              <a href="#"><FaLinkedin/></a>
              <a href="mailto:vizaymeena@gmail.com"><CgMail /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          Project Made By vijay meena
        </div>
      </footer>
    </>
  );
}

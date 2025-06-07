import { Link, Outlet } from 'react-router-dom'
import '../assets/styles/style.css'  // Make sure to import this CSS file
import { FaInstagram,FaTwitter,FaLinkedin  } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

// image
import footImg from '../assets/images/bloodishero.jpg'



export default function Layout(){
  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/Donate">Donate</Link>
          <Link to="/Info">Info</Link>
          <Link to="/Help">Help</Link>
          <Link to="/Register">Register</Link>
        </nav>
      </header>

      <main className="site-main">
        <Outlet/>
      </main>

      <footer className="site-footer">
        <div className="footer-top-border"></div>
        <div className="footer-content">
          <div className="footer-logo-area">
            <img className='footer-img' src={footImg} alt="BloodHope Logo" />
            <p className="footer-tagline">“Giving life. One drop at a time.”</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Donate</Link></li>
              <li><Link to="#">Events</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Media Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <address>
              Bagoniya,Bhopal, India<br/>
               <Link>vizaymeena@gmail.com</Link><br/>
               <Link>7987725298</Link><br/>
               Mon Fri: 9 AM 6 PM
            </address>
            <div className="social-icons">
              <Link> <FaInstagram/> </Link>
              <Link><FaTwitter/></Link>
              <Link><FaLinkedin/></Link>
              <Link><CgMail/></Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

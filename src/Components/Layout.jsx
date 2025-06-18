import { Link, Outlet } from 'react-router-dom'
import '../assets/styles/style.css'  // Make sure to import this CSS file

import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
import footImg from '../assets/images/bloodishero.jpg';


export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-container">
          <div className="logo">
            <h1><Link to="/">RakthSetu</Link></h1>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/Donate">Donate</Link>
            <Link to="/Info">Info</Link>
            <Link to="/Help">Help</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </nav>
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

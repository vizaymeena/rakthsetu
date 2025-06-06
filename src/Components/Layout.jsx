import { Link, Outlet } from 'react-router-dom'
import '../assets/styles/style.css'  // Make sure to import this CSS file

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
            <img src="logo.png" alt="BloodHope Logo" />
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
              📍 123 Life St., Indore, India<br/>
              📧 <a href="mailto:support@bloodhope.org">support@bloodhope.org</a><br/>
              ☏ <a href="tel:+919999999999">+91 9999999999</a><br/>
              ⏰ Mon–Fri: 9 AM–6 PM
            </address>
            <div className="social-icons">
              <Link to="#">fb-icon</Link>
              <Link to="#">tw-icon</Link>
              <Link to="#">insta-icon</Link>
              <Link to="#">linkedin-icon</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

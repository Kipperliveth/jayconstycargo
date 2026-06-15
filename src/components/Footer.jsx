import { Link, useLocation } from 'react-router-dom';
import { MapPin, PhoneCall, Mail, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import logo from "../assets/jayconsty-logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // --- NEW: HIDE FOOTER ON ADMIN ROUTES ---
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer">
      
      <div className="footer__cta-strip">
        <div className="footer__cta-content">
          <h3>Ready to ship with us?</h3>
          <p className='strip'>Get reliable logistics solutions tailored to your business needs.</p>
        </div>
        
        <div className="footer__cta-actions">
          <Link to="/contact" className="footer__btn footer__btn--outline">
            Get a Quote <MessageSquare size={18} />
          </Link>
          <Link to="/tracking" className="footer__btn">
            Track a Shipment <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="footer__container">
        
        <div className="footer__brand">
          <Link to="/">
            <img src={logo} alt="Jayconsty Cargo" className="footer__logo" />
          </Link>
          <p className="footer__bio">
            Delivering excellence across borders. We provide secure, fast, and reliable cargo and procurement services for businesses worldwide.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter"><FaXTwitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
          </div>
        </div>

        <div className="footer__links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/tracking">Track Shipment</Link></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/pricing">Pricing Overview</Link></li>
            <li><Link to="/pricing#quote">Get a Quote</Link></li>
            <li><Link to="/faqs">Help & FAQs</Link></li>
            <li><Link to="/legal">Terms & Conditions</Link></li>
            <li><Link to="/legal#privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Get In Touch</h4>
          <ul className="footer__contact-info">
            <li>
              <MapPin size={18} className="icon" />
              <a 
                href="https://maps.google.com/?q=123+Logistics+Avenue,+Industrial+Estate,+Port+Harcourt,+Rivers+State,+Nigeria" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                123 Logistics Avenue, Industrial Estate, Port Harcourt, Rivers State, Nigeria
              </a>
            </li>
            <li>
              <PhoneCall size={18} className="icon" />
              <a href="tel:+2348001234567">+234 (0) 800 123 4567</a>
            </li>
            <li>
              <Mail size={18} className="icon" />
              <a href="mailto:support@jayconstycargo.com">support@jayconstycargo.com</a>
            </li>
            <li>
              <Clock size={18} className="icon" />
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p>© {currentYear} Jayconsty Cargo. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/legal">Legal</Link>
            <span className="divider">|</span>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
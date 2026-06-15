import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Standard Colored Logo
import coloredLogo from "../assets/jayconsty-colored-logo.png"
// White Logo
import whiteLogo from "../assets/jayconsty-logo.png"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 1. Define routes that should start transparent at the top
  const transparentRoutes = ['/about', '/services', '/contact', '/faqs' ];
  const isTransparentRoute = transparentRoutes.includes(location.pathname);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Automatically close the mobile menu when a link is clicked/route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu automatically if the screen is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Lock background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Detect scroll to add shadow/solid background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NEW: HIDE NAVBAR ON ADMIN ROUTES ---
  // Must be placed after all hooks to avoid React errors
  if (location.pathname.startsWith('/admin')) {
    return null; 
  }

  // 2. Dynamically construct the class list based on state and route
  let navClass = 'navbar';
  
  if (isTransparentRoute) {
    if (isScrolled || isMenuOpen) {
      navClass += ' navbar--fixed-scrolled';
    } else {
      navClass += ' navbar--transparent';
    }
  } else {
    if (isScrolled || isMenuOpen) {
      navClass += ' navbar--scrolled';
    }
  }

  return (
    <nav className={navClass}>
      <div className="navbar__container">
        
        <Link to="/" className="navbar__logo-container">
          <img 
            src={ (isTransparentRoute && !isScrolled) ? whiteLogo : coloredLogo } 
            alt="jayconsty cargo" 
          />
        </Link>

        <button 
          className={`navbar__hamburger ${isMenuOpen ? 'is-active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className="navbar__menu desktop-only">
          <ul className="navbar__links">
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
            <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
            <li><NavLink to="/pricing" className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink></li>
            <li><NavLink to="/faqs" className={({ isActive }) => isActive ? 'active' : ''}>FAQs</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          </ul>
          <Link to="/tracking" className="navbar__cta">Track Shipment</Link>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="navbar__mobile-overlay"
              onClick={toggleMenu}
            />
          )}

          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
              className="navbar__menu-drawer mobile-only"
            >
              <ul className="navbar__links-mobile">
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/faqs">FAQs</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </ul>
              
              <div className="navbar__mobile-footer">
                <Link to="/tracking" className="navbar__cta mobile-cta">Track Shipment</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
// import './Contact.scss';

function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
  const [countryPrefix, setCountryPrefix] = useState('+234'); // Default prefix
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePrefixChange = (e) => {
    setCountryPrefix(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <main className="contact-page">
      
      {/* Hero Section */}
      <section className="pages-hero contact-hero">
        <div className="pages-hero-content">
          <div className="accent-line"></div>
          <h1>Get in <span>Touch.</span></h1>
          <p>We're here to help</p>
        </div>
      </section>

      {/* Main Contact Interface */}
      <section className="contact-interface">
        <div className="contact-container">
          <div className="contact-grid">
            
            {/* LEFT SIDE: Operational Hubs, Addresses & Socials */}
            <div className="contact-info-panel">
              <h2>Our Global Hubs.</h2>
              <p className="info-subtitle">
                Drop off your cargo at our UK depot or coordinate collection with our dedicated teams on the ground in Nigeria.
              </p>

              {/* Address & Info Cards */}
              <div className="info-cards">
                <div className="info-card">
                  <div className="card-icon">🇬🇧</div>
                  <div>
                    <h4>UK Dispatch Hub</h4>
                    <p>RM20 3EE, United Kingdom</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-icon">🇳🇬</div>
                  <div>
                    <h4>Lagos Terminal</h4>
                    <p>
                      No 1 Cole Street, Lambe Powerline, Jankara,<br />
                      off Ijaye, Lagos State<br />
                      <strong>Contact:</strong> Adetola Abodunrin (<a href="tel:08050622602" className="text-link">08050622602</a>)
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-icon">🇳🇬</div>
                  <div>
                    <h4>Port Harcourt Terminal</h4>
                    <p>
                      Jayconsty Logistics Depot, Trans-Amadi Industrial Layout,<br />
                      Port Harcourt, Rivers State
                    </p>
                  </div>
                </div>

                <div className="info-card channels-card">
                  <div className="card-icon">📧</div>
                  <div>
                    <h4>Direct Channels</h4>
                    <p>
                      <a href="mailto:hello@jayconsty.com" className="subtle-link">hello@jayconsty.com</a>
                      <span className="divider">|</span>
                      <a href="tel:+441234567890" className="subtle-link">+44 (0) 123 456 7890</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links Row (Icons Only) */}
              <div className="social-links-wrapper">
                <h4>Connect With Us</h4>
                <div className="social-icons-row">
                  <a href="#" className="social-icon-circle whatsapp" aria-label="WhatsApp">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.005-5.05-2.836-6.88C16.671 2.153 14.224 1.144 12.01 1.144c-5.439 0-9.865 4.37-9.869 9.741-.001 1.77.475 3.499 1.38 5.061L2.5 21.5l5.834-1.516zM17.11 14.19c-.31-.154-1.829-.893-2.11-.994-.28-.102-.485-.153-.688.154-.203.306-.788.994-.965 1.197-.178.203-.355.228-.665.074-1.284-.641-2.126-1.125-2.969-2.57-.223-.38-.223-.715.01-.94.21-.202.467-.543.7-.814.07-.08.136-.162.197-.243.16-.264.24-.508.14-.712-.1-.203-.485-1.157-.665-1.593-.175-.424-.37-.365-.507-.373-.13-.007-.28-.008-.43-.008-.15 0-.395.056-.603.284-.208.228-.793.766-.793 1.867s.803 2.157.915 2.309c.112.153 1.58 2.373 3.824 3.329.534.227 1.01.376 1.357.485.538.17 1.02.147 1.405.09.43-.064 1.828-.737 2.085-1.45.256-.713.256-1.32.18-1.45-.076-.126-.28-.204-.59-.357z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon-circle instagram" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon-circle tiktok" aria-label="TikTok">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.21 1.4 2.93 2.38 4.81 2.64v3.94c-1.78-.12-3.52-.74-4.98-1.82-.77-.58-1.42-1.31-1.92-2.14v7.93c.04 4.26-2.9 8.24-7.14 9.1-4.16.92-8.56-1.45-9.87-5.52-1.39-4.22.6-8.98 4.67-10.73 1.26-.55 2.64-.78 4-.69v3.93c-1-.21-2.07-.05-2.96.48-.96.55-1.61 1.53-1.77 2.63-.33 2.05 1.13 3.98 3.19 4.19 1.94.22 3.73-1.12 3.98-3.04.06-.44.06-.88.06-1.32V0h2.38z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon-circle x-twitter" aria-label="X (formerly Twitter)">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Form */}
            <div className="contact-form-panel">
              {formStatus === 'success' ? (
                <div className="form-success-state">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Our dispatch team has received your inquiry and will be in touch within 24 hours.</p>
                  <button type="button" className="btn-secondary" onClick={() => setFormStatus('idle')}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="modern-form" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h3>Send us a message</h3>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" required placeholder="Jane" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" required placeholder="Doe" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" required placeholder="jane@company.com" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inquiryType">How can we help?</label>
                      <div className="custom-select-wrapper">
                        <select id="inquiryType" required>
                          <option value="" disabled selected>Select an option...</option>
                          <option value="sea-freight">Sea Freight Booking</option>
                          <option value="procurement">UK Procurement (Buy For Me)</option>
                          <option value="tracking">Shipment Tracking</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-container">
                      <div className="prefix-select-wrapper">
                        <select 
                          className="phone-prefix-select" 
                          value={countryPrefix} 
                          onChange={handlePrefixChange}
                          aria-label="Country Code Selection"
                        >
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                      </div>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="8123456789" 
                      />
                    </div>
                    <span className="phone-preview-text">
                      Full format submission: <strong>{countryPrefix} {phoneNumber || '...'}</strong>
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message Details</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      required 
                      placeholder="Please provide shipment dimensions, weight, or shopping links here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary submit-btn ${formStatus === 'submitting' ? 'loading' : ''}`}
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Contact;
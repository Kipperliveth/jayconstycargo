import { useState, useEffect } from 'react';
// import './Legal.scss';

function Legal() {
  const [activeSection, setActiveSection] = useState('roles');

  // Logic to handle "ScrollSpy" (highlighting nav on scroll)
  useEffect(() => {
    const sections = document.querySelectorAll('.legal-section');
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detects when section is in the upper part of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Offset for clean spacing
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="legal-page">
      {/* --- REFINED MINIMALIST HERO --- */}
      <header className="legal-hero">
        <div className="legal-hero__container">
          <div className="legal-hero__meta">
            <span className="legal-hero__tag">v. 2026.01</span>
            <span className="legal-hero__dot"></span>
            <span className="legal-hero__date">Effective June 1, 2026</span>
          </div>
          <h1 className="legal-hero__title">Privacy & Logistics Terms</h1>
          <p className="legal-hero__lead">
            Governing the intermediary relationship between Jayconsty Cargo and its commissioning agents for Sea Freight operations.
          </p>
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <div className="legal-container">
        {/* Left Column: Clauses */}
        <article className="legal-content">
          
          <section id="roles" className="legal-section">
            <h2>1. Intermediary Status & Roles</h2>
            <p>
              Jayconsty Cargo operates exclusively as a <strong>Third-Party Logistics (3PL) Forwarder</strong>. We function as a strategic middleman, managing the interface between UK export hubs and Nigerian distribution networks.
            </p>
            <p>
              Your use of our UK warehouse address constitutes an agreement that we act as your forwarding agent. We do not manufacture, own, or directly sell the goods in transit unless utilized through our specific Procurement Services.
            </p>
          </section>

          <section id="data-privacy" className="legal-section">
            <h2>2. Data Privacy Commitment</h2>
            <p>
              We operate under a strict "Trust-First" data protocol. Your information is a tool for transit, not a commodity for sale:
            </p>
            <ul className="legal-list">
              <li><strong>No Data Monetization:</strong> We never sell, lease, or trade your personal data, shipment history, or contact profiles to third-party advertisers.</li>
              <li><strong>Zero Permanent Storage:</strong> We do not retain sensitive personal data beyond the legal requirements of the active shipment lifecycle.</li>
              <li><strong>Confidentiality:</strong> All manifest details and order numbers are treated as strictly confidential and used only for customs declarations.</li>
            </ul>
          </section>

          <section id="liability" className="legal-section">
            <h2>3. Absolute Limitation of Liability</h2>
            <p>
              As a logistics middleman, <strong>Jayconsty Cargo is not liable for manufacturing defects, merchant errors, or physical damage incurred during transit.</strong>
            </p>
            <div className="legal-warning">
              <p>
                <strong>Merchant Risk:</strong> All cargo travels at the owner's risk. We are not responsible for the structural integrity of items as delivered by the merchant to our hub.
              </p>
            </div>
            <p>
              For high-value Sea Freight shipments, we strongly recommend purchasing our optional Cargo Insurance to protect against maritime transit disruptions.
            </p>
          </section>

          <section id="durations" className="legal-section">
            <h2>4. Sea Freight Timelines</h2>
            <p>
              Shipping durations are estimates based on standard maritime routes and port clearance speeds. Please note that <strong>Air Freight is currently unavailable</strong>.
            </p>

            <table className="legal-table">
              <thead>
                <tr>
                  <th>Route Type</th>
                  <th>Dispatch Schedule</th>
                  <th>Estimated Arrival</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Sea Freight</strong></td>
                  <td>1st & 3rd Saturday Monthly</td>
                  <td>4 - 6 Weeks</td>
                </tr>
              </tbody>
            </table>

            <p>
              "When we ship, you know"—tracking is updated as soon as the vessel departs. Jayconsty Cargo is not liable for delays caused by port congestion or customs audits.
            </p>
          </section>

        </article>

        {/* Right Column: Sticky Active Nav */}
        <aside className="legal-sidebar">
          <div className="legal-nav-container">
            <p className="legal-nav-label">Document Outline</p>
            <nav className="legal-nav">
              <a 
                href="#roles" 
                className={activeSection === 'roles' ? 'is-active' : ''}
                onClick={(e) => scrollToSection(e, 'roles')}
              >
                Roles & Status
              </a>
              <a 
                href="#data-privacy" 
                className={activeSection === 'data-privacy' ? 'is-active' : ''}
                onClick={(e) => scrollToSection(e, 'data-privacy')}
              >
                Data Privacy
              </a>
              <a 
                href="#liability" 
                className={activeSection === 'liability' ? 'is-active' : ''}
                onClick={(e) => scrollToSection(e, 'liability')}
              >
                Liability Limits
              </a>
              <a 
                href="#durations" 
                className={activeSection === 'durations' ? 'is-active' : ''}
                onClick={(e) => scrollToSection(e, 'durations')}
              >
                Sea Freight Logic
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Legal;
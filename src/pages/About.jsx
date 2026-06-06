// import React from 'react';
// import './About.scss';

import aboutImage1 from '../assets/cargo1.jpg'; 
import aboutImage2 from '../assets/cargo2.jpg';
import teamImage from '../assets/cargo3.jpg'; // <-- ADD THIS IMPORT
import { Link } from 'react-router-dom';

function About() {
  return (
    <main className="about-page">
      
      {/* 1. Existing Hero Section */}
      <section className="pages-hero">
        <div className="pages-hero-content">
          <div className="accent-line"></div>
          <h1>About <span>us.</span></h1>
          <p>Your strategic logistics partner</p>
        </div>
      </section>

      {/* 2. Compact Content Section */}
      <section className="about-content">
        <div className="about-container">

          {/* Block 1: Text Left, Image Right */}
          <div className="about-block">
            <div className="about-text-content">
              <span className="badge">ABOUT JAYCONSTY</span>
              <h2>Driven by precision. Delivered with care.</h2>
              <p>
                At Jayconsty, we pride ourselves on delivering seamless, end-to-end logistics solutions 
                that keep your business moving. From complex freight forwarding to expedited delivery, 
                our dedicated team is committed to ensuring your cargo reaches its destination safely 
                and strictly on schedule.
              </p>
              
          <div className="about-actions">
                <Link to="/contact" className="btn-primary">Request a Quote &rarr;</Link>
                <Link to="/tracking" className="btn-secondary">Track Shipment</Link>
              </div>

              <div className="about-stats">
                <div className="stat-item">
                  <h3>99%</h3>
                  <p>On-time delivery<br/>success rate</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Global destinations<br/>and ports served</p>
                </div>
                <div className="stat-item">
                  <h3>1M+</h3>
                  <p>Tons of cargo<br/>safely delivered</p>
                </div>
              </div>
            </div>
            
            <div className="about-image-content">
              <img src={aboutImage1} alt="Jayconsty logistics fleet" />
            </div>
          </div>

          {/* Block 2: Image Left, Text Right (Using .reverse) */}
          <div className="about-block reverse">
            {/* Notice Text is still first in the code. CSS flips it! */}
            <div className="about-text-content">
              <span className="badge">OUR CAPABILITIES</span>
              <h2>Unlock unmatched efficiency across your supply chain.</h2>
              <p>
                Leverage our deep industry expertise and technology-driven infrastructure to 
                accelerate your supply chain. Our tailored cargo solutions ensure seamless operations 
                across diverse sectors, addressing your unique shipping challenges from origin to 
                final destination.
              </p>

              <ul className="about-features-list">
                <li><span className="check-icon">&#10003;</span> Global freight forwarding</li>
                <li><span className="check-icon">&#10003;</span> Real-time shipment tracking</li>
                <li><span className="check-icon">&#10003;</span> Secure & expedited delivery</li>
                <li><span className="check-icon">&#10003;</span> Customs clearance expertise</li>
                <li><span className="check-icon">&#10003;</span> Scalable warehousing</li>
                <li><span className="check-icon">&#10003;</span> 24/7 dedicated support</li>
              </ul>
            </div>

            <div className="about-image-content">
              <img src={aboutImage2} alt="Jayconsty global shipping expertise" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Global Footprint / Route Network Section */}
      <section className="about-footprint">
        <div className="footprint-container">
          
          <div className="footprint-header">
            <span className="badge">OUR NETWORK</span>
            <h2>The UK to Nigeria Corridor.</h2>
            <p>
              While our primary, high-volume trade lane connects the United Kingdom directly to Port Harcourt and Lagos, 
              our logistics capabilities don't stop at the port. Once docked and cleared, our fleet facilitates seamless, 
              expedited delivery to any destination nationwide.
            </p>
          </div>

          <div className="footprint-network">
            {/* Step 1: Origin */}
            <div className="network-node">
              <div className="node-icon">01</div>
              <h3>United Kingdom</h3>
              <p>Our primary origin point. We handle consolidation, secure packaging, and export dispatch directly from major UK logistics hubs.</p>
            </div>

            {/* Step 2: Entry */}
            <div className="network-node">
              <div className="node-icon">02</div>
              <h3>Lagos & Port Harcourt</h3>
              <p>Our main ports of entry. Our on-the-ground local experts ensure swift customs clearance, secure docking, and immediate offloading.</p>
            </div>

            {/* Step 3: Destination */}
            <div className="network-node">
              <div className="node-icon">03</div>
              <h3>Nationwide Distribution</h3>
              <p>From the ports to the final mile. We deploy our local fleet to distribute your cleared cargo safely to any address across Nigeria.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Our People / Team Promise Section (Dark Theme) */}
      <section className="about-team">
        <div className="team-container">
          
          <div className="team-image-wrapper">
            <img src={teamImage} alt="Jayconsty Logistics Professionals" />
          </div>

          <div className="team-content">
            <span className="badge badge-dark">OUR PEOPLE</span>
            <h2>Dedicated specialists. Door-to-door precision.</h2>
            <p>
              Behind every successful shipment is a team of relentless logistics professionals. 
              While our technology tracks the data, it's our people who ensure your cargo is carefully packaged, 
              securely loaded, and swiftly cleared through customs. 
            </p>
            <p>
              From the moment your goods leave the UK to the second they arrive at your doorstep in Nigeria, 
              our experts are actively managing the journey to guarantee zero delays.
            </p>

            <div className="team-guarantees">
              <div className="guarantee-item">
                <span className="guarantee-icon">&#10003;</span>
                <div>
                  <h4>Secure Packaging</h4>
                  <p>Industrial-grade wrapping and consolidation for maximum transit safety.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">&#10003;</span>
                <div>
                  <h4>Door-to-Door Delivery</h4>
                  <p>We handle the heavy lifting straight from the origin to your final address.</p>
                </div>
              </div>
            </div>
            
            {/* The class mt-4 was removed, styling is now fully handled in SCSS */}
            <Link to="/contact" className="btn-primary">Speak to an Expert &rarr;</Link>
          </div>

        </div>
      </section>
      
    </main>
  );
}

export default About;
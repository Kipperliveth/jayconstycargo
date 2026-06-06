import React from 'react';
import { Link } from 'react-router-dom';
// import './Services.scss';

// Main and sub-images for the top collage (Freight)
import freightMain from '../assets/cargo1.jpg'; 
import freightSub1 from '../assets/cargo2.jpg'; 
import freightSub2 from '../assets/cargo3.jpg'; 

// Main and sub-images for the Procurement collage
import shopMain from '../assets/cargo4.jpg'; // e.g., shopping/warehouse image
import shopSub1 from '../assets/cargo1.jpg'; // e.g., packed box

// Final mile image
import finalMileImg from '../assets/cargo3.jpg';  

function Services() {
  return (
    <main className="services-modern">
      
      {/* 1. Hero Section (Restored) */}
      <section className="pages-hero services-hero">
        <div className="pages-hero-content">
          <div className="accent-line"></div>
          <h1>Our <span>Services.</span></h1>
          <p>End-to-end logistics solutions</p>
        </div>
      </section>

      {/* 2. Core Freight (Text Left, Image Collage Right) */}
      <section className="modern-section top-hero-section">
        <div className="modern-container flex-layout">
          
          <div className="modern-content pr-lg">
            <span className="badge badge-outline">TRANSIT OPTIONS</span>
            <h1 className="modern-title">UK to Nigeria Freight Forwarding.</h1>
            <p className="modern-subtitle">
              Streamlined ocean freight and upcoming expedited air networks engineered for absolute reliability and zero delays.
            </p>
            
            <div className="service-highlight">
              <h3>High-Volume Sea Freight</h3>
              <p>Our primary transit service for commercial stock and heavy machinery. <strong>Departs strictly every 3rd Friday of the month</strong> routing directly to Lagos and Port Harcourt.</p>
            </div>

            <div className="service-highlight muted">
              <h3>Expedited Air Freight <span className="tag-soon">COMING SOON</span></h3>
              <p>Actively engineering our premium, 4-7 day fast-turnaround air shipping infrastructure for time-critical inventory.</p>
            </div>

            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Book a Shipment &rarr;</Link>
            </div>
          </div>

          <div className="modern-collage right-collage">
            <img src={freightMain} alt="Main Freight Operations" className="collage-main" />
            <div className="collage-sub sub-bottom-left">
              <img src={freightSub1} alt="Warehouse operations" />
            </div>
            <div className="collage-sub sub-top-left">
              <img src={freightSub2} alt="Cargo team" />
            </div>
            {/* Floating stat card in the collage */}
            <div className="floating-stat">
              <span className="stat-icon">&#9875;</span>
              <div>
                <strong>Every 3rd Friday</strong>
                <span>Guaranteed Departures</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Stats Banner */}
      <section className="stats-banner">
        <div className="modern-container stats-grid">
          <div className="stat-item">
            <h2>100%</h2>
            <p>Secure Consolidation</p>
          </div>
          <div className="stat-item">
            <h2>14+</h2>
            <p>Years of Logistics Expertise</p>
          </div>
          <div className="stat-item">
            <h2>Zero</h2>
            <p>Hidden Customs Fees</p>
          </div>
        </div>
      </section>

      {/* 4. Procurement Service (Image Collage Left, Text Right) */}
      <section className="modern-section bg-light-gray">
        <div className="modern-container flex-layout reverse-mobile">
          
          <div className="modern-collage left-collage">
            <img src={shopMain} alt="Procurement Shopping" className="collage-main" />
            <div className="collage-sub sub-bottom-right">
              <img src={shopSub1} alt="Packed orders" />
            </div>
          </div>

          <div className="modern-content pl-lg">
            <span className="badge badge-outline">BUY FOR ME SERVICE</span>
            <h2 className="modern-title">Shop UK Stores. We'll handle the rest.</h2>
            <p className="modern-subtitle">
              Facing payment or checkout restrictions in Nigeria on stores like Amazon, ASOS, Zara, or Apple? Our procurement team bridges the gap.
            </p>
            <p className="modern-body">
              Send us your shopping links. We purchase the items directly in the UK, verify the inventory at our hub, and seamlessly transition it straight into our next scheduled sea freight departure.
            </p>

            <ul className="modern-checklist">
              <li><span className="check">&#10003;</span> No UK Card Needed</li>
              <li><span className="check">&#10003;</span> Vendor Checkout Handled</li>
              <li><span className="check">&#10003;</span> Quality Sourcing Verification</li>
              <li><span className="check">&#10003;</span> Seamless Sea Freight Integration</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. Value-Added Handling Services (3-Column Grid) */}
      <section className="modern-pipeline">
        <div className="modern-container">
          <div className="pipeline-grid">
            <div className="pipeline-item">
              <div className="pipeline-icon">&#128230;</div>
              <h3>Cargo Consolidation</h3>
              <p>Maximize your budget by safely combining multiple UK retail orders or smaller packages into shared container spaces.</p>
            </div>
            <div className="pipeline-item">
              <div className="pipeline-icon">&#128196;</div>
              <h3>Customs Clearance</h3>
              <p>Skip the regulatory headaches. Our on-ground clearing agents fast-track documentation at Nigerian arrival ports.</p>
            </div>
            <div className="pipeline-item">
              <div className="pipeline-icon">&#127980;</div>
              <h3>Secure Warehousing</h3>
              <p>Monitored storage infrastructure ensuring safe holding of your items at both our UK depot and Nigerian terminals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Final Mile (Dark Theme Contrast) */}
      <section className="modern-final-mile">
        <div className="modern-container flex-layout">
          
          <div className="modern-content pr-lg">
            <span className="badge badge-dark">NATIONWIDE DISTRIBUTION</span>
            <h2 className="modern-title text-white">True Door-to-Door Delivery.</h2>
            <p className="modern-subtitle text-gray">
              Your shipment's journey doesn't end when it docks. Once your cargo passes through customs, our domestic logistics network takes over. 
            </p>
            <p className="modern-body text-gray">
              We load, secure, and transport your goods directly to your warehouse, storefront, or residential doorstep anywhere across Nigeria. No third-party handoffs, no tracking gaps.
            </p>
            <div className="hero-actions mt-lg">
              <Link to="/contact" className="btn-primary">Start Your Shipment &rarr;</Link>
            </div>
          </div>

          <div className="final-mile-image">
            <img src={finalMileImg} alt="Jayconsty Door to Door Delivery Fleet" />
          </div>

        </div>
      </section>

    </main>
  );
}

export default Services;
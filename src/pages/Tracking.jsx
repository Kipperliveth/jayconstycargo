import React, { useState } from 'react';
// import './Tracking.scss';

function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    
    if (trackingCode.trim().length < 5) {
      setError('Please enter a valid tracking number (at least 5 characters).');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate network request and generate realistic mock data based on input
    setTimeout(() => {
      setShipmentData({
        id: trackingCode.toUpperCase(),
        status: 'In Transit',
        origin: 'London, UK (RM20 3EE)',
        destination: 'Lagos, NG (Jankara)',
        estimatedDelivery: 'June 5, 2026',
        weight: '24.5 kg',
        pieces: 2,
        timeline: [
          { 
            date: 'June 1, 2026', time: '09:15 AM', 
            title: 'Shipment Information Received', 
            location: 'London, UK', 
            status: 'completed' 
          },
          { 
            date: 'June 1, 2026', time: '02:30 PM', 
            title: 'Processed at Origin Hub', 
            location: 'London, UK', 
            status: 'completed' 
          },
          { 
            date: 'June 2, 2026', time: '06:00 AM', 
            title: 'Departed Facility / In Transit', 
            location: 'London, UK', 
            status: 'completed' 
          },
          { 
            date: 'June 2, 2026', time: '04:42 PM', 
            title: 'Arrived at Destination Customs', 
            location: 'Lagos, Nigeria', 
            status: 'current' 
          },
          { 
            date: 'Pending', time: '--:--', 
            title: 'Out for Delivery', 
            location: 'Lagos, Nigeria', 
            status: 'pending' 
          }
        ]
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleClear = () => {
    setTrackingCode('');
    setShipmentData(null);
    setError('');
  };

  return (
    <main className="tracking-page">
      
      {/* Search Header Section */}
      <section className="tracking-hero">
        <div className="tracking-hero-content">
          <h1>Track your shipment</h1>
          <p>Enter your Jayconsty tracking or waybill number below to get real-time updates.</p>
          
          <form className="tracking-search-form" onSubmit={handleTrack}>
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="e.g. JYC-8472910" 
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                disabled={isLoading}
              />
              {trackingCode && (
                <button type="button" className="clear-btn" onClick={handleClear}>✕</button>
              )}
            </div>
            <button type="submit" className="track-btn" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Track Package'}
            </button>
          </form>
          {error && <span className="error-message">{error}</span>}
        </div>
      </section>

      {/* Results Section */}
      {shipmentData && (
        <section className="tracking-results-section">
          <div className="results-container">
            
            {/* Top Status Card */}
            <div className="status-overview-card">
              <div className="status-header">
                <div>
                  <span className="tracking-label">Tracking Number</span>
                  <h2>{shipmentData.id}</h2>
                </div>
                <div className="status-badge in-transit">
                  <span className="dot"></span>
                  {shipmentData.status}
                </div>
              </div>
              
              <div className="status-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Origin</span>
                  <span className="detail-value">{shipmentData.origin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Destination</span>
                  <span className="detail-value">{shipmentData.destination}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Est. Delivery</span>
                  <span className="detail-value highlight">{shipmentData.estimatedDelivery}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Weight / Pieces</span>
                  <span className="detail-value">{shipmentData.weight} • {shipmentData.pieces} Box(es)</span>
                </div>
              </div>
            </div>

            {/* Layout Grid for Timeline & Support */}
            <div className="tracking-content-grid">
              
              {/* Left Column: Timeline */}
              <div className="timeline-container">
                <h3>Shipment History</h3>
                <div className="timeline">
                  {shipmentData.timeline.map((event, index) => (
                    <div className={`timeline-item ${event.status}`} key={index}>
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <h4 className="event-title">{event.title}</h4>
                          <span className="event-location">{event.location}</span>
                        </div>
                        <div className="event-datetime">
                          {event.date} {event.time !== '--:--' && `• ${event.time}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Support Action */}
              <div className="support-sidebar">
                <div className="support-card">
                  <div className="support-icon">💬</div>
                  <h3>Need help with this shipment?</h3>
                  <p>If you notice any delays or have questions about customs clearance, our team is ready to assist.</p>
                  
                  {/* In a real app, this would link to your contact page or a support modal with the tracking ID pre-filled via URL params */}
                  <a href={`mailto:support@jayconsty.com?subject=Inquiry regarding tracking ${shipmentData.id}`} className="support-btn">
                    Contact Support
                  </a>
                  
                  <div className="support-phone">
                    <span>Or call us directly:</span>
                    <a href="tel:08050622602">NG: 08050622602</a>
                    <a href="tel:+441234567890">UK: +44 123 456 7890</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

    </main>
  );
}

export default Tracking;
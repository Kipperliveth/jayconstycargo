import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { txtdb } from '../firebase-config';
import { 
  Search, X, MessageCircle, Phone, Mail, Package, 
  MapPin, Calendar, Check, Copy, Clock, Truck, Home
} from 'lucide-react';
// import './Tracking.scss';

function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const globalSteps = ['Processing', 'In Transit', 'Out for Delivery', 'Delivered'];

  // --- Feature: Auto-Tracking via URL & Load Local Storage ---
  useEffect(() => {
    // Load recent searches from Local Storage
    const storedRecents = JSON.parse(localStorage.getItem('jyc_recent_tracks')) || [];
    setRecentSearches(storedRecents);

    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');
    if (idFromUrl) {
      setTrackingCode(idFromUrl);
      fetchTrackingData(idFromUrl);
    }
  }, []);

  // --- Feature: Save to Local Storage ---
  const saveToRecentSearches = (code) => {
    const stored = JSON.parse(localStorage.getItem('jyc_recent_tracks')) || [];
    // Add new code to start, remove duplicates, keep only top 3
    const updated = [code, ...stored.filter(item => item !== code)].slice(0, 3);
    localStorage.setItem('jyc_recent_tracks', JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const fetchTrackingData = async (code) => {
    const sanitizedCode = code.trim().toUpperCase();
    
    if (sanitizedCode.length < 5) {
      setError('Please enter a valid tracking number (at least 5 characters).');
      return;
    }

    setError('');
    setIsLoading(true);
    setShipmentData(null);

    try {
      const docRef = doc(txtdb, "shipments", sanitizedCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rawData = docSnap.data();
        
        // --- Feature: Privacy Shield ---
        // Explicitly extract ONLY non-sensitive logistics data. 
        // Names, phones, emails, and cost are completely ignored.
        const safeData = {
          id: rawData.id,
          status: rawData.status || 'Processing',
          origin: rawData.origin,
          destination: rawData.destination,
          estimatedDelivery: rawData.estimatedDelivery,
          weight: rawData.weight,
          pieces: rawData.pieces,
          timeline: rawData.timeline || []
        };
        
        setShipmentData(safeData);
        saveToRecentSearches(safeData.id);

        // Update URL cleanly without reloading the page
        window.history.replaceState(null, '', `?id=${safeData.id}`);
      } else {
        setError("We couldn't find a shipment with that tracking ID. Please check the number and try again.");
      }
    } catch (err) {
      console.error("Error fetching tracking data:", err);
      setError("Unable to connect to the tracking server. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    fetchTrackingData(trackingCode);
  };

  const handleClear = () => {
    setTrackingCode('');
    setShipmentData(null);
    setError('');
    window.history.replaceState(null, '', window.location.pathname);
  };

  // --- Feature: Shareability ---
  const copyTrackingLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?id=${shipmentData.id}`;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Helper to determine stepper progress
  const currentStepIndex = shipmentData ? globalSteps.indexOf(shipmentData.status) : 0;
  const progressPercentage = currentStepIndex >= 0 ? (currentStepIndex / (globalSteps.length - 1)) * 100 : 0;

  return (
    <main className="tracking-page">
      
      {/* Search Header Section */}
      <section className="tracking-hero">
        <div className="tracking-hero-content">
          <h1>Track your shipment</h1>
          <p>Enter your JAYCONSTY. LOGISTICS. tracking or waybill number below to get real-time updates.</p>
          
          <form className="tracking-search-form" onSubmit={handleTrack}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="e.g. JYC-8472910" 
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                disabled={isLoading}
              />
              {trackingCode && (
                <button type="button" className="clear-btn" onClick={handleClear}>
                  <X size={18} />
                </button>
              )}
            </div>
            <button type="submit" className="track-btn" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Track Package'}
            </button>
          </form>
          {error && <span className="error-message">{error}</span>}

          {/* Feature: Recent Searches Cache */}
          {!shipmentData && recentSearches.length > 0 && (
            <div className="recent-searches">
              <span className="recent-label">Recent:</span>
              <div className="recent-pills">
                {recentSearches.map(code => (
                  <button key={code} type="button" className="recent-pill" onClick={() => {
                    setTrackingCode(code);
                    fetchTrackingData(code);
                  }}>
                    <Clock size={12} /> {code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {shipmentData && (
        <section className="tracking-results-section fade-in">
          <div className="results-container">
            
            {/* Top Status Card */}
            <div className="status-overview-card">
              <div className="status-header">
                <div>
                  <span className="tracking-label">Official Tracking Number</span>
                  <div className="title-row">
                    <h2>{shipmentData.id}</h2>
                    <button className="copy-link-btn" onClick={copyTrackingLink} title="Copy Tracking Link">
                      {isCopied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                      {isCopied ? 'Copied!' : 'Share'}
                    </button>
                  </div>
                </div>
                <div className={`status-badge ${shipmentData.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="dot"></span>
                  {shipmentData.status}
                </div>
              </div>

              {/* Feature: Visual Progress Stepper */}
              <div className="progress-stepper">
                <div className="progress-line-fill" style={{ width: `${progressPercentage}%` }}></div>
                
                {globalSteps.map((step, index) => {
                  let stepClass = '';
                  if (index < currentStepIndex) stepClass = 'completed';
                  else if (index === currentStepIndex) stepClass = 'active';

                  return (
                    <div key={step} className={`step ${stepClass}`}>
                      <div className="step-icon">
                        {index === 0 && <Package size={16} />}
                        {index === 1 && <Truck size={16} />}
                        {index === 2 && <MapPin size={16} />}
                        {index === 3 && <Home size={16} />}
                      </div>
                      <span className="step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="status-details-grid">
                <div className="detail-item">
                  <span className="detail-label"><MapPin size={14}/> Origin Route</span>
                  <span className="detail-value">{shipmentData.origin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><MapPin size={14}/> Destination</span>
                  <span className="detail-value">{shipmentData.destination}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><Calendar size={14}/> Est. Arrival</span>
                  <span className="detail-value highlight">{shipmentData.estimatedDelivery}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><Package size={14}/> Cargo Specs</span>
                  <span className="detail-value">{shipmentData.weight} • {shipmentData.pieces} Box(es)</span>
                </div>
              </div>
            </div>

            {/* Layout Grid for Timeline & Support */}
            <div className="tracking-content-grid">
              
              {/* Left Column: Timeline */}
              <div className="timeline-container">
                <h3>Logistics Timeline Feed</h3>
                <div className="timeline">
                  {shipmentData.timeline && shipmentData.timeline.map((event, index) => (
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
                  {(!shipmentData.timeline || shipmentData.timeline.length === 0) && (
                     <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Waiting for first scan...</p>
                  )}
                </div>
              </div>

              {/* Right Column: Support Action */}
              <div className="support-sidebar">
                <div className="support-card">
                  <div className="support-icon">
                    <MessageCircle size={28} color="#0052ff"/>
                  </div>
                  <h3>Need help with this shipment?</h3>
                  <p>If you notice any delays or have questions about customs clearance, our team is ready to assist.</p>
                  
                  <a href={`mailto:support@jayconsty.com?subject=Inquiry regarding tracking ${shipmentData.id}`} className="support-btn">
                    <Mail size={16} /> Contact Support
                  </a>
                  
                  <div className="support-phone">
                    <span>Or call our dispatch team directly:</span>
                    <a href="tel:08050622602"><Phone size={14}/> NG: 08050622602</a>
                    <a href="tel:+441234567890"><Phone size={14}/> UK: +44 123 456 7890</a>
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
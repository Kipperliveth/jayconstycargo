import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, getDocs, setDoc, doc, updateDoc, deleteDoc, query, orderBy, limit 
} from 'firebase/firestore';
import { txtdb, auth } from '../firebase-config';
import { 
  Plus, Layers, MessageSquare, LogOut, Menu, X, MapPin, 
  Calendar, Weight, Package, Check, Trash2, ArrowRight,
  User, Phone, Mail, Map, Save, Search, Activity, Star, Send,
  BarChart3, Printer, AlertCircle, Ship, Copy, Link, Clock, ShieldCheck
} from 'lucide-react';
import logo from "../assets/jayconsty-logo.png";
import './AdminDashboard.scss';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Toast & Copy State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [copiedId, setCopiedId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);
  const [copiedContact, setCopiedContact] = useState(null);

  // --- NEW: Custom Confirmation Modal States ---
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Storage State Arrays
  const [shipments, setShipments] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Reviews Specific Sorting & Filtering
  const [reviewSort, setReviewSort] = useState('newest'); 
  const [reviewVisibility, setReviewVisibility] = useState('all'); 

  // Create Waybill State
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [estDelivery, setEstDelivery] = useState('');
  const [weight, setWeight] = useState('');
  const [pieces, setPieces] = useState(1);
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [currency, setCurrency] = useState('GBP');
  
  // Success Confirmation State
  const [createdShipmentDetails, setCreatedShipmentDetails] = useState(null);

  // Shipment Modal State
  const [activeModalShipment, setActiveModalShipment] = useState(null);
  const [newStatusTitle, setNewStatusTitle] = useState('');
  const [newStatusLocation, setNewStatusLocation] = useState('');
  const [globalStatus, setGlobalStatus] = useState('Processing');

  // Review Modal State
  const [activeModalReview, setActiveModalReview] = useState(null);

  // Customer Profile Editing State
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const statusSuggestions = [
    "Shipment Information Received",
    "Cargo Received at Origin Warehouse",
    "Loaded into Shipping Container",
    "Customs Cleared at Origin Port",
    "Vessel Departed Origin Port",
    "Vessel Arrived at Transshipment Port",
    "Vessel Docked at Destination Port",
    "Container Unloaded from Vessel",
    "Customs Inspection In Progress",
    "Released by Customs Authority",
    "Arrived at Local Distribution Facility",
    "Out for Local Delivery",
    "Delivered Successfully"
  ];

  // --- FIREBASE: Auth Protection ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthLoading(false);
      } else {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // --- CUSTOM CONFIRM LOGOUT ---
  const confirmLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      showToast("Failed to log out.", "error");
      setIsLogoutModalOpen(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast("Tracking ID copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyLink = (id) => {
    const trackingUrl = `${window.location.origin}/tracking?id=${id}`;
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(id);
    showToast("Direct Tracking Link copied!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleCopyContact = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} copied!`);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (isAuthLoading) return;

    const fetchDatabase = async () => {
      try {
        setIsLoading(true);
        const shipmentsQuery = query(collection(txtdb, "shipments"), orderBy("id", "desc"), limit(100));
        const shipmentsSnap = await getDocs(shipmentsQuery);
        const shipmentsData = shipmentsSnap.docs.map(doc => doc.data());
        setShipments(shipmentsData);

        const reviewsSnap = await getDocs(collection(txtdb, "reviews"));
        const reviewsData = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);

      } catch (error) {
        console.error("Error fetching from Firebase:", error);
        showToast("Failed to connect to database.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabase();
  }, [isAuthLoading]);

  const pendingReviewsCount = reviews.filter(r => !r.isApproved).length;

  const displayedReviews = useMemo(() => {
    let result = [...reviews];
    if (reviewVisibility === 'pending') result = result.filter(r => !r.isApproved);
    else if (reviewVisibility === 'live') result = result.filter(r => r.isApproved);
    if (reviewSort === 'newest') return result.reverse();
    return result; 
  }, [reviews, reviewSort, reviewVisibility]);

  const estimatedCost = useMemo(() => {
    if (!weight) return 0;
    const baseRateGBP = 9; 
    const exchangeRate = 1850; 
    let cost = parseFloat(weight) * baseRateGBP;
    if (pieces > 1) cost += (pieces * 2); 
    if (currency === 'NGN') return `₦ ${(cost * exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `£ ${cost.toFixed(2)}`;
  }, [weight, pieces, currency]);

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    if (!origin || !destination || !estDelivery || !weight || !senderName || !senderPhone) {
      showToast("Please complete all required fields.", "error"); return;
    }
    setIsSubmitting(true);
    const uniqueId = `JYC-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newShipment = {
      id: uniqueId, status: 'Processing', origin, destination, estimatedDelivery: estDelivery,
      weight: `${weight} kg`, pieces: parseInt(pieces), estimatedCost,
      senderName, senderPhone, senderEmail, senderAddress, createdAt: `${formattedDate} • ${formattedTime}`,
      timeline: [{ date: formattedDate, time: formattedTime, title: 'Shipment Information Received', location: origin, status: 'current' }]
    };

    try {
      await setDoc(doc(txtdb, "shipments", uniqueId), newShipment);
      setShipments([newShipment, ...shipments]);
      setOrigin(''); setDestination(''); setEstDelivery(''); setWeight(''); setPieces(1);
      setSenderName(''); setSenderPhone(''); setSenderEmail(''); setSenderAddress('');
      setCreatedShipmentDetails(newShipment);
      showToast("Waybill created successfully!");
    } catch (error) { showToast("Failed to create waybill.", "error"); } 
    finally { setIsSubmitting(false); }
  };

  const openShipmentModal = (shipment) => {
    setActiveModalShipment(shipment); setGlobalStatus(shipment.status); setNewStatusTitle(''); setNewStatusLocation('');
    setEditName(shipment.senderName || ''); setEditPhone(shipment.senderPhone || ''); setEditEmail(shipment.senderEmail || ''); setEditAddress(shipment.senderAddress || ''); setIsEditingCustomer(false);
  };

  const handleUpdateCustomerProfile = async (e) => {
    e.preventDefault();
    try {
      const shipmentRef = doc(txtdb, "shipments", activeModalShipment.id);
      const updates = { senderName: editName, senderPhone: editPhone, senderEmail: editEmail, senderAddress: editAddress };
      await updateDoc(shipmentRef, updates);
      const updatedList = shipments.map(s => s.id === activeModalShipment.id ? { ...s, ...updates } : s);
      setShipments(updatedList); setActiveModalShipment(updatedList.find(s => s.id === activeModalShipment.id)); setIsEditingCustomer(false);
      showToast("Customer profile updated.");
    } catch (error) { showToast("Failed to update profile.", "error"); }
  };

  const handleModalStatusUpdate = async (e) => {
    e.preventDefault();
    if (!newStatusTitle || !newStatusLocation || !activeModalShipment) return;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const adjustedTimeline = activeModalShipment.timeline.map(step => step.status === 'current' ? { ...step, status: 'completed' } : step);
    const newTimelineEvent = { date: formattedDate, time: formattedTime, title: newStatusTitle, location: newStatusLocation, status: 'current' };
    const updatedShipmentData = { status: globalStatus, timeline: [...adjustedTimeline, newTimelineEvent] };

    try {
      const shipmentRef = doc(txtdb, "shipments", activeModalShipment.id);
      await updateDoc(shipmentRef, updatedShipmentData);
      const updatedList = shipments.map(s => s.id === activeModalShipment.id ? { ...s, ...updatedShipmentData } : s);
      setShipments(updatedList); setActiveModalShipment(updatedList.find(s => s.id === activeModalShipment.id));
      setNewStatusTitle(''); setNewStatusLocation(''); showToast("Logistics tracking updated!");
    } catch (error) { showToast("Failed to broadcast update.", "error"); }
  };

  const handleApproveReview = async (id) => {
    try {
      await updateDoc(doc(txtdb, "reviews", id), { isApproved: true });
      setReviews(reviews.map(rev => rev.id === id ? { ...rev, isApproved: true } : rev));
      setActiveModalReview(null); showToast("Review approved and published.");
    } catch (error) { showToast("Failed to approve review.", "error"); }
  };

  // --- CUSTOM CONFIRM REVIEW DELETION ---
  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;
    try {
      await deleteDoc(doc(txtdb, "reviews", reviewToDelete));
      setReviews(reviews.filter(rev => rev.id !== reviewToDelete));
      setActiveModalReview(null); 
      showToast("Review successfully deleted.");
    } catch (error) { 
      showToast("Failed to delete review.", "error"); 
    } finally {
      setReviewToDelete(null);
    }
  };

  const filteredShipments = shipments.filter(ship => {
    const matchesSearch = ship.id.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                          ship.origin.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                          ship.destination.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                          (ship.senderName && ship.senderName.toLowerCase().includes(debouncedQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || ship.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handlePrint = () => window.print();

  if (isAuthLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  const renderShipmentTable = (data) => (
    <div className="clean-panel no-padding mobile-edge-to-edge hide-on-print">
      <table className="data-table shipment-table">
        <thead>
          <tr>
            <th>Tracking ID</th><th>Status</th><th>Customer</th><th>Route</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan="4" className="empty-state">Loading data from Firebase...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan="4" className="empty-state">No shipments found matching criteria.</td></tr>
          ) : (
            data.map((ship) => (
              <tr key={ship.id} className="clickable-row list-item-mobile" onClick={() => openShipmentModal(ship)}>
                <td data-label="Tracking ID" className="bold-text id-cell">{ship.id}</td>
                <td data-label="Status" className="status-cell"><span className={`badge badge-${ship.status.toLowerCase().replace(/\s+/g, '-')}`}>{ship.status}</span></td>
                <td data-label="Customer" className="truncate-text customer-cell"><span className="mobile-label">Customer: </span>{ship.senderName || 'N/A'}</td>
                <td data-label="Route" className="route-cell">
                  <div className="route-flex"><span className="route-text">{ship.origin}</span><ArrowRight size={14} className="icon-muted" /><span className="route-text">{ship.destination}</span></div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-container">
      
      <div className={`toast-container ${toast.show ? 'show' : ''} ${toast.type}`}>
        {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
        <span>{toast.message}</span>
      </div>

      <header className="mobile-navbar hide-on-print">
        <div className="mobile-brand">
          <img src={logo} alt="JAYCONSTY. LOGISTICS." className="brand-logo-img" />
        </div>
        <button className="menu-trigger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="sidebar-overlay hide-on-print" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`admin-sidebar hide-on-print ${isMobileMenuOpen ? 'sidebar-visible' : ''}`}>
        <div className="brand-workspace">
          <img src={logo} alt="JAYCONSTY. LOGISTICS." className="brand-logo-img-large" />
        </div>

        <nav className="workspace-nav">
          <button className={`nav-link ${activeTab === 'overview' ? 'active-link' : ''}`} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}>
            <BarChart3 size={18} /><span>Overview</span>
          </button>
          
          <button className={`nav-link ${activeTab === 'create-waybill' ? 'active-link' : ''}`} onClick={() => { setActiveTab('create-waybill'); setIsMobileMenuOpen(false); }}>
            <Plus size={18} /><span>Create Waybill</span>
          </button>
          
          <button className={`nav-link ${activeTab === 'manage-shipments' ? 'active-link' : ''}`} onClick={() => { setActiveTab('manage-shipments'); setIsMobileMenuOpen(false); }}>
            <Layers size={18} /><span>Manage Shipments</span>
          </button>
          
          <button className={`nav-link ${activeTab === 'reviews' ? 'active-link' : ''}`} onClick={() => { setActiveTab('reviews'); setIsMobileMenuOpen(false); }}>
            <MessageSquare size={18} />
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              Manage Reviews
              {pendingReviewsCount > 0 && <span className="nav-badge">{pendingReviewsCount}</span>}
            </span>
          </button>
        </nav>

        <div className="sidebar-base">
          {/* Replaced native confirm with our custom modal trigger */}
          <button className="signout-trigger" onClick={() => setIsLogoutModalOpen(true)}>
            <LogOut size={18} /><span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="admin-viewport">
        
        {activeTab === 'overview' && (
          <div className="viewport-segment fade-in hide-on-print">
            <div className="segment-header">
              <h1>Logistics Overview</h1>
              <p>Command center for JAYCONSTY operations and key metrics.</p>
            </div>

            <div className="overview-grid">
              <div className="metric-card">
                <div className="icon-box primary"><Ship size={24} /></div>
                <div className="metric-data">
                  <span className="label">Active Shipments</span>
                  <h2>{shipments.filter(s => s.status !== 'Delivered').length}</h2>
                </div>
              </div>
              <div className="metric-card">
                <div className="icon-box success"><Check size={24} /></div>
                <div className="metric-data">
                  <span className="label">Completed Deliveries</span>
                  <h2>{shipments.filter(s => s.status === 'Delivered').length}</h2>
                </div>
              </div>
              <div className="metric-card">
                <div className="icon-box warning"><MessageSquare size={24} /></div>
                <div className="metric-data">
                  <span className="label">Pending Reviews</span>
                  <h2>{pendingReviewsCount}</h2>
                </div>
              </div>
            </div>

            <div className="recent-creations mobile-colored-bg" style={{ marginTop: '2rem' }}>
              <div className="panel-title-flex mobile-padded">
                <h2>Recent Operations</h2>
                <button onClick={() => setActiveTab('manage-shipments')} className="quick-link-btn">
                  View full database <ArrowRight size={14} />
                </button>
              </div>
              {renderShipmentTable(shipments.slice(0, 5))}
            </div>
          </div>
        )}

        {activeTab === 'create-waybill' && (
          <div className="viewport-segment fade-in hide-on-print">
            <div className="segment-header">
              <h1>Create Waybill</h1>
              <p>Add a new sea freight shipment and calculate logistics costs.</p>
            </div>

            <div className="grid-split-layout">
              <div className="clean-panel form-panel">
                <div className="panel-title mobile-padded">
                  <h2>Shipment & Customer Details</h2>
                </div>
                
                <div className="mobile-padded">
                  <form onSubmit={handleCreateShipment} className="form-grid">
                    <div className="form-section-title">Customer Information</div>
                    <div className="input-row-half">
                      <div className="input-group">
                        <label>Sender Name</label>
                        <div className="input-wrapper"><User size={16} /><input type="text" placeholder="e.g. John Doe" value={senderName} onChange={(e) => setSenderName(e.target.value)} required /></div>
                      </div>
                      <div className="input-group">
                        <label>Phone Number</label>
                        <div className="input-wrapper"><Phone size={16} /><input type="text" placeholder="+234..." value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} required /></div>
                      </div>
                    </div>

                    <div className="input-row-half">
                      <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper"><Mail size={16} /><input type="email" placeholder="john@example.com" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} /></div>
                      </div>
                      <div className="input-group">
                        <label>Physical Address</label>
                        <div className="input-wrapper"><Map size={16} /><input type="text" placeholder="123 Example Street" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} /></div>
                      </div>
                    </div>

                    <hr className="form-divider" />

                    <div className="form-section-title">Freight & Logistics Matrix</div>
                    <div className="input-row-half">
                      <div className="input-group">
                        <label>Origin Port</label>
                        <div className="input-wrapper"><MapPin size={16} /><input type="text" placeholder="e.g. London Gateway Port" value={origin} onChange={(e) => setOrigin(e.target.value)} required /></div>
                      </div>
                      <div className="input-group">
                        <label>Destination Port</label>
                        <div className="input-wrapper"><MapPin size={16} /><input type="text" placeholder="e.g. Onne Port Complex" value={destination} onChange={(e) => setDestination(e.target.value)} required /></div>
                      </div>
                    </div>

                    <div className="pricing-estimation-box">
                      <div className="input-row-half" style={{ marginBottom: '1rem' }}>
                        <div className="input-group">
                          <label>Total Weight (kg)</label>
                          <div className="input-wrapper"><Weight size={16} /><input type="number" step="0.1" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required /></div>
                        </div>
                        <div className="input-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>Pieces / Volume</label>
                            <label className="currency-toggle" onClick={() => setCurrency(currency === 'GBP' ? 'NGN' : 'GBP')}>Toggle to {currency === 'GBP' ? '🇳🇬 NGN' : '🇬🇧 GBP'}</label>
                          </div>
                          <div className="input-wrapper"><Package size={16} /><input type="number" value={pieces} onChange={(e) => setPieces(e.target.value)} min="1" required /></div>
                        </div>
                      </div>
                      <div className="estimation-result">
                        <span className="est-label">Estimated Cost ({currency === 'GBP' ? '🇬🇧 GBP' : '🇳🇬 NGN'}):</span>
                        <span className="est-val">{estimatedCost || 'Enter weight'}</span>
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Expected Delivery Date</label>
                      <div className="input-wrapper"><Calendar size={16} /><input type="text" placeholder="e.g. July 22, 2026" value={estDelivery} onChange={(e) => setEstDelivery(e.target.value)} required /></div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing Network Request...' : 'Generate Waybill & Record Shipment'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manage-shipments' && (
          <div className="viewport-segment fade-in hide-on-print">
            <div className="segment-header">
              <h1>Manage Shipments</h1>
              <p>Search and open active records to mutate profiles or broadcast tracking events.</p>
            </div>

            <div className="filter-controls-wrapper mobile-padded-input">
              <div className="search-container">
                <Search size={20} />
                <input type="text" placeholder="Search by Tracking ID, Name, Port, or Status..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="filter-pills">
                {['All', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'].map(status => (
                  <button key={status} className={`pill ${statusFilter === status ? 'active' : ''}`} onClick={() => setStatusFilter(status)}>{status}</button>
                ))}
              </div>
            </div>

            {renderShipmentTable(filteredShipments)}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="viewport-segment fade-in hide-on-print">
            
            <div className="segment-header">
              <h1>Review List {pendingReviewsCount > 0 && <span className="title-badge">{pendingReviewsCount}</span>}</h1>
              <p>These are the feedback submissions corresponding to your shipments. You can approve or delete them.</p>
            </div>

            <div className="reviews-list-layout">
              
              <div className="reviews-main-column">
                {isLoading ? (
                  <div className="empty-state">Loading feedback data...</div>
                ) : displayedReviews.length === 0 ? (
                  <div className="empty-state">No reviews match the current filter.</div>
                ) : (
                  displayedReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className={`review-list-card ${!rev.isApproved ? 'status-pending' : ''}`}
                      onClick={() => setActiveModalReview(rev)}
                    >
                      <div className="rlc-top">
                        <span className="rlc-meta">Reviewer: <strong>{rev.name}</strong></span>
                        <span className="rlc-meta meta-right">
                          <span className={`badge badge-${rev.isApproved ? 'live' : 'pending'}`} style={{ marginRight: '8px' }}>
                            {rev.isApproved ? 'Live' : 'Pending'}
                          </span>
                          Rating: {rev.rating}/5
                        </span>
                      </div>
                      
                      <div className="rlc-mid">
                        <div className="rlc-icon">
                          {(rev.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="rlc-text">
                          <p>{rev.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="reviews-side-column">
                <div className="side-filter-box">
                  <h4>See question list of:</h4>
                  <label className="radio-label">
                    <input type="radio" name="visibility" value="all" checked={reviewVisibility === 'all'} onChange={() => setReviewVisibility('all')} />
                    Everyone ({reviews.length})
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="visibility" value="pending" checked={reviewVisibility === 'pending'} onChange={() => setReviewVisibility('pending')} />
                    Pending Approval ({pendingReviewsCount})
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="visibility" value="live" checked={reviewVisibility === 'live'} onChange={() => setReviewVisibility('live')} />
                    Live on Site ({reviews.length - pendingReviewsCount})
                  </label>

                  <hr className="filter-divider" />
                  
                  <h4>Sort Chronology:</h4>
                  <select className="sort-select" value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <div className="side-tip-box">
                  <div className="tip-avatar"><ShieldCheck size={16} /></div>
                  <h4>Admin Integrity</h4>
                  <p>We recommend reading through every comment thoroughly. Mix both open feedback and high ratings to allow the participants to better reflect on your services.</p>
                  <p className="tip-sub">Currently <strong>{pendingReviewsCount} reviews</strong> require your immediate attention.</p>
                </div>
              </div>
            </div>
            
          </div>
        )}

      </main>

      {/* --- CREATION SUCCESS MODAL --- */}
      {createdShipmentDetails && (
        <div className="pinterest-modal-overlay hide-on-print" onClick={() => setCreatedShipmentDetails(null)}>
          <div className="pinterest-modal success-modal-size" onClick={(e) => e.stopPropagation()}>
            <div className="p-modal-header">
              <div className="identity-block"><span className="id-pill">Shipment Created</span></div>
              <button className="close-x-btn" onClick={() => setCreatedShipmentDetails(null)}><X size={20} /></button>
            </div>
            <div className="p-modal-body no-grid-body success-body">
              <div className="success-icon-wrapper"><Check size={32} /></div>
              <h2>Waybill Generated!</h2>
              <p>The shipment has been successfully recorded and synced to the cloud.</p>
              <div className="tracking-display">
                <span className="label">Official Tracking ID</span>
                <div className="tracking-number-box">
                  <span>{createdShipmentDetails.id}</span>
                  <div className="copy-actions-group">
                    <button className="copy-btn-inline" onClick={() => handleCopyId(createdShipmentDetails.id)} title="Copy ID Only">{copiedId === createdShipmentDetails.id ? <Check size={20} color="#10b981"/> : <Copy size={20}/>}</button>
                    <button className="copy-btn-inline" onClick={() => handleCopyLink(createdShipmentDetails.id)} title="Copy Tracking Link">{copiedLink === createdShipmentDetails.id ? <Check size={20} color="#10b981"/> : <Link size={20}/>}</button>
                  </div>
                </div>
              </div>
              <div className="success-actions">
                <button className="btn btn-primary" onClick={() => { const shipData = createdShipmentDetails; setCreatedShipmentDetails(null); openShipmentModal(shipData); }}>Manage Document</button>
                <button className="btn btn-secondary" onClick={() => setCreatedShipmentDetails(null)}>Create Another</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SHIPMENT PINTEREST MODAL (PRINTABLE) --- */}
      {activeModalShipment && (
        <div className="pinterest-modal-overlay print-overlay" onClick={() => setActiveModalShipment(null)}>
          <div className="pinterest-modal print-modal" onClick={(e) => e.stopPropagation()}>
            <div className="p-modal-header">
              <div className="identity-block">
                <span className="id-pill">{activeModalShipment.id}</span>
                <div className="copy-actions-group print-hide">
                  <button className="copy-btn-inline" onClick={() => handleCopyId(activeModalShipment.id)} title="Copy ID Only">{copiedId === activeModalShipment.id ? <Check size={16} color="#10b981"/> : <Copy size={16}/>}</button>
                  <button className="copy-btn-inline" onClick={() => handleCopyLink(activeModalShipment.id)} title="Copy Tracking Link">{copiedLink === activeModalShipment.id ? <Check size={16} color="#10b981"/> : <Link size={16}/>}</button>
                </div>
                <span className={`badge badge-${activeModalShipment.status.toLowerCase().replace(/\s+/g, '-')} print-hide`}>{activeModalShipment.status}</span>
              </div>
              <div className="header-actions print-hide" style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary print-btn" onClick={handlePrint} style={{ height: '32px', padding: '0 12px', fontSize: '0.8rem' }}><Printer size={14} style={{ marginRight: '6px' }}/> Print Waybill</button>
                <button className="close-x-btn" onClick={() => setActiveModalShipment(null)}><X size={20} /></button>
              </div>
            </div>

            <div className="print-only-header">
              <img src={logo} alt="JAYCONSTY LOGISTICS" className="print-logo" />
              <h2>JAYCONSTY CARGO LOGISTICS SERVICES</h2>
              <p>Official Cargo Waybill Document</p>
              <hr />
              <div className="print-meta-bar">
                <p><strong>Tracking ID:</strong> {activeModalShipment.id}</p>
                <p><strong>Date Issued:</strong> {activeModalShipment.createdAt || (activeModalShipment.timeline && activeModalShipment.timeline[0]?.date) || 'N/A'}</p>
              </div>
            </div>

            <div className="p-modal-body">
              <div className="p-modal-col left-info-card">
                <div className="pinterest-card profile-card mobile-edge-card">
                  <div className="card-header-flex print-hide">
                    <h3>Customer Profile</h3>
                    <button type="button" className="card-action-link" onClick={() => setIsEditingCustomer(!isEditingCustomer)}>{isEditingCustomer ? 'Cancel' : 'Edit Details'}</button>
                  </div>
                  <h3 className="print-only-title">Shipper Information</h3>

                  {isEditingCustomer ? (
                    <form onSubmit={handleUpdateCustomerProfile} className="inline-edit-form print-hide">
                      <div className="mini-input-group"><label>Sender Name</label><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required /></div>
                      <div className="mini-input-group"><label>Phone Number</label><input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} required /></div>
                      <div className="mini-input-group"><label>Email Address</label><input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} /></div>
                      <div className="mini-input-group"><label>Physical Address</label><input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} /></div>
                      <button type="submit" className="btn btn-save-profile"><Save size={14} /> Save Profile</button>
                    </form>
                  ) : (
                    <div className="profile-display-list">
                      <div className="display-item"><span className="label">Name</span><span className="value">{activeModalShipment.senderName || 'N/A'}</span></div>
                      <div className="display-item"><span className="label">Phone</span><span className="value">{activeModalShipment.senderPhone || 'N/A'}</span></div>
                      <div className="display-item"><span className="label">Email</span><span className="value email-link">{activeModalShipment.senderEmail || 'N/A'}</span></div>
                      <div className="display-item"><span className="label">Address</span><span className="value">{activeModalShipment.senderAddress || 'N/A'}</span></div>
                    </div>
                  )}
                </div>

                <div className="pinterest-card manifest-card mobile-edge-card">
                  <h3 className="print-hide">Freight Parameters</h3>
                  <h3 className="print-only-title">Consignment Details</h3>
                  <div className="manifest-grid">
                    <div className="m-item"><span className="m-label">Origin Route</span><span className="m-val">{activeModalShipment.origin}</span></div>
                    <div className="m-item"><span className="m-label">Destination Route</span><span className="m-val">{activeModalShipment.destination}</span></div>
                    <div className="m-item"><span className="m-label">Weight Matrix</span><span className="m-val">{activeModalShipment.weight}</span></div>
                    <div className="m-item"><span className="m-label">Cargo Volume</span><span className="m-val">{activeModalShipment.pieces} Container Unit Pcs</span></div>
                    {activeModalShipment.estimatedCost && (
                      <div className="m-item full-width-item"><span className="m-label">Assessed Logistics Value</span><span className="m-val scheduled-date" style={{ color: '#0f172a' }}>{activeModalShipment.estimatedCost}</span></div>
                    )}
                    <div className="m-item full-width-item"><span className="m-label">Target Arrival Schedule</span><span className="m-val scheduled-date">{activeModalShipment.estimatedDelivery}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-modal-col right-tracking-card print-hide">
                <div className="pinterest-card controller-card mobile-edge-card">
                  <div className="card-header-flex-icon">
                    <Activity size={18} className="icon-brand" />
                    <h3>Broadcast Center</h3>
                  </div>

                  <form onSubmit={handleModalStatusUpdate} className="modern-panel-form">
                    <div className="input-field-stack">
                      <label>Milestone Tracking Event</label>
                      <select value={newStatusTitle} onChange={(e) => setNewStatusTitle(e.target.value)} required>
                        <option value="">-- Choose Status Event --</option>
                        {statusSuggestions.map((step, idx) => <option key={idx} value={step}>{step}</option>)}
                      </select>
                    </div>

                    <div className="input-field-row">
                      <div className="input-field-stack">
                        <label>Event Location Coordinate</label>
                        <input type="text" placeholder="e.g. Onne Sea Port" value={newStatusLocation} onChange={(e) => setNewStatusLocation(e.target.value)} required />
                      </div>
                      <div className="input-field-stack">
                        <label>Global Lifecycle Status</label>
                        <select value={globalStatus} onChange={(e) => setGlobalStatus(e.target.value)}>
                          <option value="Processing"><span className="status-dot processing"></span>Processing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-broadcast">Transmit Logistics Update</button>
                  </form>
                </div>

                <div className="pinterest-card logs-card mobile-edge-card print-show-later">
                  <h3>Historical Timeline Feed</h3>
                  <div className="p-timeline">
                    {activeModalShipment.timeline && activeModalShipment.timeline.map((step, index) => (
                      <div key={index} className={`timeline-node-box ${step.status === 'current' ? 'latest' : ''}`}>
                        <div className="node-indicator">
                          <div className="dot"></div>
                          {index !== activeModalShipment.timeline.length - 1 && <div className="line"></div>}
                        </div>
                        <div className="node-content">
                          <div className="node-meta">{step.date} • {step.time}</div>
                          <h4 className="node-title">{step.title}</h4>
                          <span className="node-loc">{step.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="print-only-footer">
                <div className="signature-grid">
                  <div className="sig-line"><p>Shipper's Signature / Date</p></div>
                  <div className="sig-line"><p>Authorized Agent Signature</p></div>
                </div>
                <div className="stamp-container">
                  <div className="jayconsty-stamp">JAYCONSTY<br/>VALIDATED</div>
                </div>
                <hr />
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Document generated via JAYCONSTY CARGO LOGISTICS SERVICES Internal Tracking Protocol.</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- REVIEW DETAILED MODAL --- */}
      {activeModalReview && (
        <div className="pinterest-modal-overlay hide-on-print" onClick={() => setActiveModalReview(null)}>
          <div className="pinterest-modal review-modal-size" onClick={(e) => e.stopPropagation()}>
            <div className="p-modal-header">
              <div className="identity-block">
                <span className="id-pill">Review Details</span>
                <span className={`badge badge-${activeModalReview.isApproved ? 'live' : 'pending'}`}>
                  {activeModalReview.isApproved ? 'Live on Site' : 'Pending Approval'}
                </span>
              </div>
              <button className="close-x-btn" onClick={() => setActiveModalReview(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-modal-body no-grid-body">
              <div className="pinterest-card mobile-edge-card">
                
                <div className="review-meta-header">
                  <div className="reviewer-avatar" style={{ backgroundColor: '#2563eb' }}>
                    {(activeModalReview.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-info">
                    <h3>{activeModalReview.name}</h3>
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < activeModalReview.rating ? "#f59e0b" : "#e2e8f0"} color={i < activeModalReview.rating ? "#f59e0b" : "#e2e8f0"} />
                      ))}
                      <span className="review-date">{activeModalReview.date || 'Recent'}</span>
                    </div>
                  </div>
                </div>

                <div className="review-full-text">
                  <p>"{activeModalReview.comment}"</p>
                </div>

                <div className="reviewer-contact-block">
                   {activeModalReview.email && (
                     <div className="contact-row-flex">
                       <Mail size={16} className="icon-muted" />
                       <span className="label">Email:</span> 
                       <span className="value">{activeModalReview.email}</span>
                       <button className="copy-btn-inline" onClick={() => handleCopyContact(activeModalReview.email, 'email')} title="Copy Email">
                         {copiedContact === 'email' ? <Check size={14} color="#10b981"/> : <Copy size={14}/>}
                       </button>
                     </div>
                   )}
                   {activeModalReview.phone && (
                     <div className="contact-row-flex">
                       <Phone size={16} className="icon-muted" />
                       <span className="label">Phone:</span> 
                       <span className="value">{activeModalReview.phone}</span>
                       <button className="copy-btn-inline" onClick={() => handleCopyContact(activeModalReview.phone, 'phone')} title="Copy Phone">
                         {copiedContact === 'phone' ? <Check size={14} color="#10b981"/> : <Copy size={14}/>}
                       </button>
                     </div>
                   )}
                </div>

                <div className="review-actions-footer">
                  {!activeModalReview.isApproved && (
                    <button className="btn btn-approve" onClick={() => handleApproveReview(activeModalReview.id)}>
                      <Check size={16} /> Approve & Publish
                    </button>
                  )}
                  
                  {activeModalReview.email && (
                    <button className="btn btn-contact" onClick={() => window.location.href = `mailto:${activeModalReview.email}?subject=Regarding your recent experience with JAYCONSTY.`}>
                      <Send size={16} /> Contact Customer
                    </button>
                  )}

                  {/* Replaced native confirm with our custom modal trigger */}
                  <button className="btn btn-delete-alt" onClick={() => setReviewToDelete(activeModalReview.id)}>
                    <Trash2 size={16} /> Delete Review
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL: LOGOUT --- */}
      {isLogoutModalOpen && (
        <div className="confirm-modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
          <div className="confirm-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon warning-icon">
              <LogOut size={28} />
            </div>
            <h3>End Session?</h3>
            <p>You are about to log out of the JAYCONSTY Admin Dashboard. Unsaved changes will be lost.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
              <button className="btn-confirm-danger" onClick={confirmLogout}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL: DELETE REVIEW --- */}
      {reviewToDelete && (
        <div className="confirm-modal-overlay" onClick={() => setReviewToDelete(null)}>
          <div className="confirm-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon danger-icon">
              <Trash2 size={28} />
            </div>
            <h3>Delete Review?</h3>
            <p>Are you sure you want to permanently delete this client review? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setReviewToDelete(null)}>Cancel</button>
              <button className="btn-confirm-danger" onClick={confirmDeleteReview}>Delete Review</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
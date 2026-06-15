import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  collection, getDocs, getDoc, doc, addDoc, query, where 
} from 'firebase/firestore';
import { txtdb } from '../firebase-config';
import { 
  ArrowRight, Package, Globe, ShieldCheck, 
  ArrowUpRight, ChevronDown, ChevronUp, MessageCircle,
  Star, X, CheckCircle
} from 'lucide-react';

import cargo1 from "../assets/cargo1.jpg";
import cargo2 from "../assets/cargo2.jpg";
import cargo3 from "../assets/cargo3.jpg";
import cargo4 from "../assets/cargo4.jpg";

function Home() {
  // --- STATE ---
  const [openFaq, setOpenFaq] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false); 
  
  // Reviews Data State
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Review Submission Flow State
  const [reviewStep, setReviewStep] = useState(1); // 1: Verify, 2: Write Review, 3: Success
  const [orderNumber, setOrderNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // Form Field State
  const [revName, setRevName] = useState('');
  const [revEmail, setRevEmail] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // --- HANDLERS ---
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      // Reset form state when opening
      setReviewStep(1);
      setOrderNumber('');
      setVerifyError('');
      setRevName('');
      setRevEmail('');
      setRevComment('');
      setRevRating(5);
    }
  };

  const toggleSeeAllModal = () => setIsSeeAllOpen(!isSeeAllOpen);

  // --- FIREBASE: FETCH APPROVED REVIEWS ---
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const q = query(collection(txtdb, "reviews"), where("isApproved", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort newest first
        setReviews(fetchedReviews.reverse());
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchApprovedReviews();
  }, []);

  // --- FIREBASE: VERIFY SHIPMENT ID ---
  const handleVerifyTracking = async (e) => {
    e.preventDefault();
    if (!orderNumber) return;

    setIsVerifying(true);
    setVerifyError('');

    try {
      const docRef = doc(txtdb, "shipments", orderNumber.trim().toUpperCase());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setRevName(data.senderName || '');
        setRevEmail(data.senderEmail || '');
        setReviewStep(2); // Move to review form
      } else {
        setVerifyError("Order number not found. Please verify your tracking ID.");
      }
    } catch (err) {
      console.error(err);
      setVerifyError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // --- FIREBASE: SUBMIT REVIEW FOR APPROVAL ---
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!revName || !revComment) return;

    setIsSubmittingReview(true);
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      await addDoc(collection(txtdb, "reviews"), {
        name: revName,
        email: revEmail,
        rating: parseInt(revRating),
        comment: revComment,
        date: formattedDate,
        isApproved: false // Admin must approve before it shows on site
      });
      
      setReviewStep(3); // Move to success confirmation
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // --- DATA ---
  const faqData = [
    { question: "How do I get my dedicated UK warehouse address?", answer: "Once you create a free account with Jayconsty Cargo, your dashboard will display your unique UK warehouse address along with your personal customer identification code. Use this address at checkout whenever you shop from UK online retailers." },
    { question: "Can you shop on my behalf if a UK store doesn't accept my Nigerian card?", answer: "Yes! We offer a dedicated Procurement Service. Simply send us the links to the items you want to buy, and we will handle the purchase using our local UK payment methods and have them processed directly into your shipping queue." },
    { question: "Do you offer shipment consolidation?", answer: "Absolutely. If you buy from multiple UK retailers (e.g., ASOS, Amazon, Zara), we can hold your items at our London hub for up to 14 days free of charge, combine them into a single package, and ship them together to save you significant freight costs." },
    { question: "What is the minimum weight requirement for shipping?", answer: "For Air Freight, our minimum shipping weight is 2kg. For items below this weight, the 2kg minimum charge applies. For Sea Freight, our minimum volume requirement is 0.1 CBM." },
    { question: "What is volumetric weight, and how does it affect my cost?", answer: "International courier rules dictate that freight is charged on whichever value is greater: actual physical weight or volumetric (space occupied) weight. Volumetric weight is calculated as (Length × Width × Height in cm) ÷ 5000. Large, lightweight items like pillows or suitcases are usually billed on volume." },
    { question: "Are your rates fully inclusive of customs clearing in Nigeria?", answer: "Yes, our quoted rates are end-to-end and include standard customs clearance paperwork and port fees in Nigeria. The price you are quoted for weight or volume is the final price you pay to receive your goods at our main depots." },
    { question: "When are your weekly cutoff dates for dispatches?", answer: "Our Air Freight cutoff is every Thursday at 4:00 PM UK time for our Friday departure flight. Our Sea Freight containers are loaded and sealed on the 1st and 3rd Saturday of every month." },
    { question: "How long does it take for goods to get to states outside Lagos?", answer: "Once your Air Freight cargo arrives in Lagos (3-5 business days), forwarding to other regions like Abuja, Port Harcourt, or Enugu typically adds an additional 2-3 business days depending on local interstate transport links." },
    { question: "Can I ship perfumes, spray deodorants, or cosmetics?", answer: "Perfumes and pressurized aerosol cans are classified as 'Dangerous Goods' by airlines due to flammability. They cannot travel on standard Air Freight. However, they can be securely packed and shipped safely via our Sea Freight routes." },
    { question: "Can I ship high-value electronics, phones, and laptops?", answer: "Yes, we ship electronics weekly. However, high-value devices must be explicitly declared upon arrival at our UK hub for specialized handling and security tracking. These items are subject to a standard electronics handling clearing fee." },
    { question: "Do you offer doorstep delivery across Nigeria?", answer: "Yes, we offer final-mile doorstep delivery to homes and offices nationwide for an additional local delivery fee. Alternatively, you can choose free self-pickup from our main destination depots in Lagos and Port Harcourt." },
    { question: "Is my shipment insured against loss or damage?", answer: "Every shipment is automatically covered up to a standard value of £50. For high-value commercial shipments, luxury goods, or electronics, we strongly advise purchasing our optional Extended Cargo Insurance, which covers up to 100% of the declared invoice value." }
  ];

  return (
    <main className="home">

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">Seamless shipping between the UK and Nigeria.</h1>
            <p className="hero__subtitle">
              Jayconsty Cargo provides fast, secure, and reliable procurement and logistics. Whether you are moving goods from London to Port Harcourt or vice versa, we make it effortless.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--primary">Get a Quote</Link>
              <Link to="/tracking" className="btn btn--text">
                or Track a Shipment <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero__trust">
              <p>Trusted by businesses for consistent UK-NGA deliveries</p>
            </div>
          </div>

          <div className="hero__visuals">
             <div className="hero__graphic">
                <div className="float-card float-card--1"><Package size={24} /></div>
                <div className="float-card float-card--2"><Globe size={20} /></div>
                <div className="float-card float-card--3"><ShieldCheck size={24} /></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GALLERY SECTION --- */}
      <section className="services-gallery">
        <div className="services-gallery__header gallery-header">
          <h2>Our Core Services</h2>
          <p>End-to-end logistics solutions managed professionally for secure UK-NGA deliveries.</p>
        </div>

        <div className="services-gallery__grid gallery-grid">
          <div className="gallery-card" style={{ backgroundImage: `url(${cargo1})` }}>
            <div className="gallery-card__frost-overlay"></div>
            <div className="gallery-card__gradient-overlay"></div>
            <span className="gallery-card__number">01</span>
            <div className="gallery-card__content">
              <h3 className="gallery-card__title">Quality management system</h3>
              <p className="gallery-card__desc">Reliable, cost-effective sea freight and container shipping for heavy goods and bulk commercial cargo.</p>
            </div>
            <button className="gallery-card__btn" aria-label="Learn more"><ArrowUpRight size={18} /></button>
          </div>

          <div className="gallery-card" style={{ backgroundImage: `url(${cargo2})` }}>
            <div className="gallery-card__frost-overlay"></div>
            <div className="gallery-card__gradient-overlay"></div>
            <span className="gallery-card__number">02</span>
            <div className="gallery-card__content">
              <h3 className="gallery-card__title">E-commerce logistics solution</h3>
              <p className="gallery-card__desc">Personal shopping and consolidation services. We handle your purchases from UK stores and ship directly to Nigeria.</p>
            </div>
            <button className="gallery-card__btn" aria-label="Learn more"><ArrowUpRight size={18} /></button>
          </div>

          <div className="gallery-card" style={{ backgroundImage: `url(${cargo3})` }}>
            <div className="gallery-card__frost-overlay"></div>
            <div className="gallery-card__gradient-overlay"></div>
            <span className="gallery-card__number">03</span>
            <div className="gallery-card__content">
              <h3 className="gallery-card__title">Logistics & Aftermarket logistics</h3>
              <p className="gallery-card__desc">Secure warehousing facilities to consolidate multiple orders or store your goods safely before dispatch.</p>
            </div>
            <button className="gallery-card__btn" aria-label="Learn more"><ArrowUpRight size={18} /></button>
          </div>

          <div className="gallery-card" style={{ backgroundImage: `url(${cargo4})` }}>
            <div className="gallery-card__frost-overlay"></div>
            <div className="gallery-card__gradient-overlay"></div>
            <span className="gallery-card__number">04</span>
            <div className="gallery-card__content">
              <h3 className="gallery-card__title">Door-to-door Delivery</h3>
              <p className="gallery-card__desc">Reliable, managed customs clearance and door-to-door delivery between the UK and Nigeria.</p>
            </div>
            <button className="gallery-card__btn" aria-label="Learn more"><ArrowUpRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="why-choose-us">
        <div className="why-choose-us__container">
          <div className="why-choose-us__header">
            <h2>Why choose us?</h2>
            <p>Four reasons why you should choose us to handle your next shipment</p>
          </div>

          <div className="why-choose-us__stack">
            <div className="why-row why-row--dark-navy">
              <div className="why-row__content">
                <h3 className="why-row__title">Transparent Pricing</h3>
                <p className="why-row__desc">
                  Leverages clear per-kilogram and volume metrics so you never get hit with sudden clearing costs or surprise port fees.
                </p>
                <Link to="/pricing" className="why-row__btn">Open Calculator <ArrowRight size={16} /></Link>
              </div>
              <div className="why-row__image-wrapper"><img src={cargo2} alt="Pricing processing" /></div>
            </div>

            <div className="why-row why-row--medium-slate">
              <div className="why-row__content">
                <h3 className="why-row__title">Real-Time Tracking</h3>
                <p className="why-row__desc">
                  Implements modern tracking architectures so you can observe your cargo's journey from our UK depot straight to your doorstep.
                </p>
                <Link to="/tracking" className="why-row__btn">Track a Shipment <ArrowRight size={16} /></Link>
              </div>
              <div className="why-row__image-wrapper"><img src={cargo1} alt="Live tracking" /></div>
            </div>

            <div className="why-row why-row--steel-blue">
              <div className="why-row__content">
                <h3 className="why-row__title">100% Customs Cleared</h3>
                <p className="why-row__desc">
                  We maintain seamless relationships and compliance checks to manage paperwork and clear barriers before your cargo lands.
                </p>
                <Link to="/services" className="why-row__btn">View Our Services <ArrowRight size={16} /></Link>
              </div>
              <div className="why-row__image-wrapper"><img src={cargo3} alt="Customs clearing" /></div>
            </div>

            <div className="why-row why-row--light-grey">
              <div className="why-row__content">
                <h3 className="why-row__title">Reliable UK Turnaround</h3>
                <p className="why-row__desc">
                  We consistently meet scheduled dispatch deadlines, offering steady weekly air and sea freight windows to Nigeria.
                </p>
                <Link to="/about" className="why-row__btn">About Our Hub <ArrowRight size={16} /></Link>
              </div>
              <div className="why-row__image-wrapper"><img src={cargo4} alt="UK Hub" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY DARK SLATE FAQ SECTION --- */}
      <section className="faq-section">
        <div className="faq-section__container">
          
          <div className="faq-section__left">
            <div className="faq-section__badge">
              <MessageCircle size={16} />
              <span>Your Questions, Answered</span>
            </div>
            
            <h2 className="faq-section__title">
              Frequently<br />
              <span>Asked Questions</span>
            </h2>
            
            <p className="faq-section__intro">
              Jayconsty Cargo simplifies cross-border logistics. We’ve compiled everything you need to know about how our shipping routes, pricing, and deliveries work.
            </p>

            <div className="faq-cta-card">
              <h3>Still Have Questions?</h3>
              <p>
                We understand that every shipment is unique. If you need to clarify specific features or require custom enterprise pricing, our support team is on standby.
              </p>
              <p className="faq-cta-card__subtext">
                Reach out anytime — we'll guide you through every detail.
              </p>
              <Link to="/contact" className="btn btn--neon">
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="faq-section__right">
            <div className="accordion">
              {faqData.map((faq, index) => {
                const isOpen = openFaq === index;
                
                return (
                  <div 
                    key={index} 
                    className={`accordion__item ${isOpen ? 'accordion__item--active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="accordion__header">
                      <h3>{faq.question}</h3>
                      <button className="accordion__icon" aria-expanded={isOpen}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    <div className="accordion__body-wrapper">
                      <div className="accordion__body">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* --- AESTHETIC REVIEWS SECTION (Inspired by Reference) --- */}
      <section className="aesthetic-reviews">
        <div className="ar-container">
          
          {/* Left Column: Content & CTA */}
          <div className="ar-left">
            <div className="ar-badge">
              <span className="dot"></span> VERIFIED FEEDBACK
            </div>
            
            <h2 className="ar-title">
              Delivering trust<br />with every shipment
            </h2>
            
            <p className="ar-desc">
              From seamless procurement to door-to-door logistics, read how we help businesses grow without border limits.
            </p>
            
            <div className="ar-actions">
              <button className="btn-dark-shadow" onClick={toggleModal}>
                Add a review
              </button>
              <button className="btn-outline-light" onClick={toggleSeeAllModal}>
                <MessageCircle size={16} /> Read all reviews
              </button>
            </div>

            <div className="ar-stats">
              <div className="ar-stats-block">
                <span className="ar-stats-label">TRUSTED SHIPPERS</span>
                <div className="ar-avatar-group">
                  <div className="ar-avatar-circle" style={{ backgroundColor: '#2563eb' }}>T</div>
                  <div className="ar-avatar-circle" style={{ backgroundColor: '#0f172a' }}>F</div>
                  <div className="ar-avatar-circle" style={{ backgroundColor: '#10b981' }}>S</div>
                </div>
              </div>
              
              <div className="ar-stats-divider"></div>
              
              <div className="ar-stats-block">
                <span className="ar-stats-label">RATED EXCELLENT: 5/5</span>
                <div className="ar-stars">
                  <Star size={18} fill="#f59e0b" stroke="none" />
                  <Star size={18} fill="#f59e0b" stroke="none" />
                  <Star size={18} fill="#f59e0b" stroke="none" />
                  <Star size={18} fill="#f59e0b" stroke="none" />
                  <Star size={18} fill="#f59e0b" stroke="none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tilted Cards Stack */}
          <div className="ar-right">
            {isLoadingReviews ? (
              <div className="ar-loading">
                <div className="spinner-placeholder"></div>
              </div>
            ) : reviews.length === 0 ? (
              /* Aesthetic Empty State */
              <div className="ar-card tilt-variant-0">
                <div className="ar-card-top">
                  <span className="day">TODAY</span>
                  <span className="date">NEW</span>
                </div>
                <div className="ar-card-bottom">
                  <div className="ar-card-avatar" style={{ backgroundColor: '#f1f5f9', color: '#94a3b8' }}>
                    <MessageCircle size={16} />
                  </div>
                  <div className="ar-card-info">
                    <h4>Be the first to review</h4>
                    <p>"Click the dark button to verify your tracking ID and share your experience."</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Dynamic Review Cards */
              reviews.slice(0, 3).map((review, index) => (
                <div className={`ar-card tilt-variant-${index % 3}`} key={review.id}>
                  <div className="ar-card-top">
                    <span className="day">REVIEW</span>
                    <span className="date">{review.date ? review.date.toUpperCase() : 'RECENT'}</span>
                  </div>
                  <div className="ar-card-bottom">
                    <div className="ar-card-avatar">
                      {(review.name || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="ar-card-info">
                      <h4>Verified client: {review.name}</h4>
                      <p>"{review.comment}"</p>
                    </div>
                    <div className="ar-card-duration">
                      {review.rating}/5
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* --- POPUP MODAL 1: DYNAMIC REVIEW SUBMISSION FLOW --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-form__close" onClick={toggleModal}>
              <X size={20} />
            </button>

            {/* STEP 1: VERIFY SHIPMENT */}
            {reviewStep === 1 && (
              <form onSubmit={handleVerifyTracking}>
                <h3 className="modal-form__title">Submit a Review</h3>
                <p className="modal-form__desc">
                  Please enter your Jayconsty Tracking ID (e.g., JYC-1234567) to verify your recent shipment before leaving a review.
                </p>
                
                <input 
                  type="text" 
                  placeholder="Enter Tracking ID" 
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="modal-form__input"
                  required
                />
                {verifyError && <p style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '-1rem', marginBottom: '1.5rem'}}>{verifyError}</p>}
                
                <button type="submit" className="btn btn--primary modal-form__submit" disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify Shipment'}
                </button>
              </form>
            )}

            {/* STEP 2: WRITE REVIEW */}
            {reviewStep === 2 && (
              <form onSubmit={handleSubmitReview}>
                <h3 className="modal-form__title">Rate Your Experience</h3>
                <p className="modal-form__desc">Tell us how we did with your shipment ({orderNumber.toUpperCase()}).</p>
                
                <input 
                  type="text" 
                  value={revName} 
                  onChange={(e) => setRevName(e.target.value)} 
                  className="modal-form__input" 
                  placeholder="Your Full Name" 
                  required
                />
                <select 
                  value={revRating} 
                  onChange={(e) => setRevRating(e.target.value)} 
                  className="modal-form__input" 
                  required
                >
                  <option value="5">★★★★★ - Excellent</option>
                  <option value="4">★★★★☆ - Very Good</option>
                  <option value="3">★★★☆☆ - Average</option>
                  <option value="2">★★☆☆☆ - Below Average</option>
                  <option value="1">★☆☆☆☆ - Poor</option>
                </select>
                <textarea 
                  value={revComment} 
                  onChange={(e) => setRevComment(e.target.value)} 
                  className="modal-form__textarea" 
                  placeholder="Tell us about your experience..." 
                  rows="4" 
                  required 
                />
                
                <button type="submit" className="btn btn--primary modal-form__submit" disabled={isSubmittingReview}>
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS */}
            {reviewStep === 3 && (
              <div style={{textAlign: 'center', padding: '1rem 0'}}>
                <CheckCircle size={54} color="#10b981" style={{margin: '0 auto 1rem'}}/>
                <h3 className="modal-form__title">Thank You!</h3>
                <p className="modal-form__desc">Your review has been successfully submitted and is pending administrator approval.</p>
                <button className="btn btn--primary modal-form__submit" onClick={toggleModal}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- POPUP MODAL 2: SEE ALL REVIEWS FEED (SCROLLABLE) --- */}
      {isSeeAllOpen && (
        <div className="modal-overlay" onClick={toggleSeeAllModal}>
          <div className="master-reviews-window" onClick={(e) => e.stopPropagation()}>
            <div className="master-reviews-window__header">
              <div>
                <h3>All Client Testimonials</h3>
                <p>Real verified feedback from our international shipping channels</p>
              </div>
              <button className="master-reviews-window__close" onClick={toggleSeeAllModal}>
                <X size={22} />
              </button>
            </div>

            <div className="master-reviews-window__stream">
              {reviews.length === 0 ? (
                <p style={{ color: '#64748b' }}>No verified reviews available to display.</p>
              ) : (
                reviews.map((review) => (
                  <div className="t-card t-card--modal-view" key={review.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0, 0, 0, 0.02)'
                  }}>
                    <div className="t-card__header" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="t-card__profile-img" style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', 
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                      }}>
                        {(review.name || "A").charAt(0).toUpperCase()}
                      </div>
                      <div className="t-card__author-info">
                        <p className="t-card__name" style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#111827' }}>
                          {review.name}
                        </p>
                        <div style={{display: 'flex', gap: '2px'}}>
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={12} fill={i < review.rating ? "#f59e0b" : "#e2e8f0"} color={i < review.rating ? "#f59e0b" : "#e2e8f0"} />
                           ))}
                        </div>
                      </div>
                    </div>
                    <p className="t-card__message" style={{ margin: '0', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      "{review.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Home;
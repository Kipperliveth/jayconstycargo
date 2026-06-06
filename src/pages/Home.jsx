import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Package, Globe, ShieldCheck, 
  ArrowUpRight, ChevronDown, ChevronUp, MessageCircle,
  Star, X, Quote
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
  const [orderNumber, setOrderNumber] = useState('');

  // --- HANDLERS ---
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleSeeAllModal = () => setIsSeeAllOpen(!isSeeAllOpen);

  // --- DATA ---
  const faqData = [
    {
      question: "How do I get my dedicated UK warehouse address?",
      answer: "Once you create a free account with Jayconsty Cargo, your dashboard will display your unique UK warehouse address along with your personal customer identification code. Use this address at checkout whenever you shop from UK online retailers."
    },
    {
      question: "Can you shop on my behalf if a UK store doesn't accept my Nigerian card?",
      answer: "Yes! We offer a dedicated Procurement Service. Simply send us the links to the items you want to buy, and we will handle the purchase using our local UK payment methods and have them processed directly into your shipping queue."
    },
    {
      question: "Do you offer shipment consolidation?",
      answer: "Absolutely. If you buy from multiple UK retailers (e.g., ASOS, Amazon, Zara), we can hold your items at our London hub for up to 14 days free of charge, combine them into a single package, and ship them together to save you significant freight costs."
    },
    {
      question: "What is the minimum weight requirement for shipping?",
      answer: "For Air Freight, our minimum shipping weight is 2kg. For items below this weight, the 2kg minimum charge applies. For Sea Freight, our minimum volume requirement is 0.1 CBM."
    },
    {
      question: "What is volumetric weight, and how does it affect my cost?",
      answer: "International courier rules dictate that freight is charged on whichever value is greater: actual physical weight or volumetric (space occupied) weight. Volumetric weight is calculated as (Length × Width × Height in cm) ÷ 5000. Large, lightweight items like pillows or suitcases are usually billed on volume."
    },
    {
      question: "Are your rates fully inclusive of customs clearing in Nigeria?",
      answer: "Yes, our quoted rates are end-to-end and include standard customs clearance paperwork and port fees in Nigeria. The price you are quoted for weight or volume is the final price you pay to receive your goods at our main depots."
    },
    {
      question: "When are your weekly cutoff dates for dispatches?",
      answer: "Our Air Freight cutoff is every Thursday at 4:00 PM UK time for our Friday departure flight. Our Sea Freight containers are loaded and sealed on the 1st and 3rd Saturday of every month."
    },
    {
      question: "How long does it take for goods to get to states outside Lagos?",
      answer: "Once your Air Freight cargo arrives in Lagos (3-5 business days), forwarding to other regions like Abuja, Port Harcourt, or Enugu typically adds an additional 2-3 business days depending on local interstate transport links."
    },
    {
      question: "Can I ship perfumes, spray deodorants, or cosmetics?",
      answer: "Perfumes and pressurized aerosol cans are classified as 'Dangerous Goods' by airlines due to flammability. They cannot travel on standard Air Freight. However, they can be securely packed and shipped safely via our Sea Freight routes."
    },
    {
      question: "Can I ship high-value electronics, phones, and laptops?",
      answer: "Yes, we ship electronics weekly. However, high-value devices must be explicitly declared upon arrival at our UK hub for specialized handling and security tracking. These items are subject to a standard electronics handling clearing fee."
    },
    {
      question: "Do you offer doorstep delivery across Nigeria?",
      answer: "Yes, we offer final-mile doorstep delivery to homes and offices nationwide for an additional local delivery fee. Alternatively, you can choose free self-pickup from our main destination depots in Lagos and Port Harcourt."
    },
    {
      question: "Is my shipment insured against loss or damage?",
      answer: "Every shipment is automatically covered up to a standard value of £50. For high-value commercial shipments, luxury goods, or electronics, we strongly advise purchasing our optional Extended Cargo Insurance, which covers up to 100% of the declared invoice value."
    }
  ];

  const testimonialsData = [
    {
      id: 1,
      name: "Tega Oduwole",
      handle: "@tegajoseph",
      message: "I was extremely stressed shipping my commercial kitchen equipment. Jayconsty was incredible. Transparent pricing from London to Lagos port. Highly professional.",
      initial: "T"
    },
    {
      id: 2,
      name: "Folasade Bankole",
      handle: "@FolaBankz",
      message: "Procurement is usually a headache, but these guys handled my purchases across 5 different UK stores and shipped to PH. Everything arrived consolidated and cleared.",
      initial: "F"
    },
    {
      id: 3,
      name: "Samuel Eze",
      handle: "@Samuel_EzeLogistics",
      message: "Our business relies on weekly UK-NGA deliveries. Jayconsty's consistency with Sea Freight schedules clears all the port hassle for us. The best logistics partner.",
      initial: "S"
    },
    {
      id: 4,
      name: "Musa Abubakar",
      handle: "@MusaAba",
      message: "Fast UK Turnaround. Their London hub received my fragile electronic goods and shipped them door-to-door within 4 days. Absolutely reliable.",
      initial: "M"
    }
  ];

  const allReviewsData = [
    ...testimonialsData,
    {
      id: 5,
      name: "Chioma Nnaji",
      handle: "@Chio_Nnaji",
      message: "Standard Air freight came exactly within 4 days. Unbelievable turnaround time compared to standard couriers. Highly recommended for small retail owners.",
      initial: "C"
    },
    {
      id: 6,
      name: "Abiodun Oyekan",
      handle: "@AbiodunOye",
      message: "I used their Procurement Service because my Nigerian Mastercard kept getting rejected on UK fashion sites. Smooth process from payment to hub pickup in Lagos.",
      initial: "A"
    },
    {
      id: 7,
      name: "Ngozi Egwu",
      handle: "@Ngozi_Egwu",
      message: "Excellent cargo insurance policies. Had a fragile vintage mirror shipped via Sea Freight and it landed without a single scratch or clearing delay.",
      initial: "N"
    },
    {
      id: 8,
      name: "Yusuf Danjuma",
      handle: "@YusufDanLogistics",
      message: "Their consolidation system saved me thousands. Had packages from Amazon, ASOS, and Zara grouped into a single tight dispatch weight block.",
      initial: "Y"
    }
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
          
          {/* Left Column: Context & CTA */}
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

          {/* Right Column: Scrollable Accordions */}
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

      {/* --- STICKY TESTIMONIALS SECTION --- */}
      <section className="testimonials">
        <div className="testimonials__container">
          
          {/* Left Content Column (Locks and Sticks on scroll) */}
          <div className="testimonials__left">
            <div className="testimonials__badge">
              <Quote size={14} />
              <span>Hear From Our Clients</span>
            </div>
            
            <h2 className="testimonials__title">What our clients say</h2>
            
            <p className="testimonials__intro">
              We’ve built Jayconsty Cargo on a foundation of trust. Read how we’ve helped thousands of businesses move goods securely between the UK and Nigeria with zero stress.
            </p>
            
            {/* Ratings Block */}
            <div className="testimonials__stats-block">
              <div className="stat-group">
                <p className="stat-group__number">4.9 / 5</p>
                <div className="stat-group__stars">
                  <Star size={16} fill="#f77f00" stroke="none" />
                  <Star size={16} fill="#f77f00" stroke="none" />
                  <Star size={16} fill="#f77f00" stroke="none" />
                  <Star size={16} fill="#f77f00" stroke="none" />
                  <Star size={16} fill="#f77f00" stroke="none" />
                </div>
                <p className="stat-group__label">Average Rating</p>
              </div>

              <div className="stat-group">
                <p className="stat-group__number">10k+</p>
                <p className="stat-group__label">Satisfied Users</p>
              </div>

              <div className="stat-group">
                <p className="stat-group__number">8.5k+</p>
                <p className="stat-group__label">Total Ratings</p>
              </div>
            </div>

            {/* Action Row with Inline SVG Social Icons (Safe from Breaking Changes) */}
            <div className="testimonials__actions-wrapper">
              <button className="btn btn--neon testimonials__add-btn" onClick={toggleModal}>
                Add a Review
              </button>
              
              <div className="testimonials__socials">
                {/* Instagram SVG */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram Reviews">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                {/* X / Twitter SVG */}
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X Twitter Reviews">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* Facebook SVG */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook Reviews">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content Column (Scrollable layout) */}
          <div className="testimonials__right">
            <div className="testimonials__grid">
              {testimonialsData.map((testimonial) => (
                <div className="t-card" key={testimonial.id}>
                  <div className="t-card__header">
                    <div className="t-card__profile-img">{testimonial.initial}</div>
                    <div className="t-card__author-info">
                      <p className="t-card__name">{testimonial.name}</p>
                      <p className="t-card__handle">{testimonial.handle}</p>
                    </div>
                  </div>
                  <p className="t-card__message">"{testimonial.message}"</p>
                </div>
              ))}
            </div>

            {/* Trigger to open Master Reviews Modal Overlay */}
            <button className="testimonials__see-more-link" onClick={toggleSeeAllModal}>
              See more client reviews <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* --- POPUP MODAL 1: LEAVE A REVIEW VERIFICATION --- */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-form" onClick={(e) => e.stopPropagation()}>
              <button className="modal-form__close" onClick={toggleModal}>
                <X size={20} />
              </button>
              
              <h3 className="modal-form__title">Submit a Review</h3>
              <p className="modal-form__desc">
                Please enter your 10-digit Jayconsty Cargo Order Number (e.g., JC12345678) to verify your recent shipment before leaving a review.
              </p>
              
              <input 
                type="text" 
                placeholder="Enter your Order Number" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="modal-form__input"
              />
              
              <button className="btn btn--primary modal-form__submit">
                Verify Shipment
              </button>
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
                {allReviewsData.map((review) => (
                  <div className="t-card t-card--modal-view" key={review.id}>
                    <div className="t-card__header">
                      <div className="t-card__profile-img">{review.initial}</div>
                      <div className="t-card__author-info">
                        <p className="t-card__name">{review.name}</p>
                        <p className="t-card__handle">{review.handle}</p>
                      </div>
                    </div>
                    <p className="t-card__message">"{review.message}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

    </main>
  );
}

export default Home;
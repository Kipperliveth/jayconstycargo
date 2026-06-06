import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FAQs() {
  // State to track which accordion item is currently open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function for the accordion
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // The FAQ Data structured cleanly
  const faqData = [
    {
      category: "Operations & Services",
      questions: [
        {
          q: "How does your UK to Nigeria freight forwarding work?",
          a: <span>We receive and consolidate your items at our UK hub, load them into secure containers, and ship them via ocean freight. Our shipments <strong>depart strictly every 3rd Friday of the month</strong>. For a full breakdown of our pipeline, visit our <Link to="/services">Services page</Link>.</span>
        },
        {
          q: "Do you offer door-to-door delivery in Nigeria?",
          a: "Yes. While our primary docking ports are in Lagos and Port Harcourt, our domestic final-mile network allows us to deliver your cargo directly to your home, storefront, or warehouse anywhere within Nigeria."
        },
        {
          q: "How does the 'Buy For Me' procurement service work?",
          a: "If you face payment barriers on UK stores (like Amazon, Zara, or ASOS), simply send us the product links. We will purchase the items locally on your behalf, verify the inventory at our UK hub, and include it in our next sea freight departure."
        }
      ]
    },
    {
      category: "Shipping Guidelines",
      questions: [
        {
          q: "What types of items CAN I ship?",
          a: "We handle a wide variety of cargo including commercial retail stock, heavy machinery, vehicles, electronics, furniture, non-perishable foods, and personal effects."
        },
        {
          q: "What items are strictly PROHIBITED?",
          a: "By law, we cannot ship hazardous materials, flammables, explosives, firearms, ammunition, illegal narcotics, corrosive chemicals, live animals, perishable foods, or physical cash."
        }
      ]
    },
    {
      category: "Pricing & Billing",
      questions: [
        {
          q: "How is my shipping cost calculated?",
          a: "Pricing is calculated based on either the actual weight or the volumetric weight of your cargo—whichever is greater. Volumetric weight takes into account the dimensions (Length × Width × Height) of the package. Contact us with your box dimensions for a precise quote."
        },
        {
          q: "Are there hidden customs fees upon arrival?",
          a: "No. We pride ourselves on transparent pricing. Our standard quotes are all-inclusive, meaning your customs clearance documentation and port fees at Lagos or Port Harcourt are already factored into your upfront cost."
        }
      ]
    }
  ];

  return (
    <main className="faqs-page">
      
      {/* Hero Section */}
      <section className="pages-hero faqs-hero">
        <div className="pages-hero-content">
          <div className="accent-line"></div>
          <h1>Got <span>Questions?</span></h1>
          <p>Everything you need to know about shipping with Jayconsty</p>
        </div>
      </section>

      {/* FAQs Container */}
      <section className="faqs-section">
        <div className="faqs-container">
          
          {faqData.map((group, groupIndex) => (
            <div key={groupIndex} className="faq-category-group">
              <h2 className="faq-category-title">{group.category}</h2>
              
              <div className="faq-accordion">
                {group.questions.map((item, itemIndex) => {
                  // Create a unique index for the entire flat list of questions
                  const uniqueIndex = `${groupIndex}-${itemIndex}`;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div 
                      key={uniqueIndex} 
                      className={`faq-item ${isOpen ? 'active' : ''}`}
                    >
                      <button 
                        className="faq-question" 
                        onClick={() => toggleFAQ(uniqueIndex)}
                        aria-expanded={isOpen}
                      >
                        <h3>{item.q}</h3>
                        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      
                      <div className="faq-answer-wrapper">
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>Our logistics team is ready to provide you with specific answers and tailored quotes.</p>
            <Link to="/contact" className="btn-primary">Contact Support</Link>
          </div>

        </div>
      </section>

    </main>
  );
}

export default FAQs;
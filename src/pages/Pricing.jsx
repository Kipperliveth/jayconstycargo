import React, { useState, useRef, useEffect } from 'react';
// import './Pricing.scss';

function Pricing() {
  const [currencyContext, setCurrencyContext] = useState('nigeria'); // 'nigeria' or 'uk'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [weightInput, setWeightInput] = useState(20); 
  
  const dropdownRef = useRef(null);

  const exchangeRate = 1900; 
  const baseRatePerKg = 1; 

  const baseLogisticsCharge = weightInput * baseRatePerKg;
  
  const handlingAndTaxRate = currencyContext === 'nigeria' ? 0.075 : 0.20; 
  const estimatedTaxFee = baseLogisticsCharge * handlingAndTaxRate;
  const totalCostGbp = baseLogisticsCharge + estimatedTaxFee;
  const totalCostNgn = totalCostGbp * exchangeRate;

  const selectedCountry = currencyContext === 'nigeria' 
    ? { label: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }
    : { label: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' };

  const handleSelect = (context) => {
    setCurrencyContext(context);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main className="pricing-page">
      
      {/* 1. Context Selector & Main Header */}
      <section className="pricing-header-section">
        <div className="pricing-context-picker">
          <span>Pricing for</span>
          
          {/* Custom Dropdown using Click-Outside Logic */}
          <div className="custom-dropdown" ref={dropdownRef}>
            <div 
              className="dropdown-selected" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={selectedCountry.flag} alt={`${selectedCountry.label} flag`} className="flag-icon" />
              <span className="dropdown-label">{selectedCountry.label}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div 
                  className={`dropdown-item ${currencyContext === 'nigeria' ? 'active' : ''}`}
                  onClick={() => handleSelect('nigeria')}
                >
                  <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria flag" className="flag-icon" />
                  Nigeria
                </div>
                <div 
                  className={`dropdown-item ${currencyContext === 'uk' ? 'active' : ''}`}
                  onClick={() => handleSelect('uk')}
                >
                  <img src="https://flagcdn.com/w40/gb.png" alt="UK flag" className="flag-icon" />
                  United Kingdom
                </div>
              </div>
            )}
          </div>
        </div>

        <h1 className="pricing-main-title">Simple, fair pricing</h1>
        <p className="pricing-subtitle">
          Jayconsty charges a flat baseline with no hidden documentation fees.
        </p>
      </section>

      {/* 2. Core Rate Cards Display */}
      <section className="rate-cards-container">
        <div className="rate-grid">
          
          <div className="rate-card">
            <span className="card-label">Standard Cargo Rate</span>
            <h2 className="rate-value">
              {currencyContext === 'nigeria' ? '£1.00' : '£1.00'} <span className="rate-unit">/ KG</span>
            </h2>
            
            <ul className="rate-features-list">
              <li>
                <span className="checkmark">✓</span> 
                {currencyContext === 'nigeria' 
                  ? 'Payable in GBP or NGN equivalent at standard market rate' 
                  : 'Standard destination handling charges included'}
              </li>
              <li>
                <span className="checkmark">✓</span> 
                No minimum weight penalties for standard cargo consolidation
              </li>
              <li>
                <span className="checkmark">✓</span> 
                Free warehouse storage up to 14 days before dispatch
              </li>
            </ul>
          </div>

          <div className="rate-card">
            <span className="card-label">Clearance & Value Added Tax</span>
            <h2 className="rate-value">
              {currencyContext === 'nigeria' ? '7.5%' : '20.0%'} <span className="rate-unit">Surcharge</span>
            </h2>
            
            <ul className="rate-features-list">
              <li>
                <span className="checkmark">✓</span> 
                {currencyContext === 'nigeria' 
                  ? 'Covers local customs clearance documentation in Lagos / PH' 
                  : 'Standard UK VAT compliance applied on domestic handling'}
              </li>
              <li>
                <span className="checkmark">✓</span> 
                Includes automated real-time tracking updates across all waybills
              </li>
              <li>
                <span className="checkmark">✓</span> 
                Zero hidden maintenance or container separation fees
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Interactive Calculation Section ("Do the Math") */}
      <section className="calculator-section">
        <div className="calculator-container">
          <div className="calculator-grid">
            
            <div className="calc-text-block">
              <h2>Do the math</h2>
              <p>
                See exactly how much your shipment costs before booking. Enter your estimated cargo weight into our calculator to view breakdown charges instantly.
              </p>
            </div>

            <div className="calc-interactive-box">
              <div className="calc-input-group">
                <label htmlFor="weightCalcInput">If your shipment weighs</label>
                <div className="input-with-addon">
                  <input 
                    type="number" 
                    id="weightCalcInput"
                    min="1" 
                    max="10000"
                    value={weightInput} 
                    onChange={(e) => setWeightInput(Math.max(1, Number(e.target.value)))}
                  />
                  <span className="input-addon">KG</span>
                </div>
              </div>

              <div className="calc-results-row">
                <div className="result-metric">
                  <span className="metric-label">Base Freight Fee</span>
                  <span className="metric-value">£{baseLogisticsCharge.toFixed(2)}</span>
                </div>
                <div className="result-metric">
                  <span className="metric-label">Est. Surcharge & Tax</span>
                  <span className="metric-value">£{estimatedTaxFee.toFixed(2)}</span>
                </div>
              </div>

              <hr className="calc-divider" />

              <div className="calc-total-box">
                <span className="total-label">Estimated Grand Total</span>
                <div className="total-price-display">
                  <h3 className="primary-total">£{totalCostGbp.toFixed(2)}</h3>
                  {currencyContext === 'nigeria' && (
                    <span className="secondary-total">
                      ≈ ₦{totalCostNgn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>

              <ul className="calc-fineprint-list">
                <li><span className="dot">•</span> Automatic volume weight calculations apply if volumetric limits are exceeded.</li>
                <li><span className="dot">•</span> Final invoice issued upon physical measurement at our loading bay.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Pricing;
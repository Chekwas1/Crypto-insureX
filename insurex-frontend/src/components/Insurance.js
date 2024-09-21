import React from 'react';
import './Insurance.css'; // Assuming you'll create styles for this component

const Insurance = () => {
  return (
    <div className="insurance-container">
      {/* Two-headed message section */}
      <div className="insurance-message">
        <div className="message-part">
          <h3>Why You Need Insurance for Your Portfolio</h3>
          <p>
            Having insurance for your crypto portfolio can protect your investments from unforeseen risks and market volatility. 
            It offers a safety net in case of significant market downturns, smart contract failures, or hacking attempts.
          </p>
        </div>
        <div className="message-part">
          <h3>What Insurance Means for You</h3>
          <p>
            By insuring your portfolio, you ensure financial security in times of high unpredictability, providing peace of mind and 
            allowing you to take calculated risks with a backup plan in place. This is essential for long-term sustainability.
          </p>
        </div>
      </div>

      {/* Google Form Section */}
      <div className="insurance-form-section">
        <h3>Insurance Information</h3>
        <p>Fill out the form below to submit your insurance request:</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf5KprVlRVi2nP9ZcxBjV8br5piOBsTugXWn1tRDcXQPd4_ew/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="insurance-form-link">
          Insurance Form
        </a>
      </div>
    </div>
  );
};

export default Insurance;

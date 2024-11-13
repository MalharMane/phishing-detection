// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import UrlInput from './components/UrlInput';
// import CheckButton from './components/CheckButton';
// import ResultDisplay from './components/ResultDisplay';
// import { checkWebsite } from './services/virusTotalService';

// function App() {
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState(null);

//   const handleUrlChange = (e) => setUrl(e.target.value);

//   const handleCheckWebsite = async () => {
//     try {
//       const data = await checkWebsite(url);
//       const maliciousCount = data.data.attributes.last_analysis_stats.malicious;
  
//       if (maliciousCount > 0) {
//         setResult('Bad - This may be a phishing website');
//       } else {
//         setResult('Good - This website seems safe');
//       }
//     } catch (error) {
//       console.error('Error checking website:', error); // Log the error details
//       setResult('Error - Unable to check the website. Try again later.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Phishing Website Detection</h2>
//       <div className="mb-3">
//         <UrlInput url={url} onChange={handleUrlChange} />
//       </div>
//       <CheckButton onClick={handleCheckWebsite} />
//       <ResultDisplay result={result} />
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState(null);

//   // Handle URL input
//   const handleUrlChange = (e) => setUrl(e.target.value);

//   // Basic phishing detection function
//   const checkWebsite = () => {
//     let isSuspicious = false;
//     const parsedUrl = new URL(url);

//     // 1. Check for suspicious TLDs
//     const tld = parsedUrl.hostname.split('.').pop();
//     const commonTlds = ['com', 'org', 'net', 'edu', 'gov'];
//     if (!commonTlds.includes(tld)) {
//       isSuspicious = true;
//     }

//     // 2. Check for length
//     if (url.length > 75) {
//       isSuspicious = true;
//     }

//     // 3. Check for suspicious keywords
//     const phishingKeywords = ['login', 'verify', 'account', 'secure', 'bank', 'update'];
//     phishingKeywords.forEach(keyword => {
//       if (parsedUrl.hostname.includes(keyword) || parsedUrl.pathname.includes(keyword)) {
//         isSuspicious = true;
//       }
//     });

//     // 4. Check for special characters or hyphens in the hostname
//     const hostname = parsedUrl.hostname;
//     if ((hostname.match(/-/g) || []).length > 2 || hostname.match(/\d+/)) {
//       isSuspicious = true;
//     }

//     // Set the result
//     if (isSuspicious) {
//       setResult('Bad - This may be a phishing website');
//     } else {
//       setResult('Good - This website seems safe');
//     }
//   };

//   // Get the appropriate alert style based on the result
//   const resultStyle = result?.includes('Good') ? 'alert-success' : 'alert-danger';

//   return (
//     <div className="container mt-5">
//       <h2>Phishing Website Detection</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter website URL"
//           value={url}
//           onChange={handleUrlChange}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={checkWebsite}>
//         Check Website
//       </button>
//       {result && (
//         <div className={`mt-4 alert ${resultStyle}`}>
//           <strong>{result}</strong>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add this to import your custom styles

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [typedResult, setTypedResult] = useState('');

  // Handle URL input
  const handleUrlChange = (e) => setUrl(e.target.value);

  // Typing effect
  useEffect(() => {
    if (result) {
      let currentText = '';
      let index = 0;
      const typingInterval = setInterval(() => {
        currentText += result[index];
        setTypedResult(currentText);
        index++;
        if (index === result.length) clearInterval(typingInterval);
      }, 50);
    }
  }, [result]);

  // Basic phishing detection function
  const checkWebsite = () => {
    let isSuspicious = false;
    const parsedUrl = new URL(url);

    const tld = parsedUrl.hostname.split('.').pop();
    const commonTlds = ['com', 'org', 'net', 'edu', 'gov'];
    if (!commonTlds.includes(tld) || url.length > 75) isSuspicious = true;

    const phishingKeywords = ['login', 'verify', 'account', 'secure', 'bank', 'update'];
    phishingKeywords.forEach(keyword => {
      if (parsedUrl.hostname.includes(keyword) || parsedUrl.pathname.includes(keyword)) {
        isSuspicious = true;
      }
    });

    const hostname = parsedUrl.hostname;
    if ((hostname.match(/-/g) || []).length > 2 || hostname.match(/\d+/)) {
      isSuspicious = true;
    }

    setResult(isSuspicious ? 'Bad - This may be a phishing website' : 'Good - This website seems safe');
  };

  const resultStyle = result?.includes('Good') ? 'result-good' : 'result-bad';

  return (
    <div className="container mt-5 app-container">
      <h2 className="app-title">Phishing Website Detection</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Enter website URL"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button className="btn btn-primary custom-button" onClick={checkWebsite}>
        Check Website
      </button>
      {result && (
        <div className={`mt-4 alert ${resultStyle} animated-alert`}>
          <strong>{typedResult}</strong>
        </div>
      )}
      
      {/* Information Section */}
      <div className="info-section mt-4">
        <h4>How to Spot a Fake or Phishing Website?</h4>
        <ul>
          <li><strong>Check the URL:</strong> Always ensure that the URL starts with "https://" and check for a valid domain name (e.g., "google.com" instead of "goog1e.com").</li>
          <li><strong>Look for Trust Indicators:</strong> Websites with secure connections usually have a padlock symbol next to the URL in the address bar.</li>
          <li><strong>Be Cautious of Pop-Ups:</strong> Phishing sites often use pop-up ads or aggressive sign-up prompts to trick you.</li>
          <li><strong>Avoid Suspicious Requests:</strong> Legitimate websites will never ask for sensitive data like passwords or credit card info in an email or on a landing page.</li>
          <li><strong>Check for Grammar Errors:</strong> Phishing websites often have strange grammar or spelling mistakes, especially in official-looking documents.</li>
        </ul>
      </div>

      {/* Footer Section */}
      <footer className="footer mt-5">
        <div className="container text-center">
          <p>Developed by <strong>Sanika Patil</strong> | <strong>Ashokrao Mane College, Wathar</strong></p>
          <div className="social-links">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> | 
            <a href="mailto:example@domain.com">Email</a>
          </div>
          <p>&copy; 2024 Phishing Website Detection System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

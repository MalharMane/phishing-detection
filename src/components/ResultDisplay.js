import React from 'react';

const ResultDisplay = ({ result }) => (
  result && (
    <div className="mt-4 alert alert-info">
      <strong>{result}</strong>
    </div>
  )
);

export default ResultDisplay;

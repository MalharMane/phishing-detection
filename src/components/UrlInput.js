import React from 'react';

const UrlInput = ({ url, onChange }) => (
  <input
    type="text"
    className="form-control"
    placeholder="Enter website URL"
    value={url}
    onChange={onChange}
  />
);

export default UrlInput;

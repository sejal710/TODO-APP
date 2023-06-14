import React from 'react';
import '../css/Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;

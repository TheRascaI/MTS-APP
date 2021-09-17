import React from 'react';
import logo from '../../../assets/svg/logo_bild.svg';
import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="logo-spin"><img src={logo} alt="mts-logo"/></div>
    </div>
  );
};

export default LoadingSpinner;

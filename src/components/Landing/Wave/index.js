
// Libraries
import React from 'react';

// Styles
import styles from './style.module.scss';


const Wave = ({ prevBackgroundColor }) => {
  const isMobile = false;

  return (
    <div className={styles.Wave}>
      {isMobile ? (
        <svg viewBox='0 0 1528 331'>
          <path
            d='M 0 312 C 387.5 312 387.5 110 775 110 L 775 110 L 775 0 L 0 0 Z'
            style={{stroke: 'none', fill: prevBackgroundColor}}
          />
          <path
            d='M 774 110 C 1151 110 1151 98 1528 98 L 1528 98 L 1528 0 L 774 0 Z'
            style={{stroke: 'none', fill: prevBackgroundColor}}
          />
        </svg>
      ) : (
        <svg viewBox='0 0 500 150' preserveAspectRatio='none' style={{width: '100%', height: '100%'}}>
          <path
            d='M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z'
            style={{stroke: 'none', fill: prevBackgroundColor}}
          />
        </svg>
      )}
    </div>
  )
};

export default Wave;
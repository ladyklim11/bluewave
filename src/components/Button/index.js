// Libraries
import React from 'react';

// Assets
import arrow from '../../assets/service/arrow.svg';

// Styles
import styles from './style.module.scss';


const Button = ({
  children,
  style,
  className,
  background = '#52CC7C',
  color = '#fff',
  size = 'default',
  events,
  withArrow = false,
}) => (
  <button
    className={`${styles.Button} ${size === 'small' && styles.Button_small} ${className}`}
    style={{background, color, ...style}}
    {...events}
  >
    {children}
    {withArrow && (
      <span style={{marginLeft: '10px'}}>
      <img src={arrow} className={styles.Arrow} alt='' />
    </span>
    )}
  </button>
)

export default Button;
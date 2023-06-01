
// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './style.module.scss';


const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.Wrapper}>
        <div className={styles.Cols}>
          <Link to='/'>
            <div className={styles.Logo}>BlueWave</div>
          </Link>
          <div className={styles.Links}>
            <Link to='tariffs' className={styles.Link}>Тарифы</Link>
          </div>
        </div>
      </div>
      <div className={styles.Divider} />
      <div className={styles.Wrapper}>
        <div className={styles.Copyright}>BlueWave. Разработала Клим C.В., 2023</div>
      </div>
    </div>
  )
}

export default Footer;
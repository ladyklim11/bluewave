
// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Wave from '../Wave';
import Button from '../../Button';

// Assets
import counter from '../../../assets/service/counter.png';

// Styles
import styles from './style.module.scss';


const BlueWaves = ({ count = 2429429, waveColor = '#fff'}) => {
  const divideredCount = Array.from(`${count}`);
  return (
    <div className={styles.Container}>
      <Wave prevBackgroundColor={waveColor} />
      <div className={styles.Wrapper}>
        <div className={styles.Text}>Создайте свою первую страницу</div>
        <Link to='/constructor'>
          <Button style={{marginTop: 24}} withArrow>
            Создать бесплатно
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default BlueWaves;
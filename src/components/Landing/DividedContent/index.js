
// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Wave from '../Wave';
import Carousel from '../Carousel';

// Assets
import arrow from '../../../assets/service/arrow.svg';

// Styles
import styles from './style.module.scss';


const DividedContent = ({
  direction = 'row',
  prevBackgroundColor,
  backgroundColor,
  title1,
  title2,
  texts = [],
  linkUrl,
  linkText,
  imageSmall,
  imagesCarousel = [],
  imageSignatureText,
  imageSignatureBackgroundColor,
  morePaddingTop
}) => {
  return (
    <div style={{backgroundColor}}>
      <Wave prevBackgroundColor={prevBackgroundColor} />
      <div className={`${styles.Content} ${morePaddingTop && styles.Content_PT}`} style={{flexDirection: direction}}>
        <div className={`${styles.Col} ${styles.Col__Info}`}>
          <div className={styles.Title1}>{title1}</div>
          <div className={styles.Title2}>{title2}</div>
          <div className={styles.Texts}>
            {texts.map(text => (
              <div key={text} className={styles.Text}>{text}</div>
            ))}
          </div>
          <Link to={linkUrl} className={styles.Link} style={{}}>
            {linkText}
            <span style={{marginLeft: '10px'}}>
              <img src={arrow} className={styles.Arrow} />
            </span>
          </Link>
        </div>
        <div className={styles.Col}>
          <Carousel
            direction={direction}
            imageSmall={imageSmall}
            imagesCarousel={imagesCarousel}
            imageSignatureText={imageSignatureText}
            imageSignatureBackgroundColor={imageSignatureBackgroundColor}
          />
        </div>
        <div className={`${styles.Texts} ${styles.Texts_mobile}`}>
          {texts.map(text => (
            <div key={text} className={styles.Text}>{text}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DividedContent;
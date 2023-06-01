
// Libraries
import React from 'react';

// Styles
import styles from './style.module.scss';


const Carousel = ({
  imageSmall,
  imageSignatureBackgroundColor,
  imageSignatureText,
  imagesCarousel = [],
  direction,
  changeZIndex
}) => {
  const [usedImage, setUsedImage] = React.useState(0);
  const [isAnimation, setIsAnimation] = React.useState(false);

  React.useEffect(() => {
    if (imagesCarousel.length > 1) {
      const timer = setInterval(() => {
        setIsAnimation(true);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, []);

  React.useEffect(() => {
    if (isAnimation) {
      setTimeout(() => {
        setUsedImage(prev => imagesCarousel.length - 1 !== prev ? prev + 1 : 0);
        setIsAnimation(false);
      }, 2000);
    }
  }, [isAnimation])

  return (
    <>
      <div
        className={styles.Images}
        style={{flexDirection: direction}}
      >
        <div className={styles.ImageSmall} style={changeZIndex && {zIndex: 0}}>
          <img src={imageSmall} className={styles.Image} alt='' />
        </div>
        <div
          className={`
            ${styles.ImageDefault}
            ${direction === 'row-reverse' ? styles.ImageDefault_marginRight : styles.ImageDefault_marginLeft}`
          }
        >
          {imageSignatureText && (
            <div className={`${styles.ImageSignature} ${direction === 'row-reverse' && styles.ImageSignature_right}`}>
              <svg width='162' height='73' viewBox='0 0 162 73' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0.111981 18.9361L128.834 0.461795L133.827 12.762L147.757 10.2133L161.988 54.6071L31.4512 72.2667L27.4583 60.9664L14.3434 63.3299L0.111981 18.9361Z' fill={imageSignatureBackgroundColor} />
              </svg>
              <div className={styles.ImageSignature__Text}>{imageSignatureText}</div>
            </div>
          )}
          <div className={styles.Container}>
            <img
              src={imagesCarousel[usedImage + 1 > imagesCarousel.length - 1 ? 0 : usedImage + 1]}
              className={`${styles.Image} ${styles.Image__Next} ${isAnimation ? styles.Image_moved_toCenter : undefined}`}
              alt=''
            />
            <img
              src={imagesCarousel[usedImage]}
              className={`${styles.Image} ${styles.Image__Current} ${isAnimation ? styles.Image_moved_toAway : undefined}`}
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel;
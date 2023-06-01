
// Libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import closeIcon from '../../assets/service/closeIcon.svg';

// Styles
import styles from './style.module.scss';


// У этого компонента два пути использования - вывод алерта и форма
const Alert = ({ alertData, setHide }) => {
  const history = useHistory();

  const {
    title,
    subtitle,
    buttonLink,
    buttonText,
    renderContent,
  } = alertData;

  React.useEffect(() => {
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <div className={styles.Alert}>
      <div className={styles.Shadow} onClick={setHide} />
      <div className={styles.Content}>
        <div className={styles.Close} onClick={setHide}>
          <img src={closeIcon} alt='Закрыть' />
        </div>
        {renderContent ? renderContent() : (
          <>
            <div className={styles.Title}>{title}</div>
            <div className={styles.Subtitle}>{subtitle}</div>
            <button onClick={() => history.push(buttonLink)}>
              {buttonText}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Alert;
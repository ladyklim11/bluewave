
// Libraries
import React from 'react';
import {useMediaQuery} from 'react-responsive';

// Contexts
import {PhoneScreenDataContext} from '../Editor';

// Assets
import selectArrow from '../../assets/service/selectArrow.svg';

// Styles
import styles from './style.module.scss';


const PhoneSelect = ({ items, handleChange, type, title, style, onlyPhoneMode = true, defaultValues }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    if (isShow && (isMobile || onlyPhoneMode)) {
      setPhoneScreenData(prev => ({
        ...prev,
        isShow: true,
        setHide: submitData => {
          setPhoneScreenData(() => ({ isShow: false }));
          handleChange(submitData);
          setIsShow(false);
        },
        title,
        additionalFunctional: {
          defaultType: type,
          dataForDefaultType: items,
          defaultValueForDefaultType: defaultValues ? defaultValues : items[0]
        }
      }))
    }
  }, [isShow]);

  return (
    <div
      onClick={() => setIsShow(prev => !prev)}
      style={{position: 'relative', ...style}}
    >
      <div className={styles.Select}>
        <span>{title}</span>
        <span className={styles.Arrow}>
          <img src={selectArrow} style={{fill: 'red', transform: isShow && 'rotate(180deg)'}} />
        </span>
      </div>
      {!isMobile && !onlyPhoneMode && isShow && (
        <div className={styles.Items}>
          {items.map(item => (
            <div
              className={styles.Item}
              onClick={(e) => {
                e.stopPropagation();
                handleChange(item);
                setIsShow(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhoneSelect;
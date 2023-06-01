
// Libraries
import React from 'react';
import {Transition} from 'react-transition-group';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

// Components
import {Link} from 'react-router-dom'

// Assets
import defaultAvatar from '../../assets/service/defaultAvatar.svg';

// Styles
import styles from './style.module.scss';


const transitionStyles = {
  entering: { left: -1000 },
  entered: { left: 0 }
};

const TABS = [
  {
    label: 'Конструктор',
    to: '/constructor'
  },
  {
    label: 'Товары',
    to: '/products'
  },
  {
    label: 'Тарифы',
    to: '/tariffs'
  },
];


const MobileMenu = ({ show, setShow, tabs }) => {
  const history = useHistory();
  const dispatch=  useDispatch();
  const {
    userData: {
      user
    },
  } = useSelector(store => store);

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShow(false);
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className={styles.Container}>
          <Transition in={show} timeout={300}>
            {state => (
              <div
                className={styles.Content}
                style={{ ...transitionStyles[state] }}
              >
                {tabs ? (
                  <div className={styles.UserMenu}>
                    {tabs.map(tab => (
                      <Link to={tab.to} onClick={() => setShow(false)}>
                        <div
                          className={`
                            ${styles.Item} 
                            ${(history.location.pathname === tab.to || history.location.pathname + '/' === tab.to) && styles.Item_userActive}
                          `}
                        >
                          {tab.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={styles.Head}>
                      <div className={styles.UserInfo}>
                        <div className={styles.Avatar}>
                          <img src={defaultAvatar} alt='Аватар' />
                        </div>
                        <div className={styles.UserName}>
                          {user?.login_instagram || user?.name || user?.email || 'Гость'}
                        </div>
                      </div>
                      {TABS.map(tab => (
                        <Link to={tab.to}>
                          <div
                            className={`${styles.Item} ${history.location.pathname === tab.to && styles.Item_active}`}
                          >
                            {tab.label}
                          </div>
                        </Link>
                      ))}
                      {user && (
                        <div
                          className={styles.Item}
                          onClick={() => {
                            dispatch({ type: 'EDITOR_LOGOUT' });
                            dispatch({ type: 'LOGOUT' });
                            setShow(false);
                          }}
                        >
                          Выход из аккаунта
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </Transition>
          <div className={styles.Shadow} onClick={() => setShow(false)} />
        </div>
      )}
    </>
  )
};

export default MobileMenu;
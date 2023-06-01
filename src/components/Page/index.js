
// Libraries
import React from 'react';
import {useMediaQuery} from 'react-responsive';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Header from '../Header';
import PhoneScreen from '../Editor/PhoneScreen';
import Loader from '../Loader';

// Contexts
import {LoginScreenDataContext} from '../../App';

// Assets
import logoIcon from '../../assets/service/logo.svg';
import defaultAvatarIcon from '../../assets/service/defaultAvatar.svg';
import arrowIcon from '../../assets/service/blackArrowToBottom.svg';

// Styles
import styles from './style.module.scss';


const MENU = [
  {
    to: '/constructor',
    label: 'Конструктор'
  },
  {
    to: '/products',
    label: 'Товары'
  },
  {
    to: '/tariffs',
    label: 'Тарифы'
  },
]

const Page = ({
  hideHeader = false,
  headerProps,
  phoneScreenProps,
  contentStyles,
  children
}) => {
  const dispatch = useDispatch();
  const {
    userData: {
      user
    },
  } = useSelector(store => store);
  const [showUserInfoActions, setShowUserInfoActions] = React.useState(false);
  const { setLoginData } = React.useContext(LoginScreenDataContext);
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  return (
    <div className={styles.Page}>
      <Loader />
      {isMobile ? (
        <>
          {!hideHeader && <Header {...headerProps} />}
          {phoneScreenProps && <PhoneScreen {...phoneScreenProps} />}
          <div
            className={styles.Content}
            style={{...contentStyles}}
          >
            {children}
          </div>
        </>
      ) : (
        <div className={styles.Container}>
          <div className={styles.Header}>
            <div className={`${styles.Wrapper} ${styles.Wrapper_header}`}>
              <div className={styles.Header__Left}>
                <Link to='/'>
                  <div className={styles.Header__Logo}>
                    BlueWave
                  </div>
                </Link>
                <div className={styles.Header__Nav}>
                  {MENU.map(({ label, to }) => (
                    <div className={`
                      ${styles.Link}
                      ${history.location.pathname.includes(to) && styles.Link_active}
                    `}>
                      <Link to={to}>{label}</Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.Header__Right}>
                {user ? (
                  <div className={styles.UserInfo} onClick={() => setShowUserInfoActions(prev => !prev)}>
                    <div className={styles.Avatar}>
                      <img src={defaultAvatarIcon} />
                    </div>
                    <div className={styles.Arrow} style={{transform: showUserInfoActions && 'rotate(180deg)'}}>
                      <img src={arrowIcon} />
                    </div>
                  </div>
                ) : (
                  <button className={styles.Login} onClick={() => setLoginData({ show: true })}>
                    Войти
                  </button>
                )}
                {showUserInfoActions && (
                  <div className={styles.Actions}>
                    <div className={styles.Action}>Профиль</div>
                    <div
                      className={styles.Action}
                      onClick={() => {
                        dispatch({ type: 'EDITOR_LOGOUT' });
                        dispatch({ type: 'LOGOUT' });
                        setShowUserInfoActions(false);
                      }}
                    >
                      Выход
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.Body}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page;

// Libraries
import React from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from 'react-responsive';

// Components
import MobileMenu from '../MobileMenu';

// Contexts
import {LoginScreenDataContext} from '../../App';

// Methods
import {getMenu} from '../Editor/Menus';

// Assets
import closeIcon from '../../assets/service/closeIcon.svg';

// Styles
import styles from './style.module.scss';


const MENU_ICONS = {
  default: getMenu('tripleLines').icon,
  columnPoints: getMenu('columnPoints').icon,
  squarePoints: getMenu('squarePoints').icon,
  doubleLines: getMenu('doubleLines').icon,
  empty: null,
}

const Header = ({
  title,
  renderTitle,
  renderActionButton,
  userTabs,
  menuIcon
}) => {
  const {
    userData: {
      user
    },
  } = useSelector(store => store);
  const { setLoginData } = React.useContext(LoginScreenDataContext);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  return (
    <>
      <div className={styles.Header}>
        {isMobile ? (
          <div className={styles.Burger} onClick={() => setShowMobileMenu(prev => !prev)}>
            <img src={!showMobileMenu ? (MENU_ICONS[menuIcon] || MENU_ICONS.default) : closeIcon} alt='Закрыть' />
          </div>
        ) : <div />}
        <div className={styles.Title}>
          {title ? title : renderTitle && renderTitle()}
        </div>
        <div className={styles.Action}>
          {renderActionButton
            ? renderActionButton()
            : (!user && (
              <span onClick={() => setLoginData({ show: true })}>Войти</span>
            ))
          }
        </div>
      </div>
      <MobileMenu
        show={showMobileMenu}
        setShow={setShowMobileMenu}
        tabs={userTabs}
      />
    </>
  )
}

export default Header;

// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Button from '../../Button';
import Carousel from '../Carousel';

// Contexts
import {LoginScreenDataContext} from '../../../App';

// Icons
import arrowIcon from '../../../assets/service/arrowToBottom.svg';
import defaultAvatarIcon from '../../../assets/service/defaultAvatar.svg';

// Styles
import styles from './style.module.scss';

import slide1_1 from '../../../assets/landing/1-1.svg';
import slide1_2 from '../../../assets/landing/1-2.png';


const Header = () => {
  const dispatch = useDispatch();
  const [showUserInfoActions, setShowUserInfoActions] = React.useState(false);
  const { setLoginData } = React.useContext(LoginScreenDataContext);

  const carouselData = {
    imageSmall: slide1_1,
    imagesCarousel: [
      slide1_2
    ],
    imageSignatureText: '',
    imageSignatureBackgroundColor: '#E84B47',
    changeZIndex: true,
  };

  const cellsData = [
    {
      generalization: 'Мультиссылка',
      text: 'Разместите все нужные ссылки в одном месте'
    },
    {
      generalization: 'Лендинг',
      text: 'Повышайте интерес аудитории и возможность продаж'
    },
    {
      generalization: 'Интернет-магазин',
      text: 'Магазин с корзиной и приёмом оплат'
    },
    {
      generalization: 'Мессенджеры',
      text: 'Создайте умные ссылки на мессенджеры, позволяющие начать диалог с вами в один клик'
    },
  ];

  const { user } = useSelector(store => store.userData);

  return (
    <>
      <div className={styles.Sticky}>
        <div className={styles.Content}>
          <Link to='/'>
            <div className={styles.Logo}>BlueWave</div>
          </Link>
          <div className={styles.Row}>
            <Link to='tariffs' className={styles.Link}>Тарифы</Link>
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
              <Button
                size='small'
                background='#6442EE'
                color='#fff'
                events={{onClick: () => setLoginData({ show: true })}}
              >
                Войти
              </Button>
            )}
            {showUserInfoActions && (
              <div className={styles.Actions}>
                <div className={styles.Action}> Профиль</div>
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
      <div className={styles.Header}>
        <div className={`${styles.Content} ${styles.Content_main}`}>
          <div className={styles.Col}>
            <div className={styles.Title}>
              Увеличьте свои продажи
            </div>
            <div className={styles.Subtitle}>
              BlueWave позволяет клиенту выбрать удобный способ связи с вами и оплатить товары и услуги
            </div>
            <div className={styles.Cells}>
              {cellsData.map((cell, i) => (
                <div className={styles.Cell} key={i}>
                  <div className={styles.Generalization}>
                    {cell.generalization}
                  </div>
                  <div className={styles.Text}>
                    {cell.text}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.Button}>
              <Link to='/constructor'>
                <Button
                  background='#52CC7C'
                  color='#fff'
                  withArrow
                >
                  Попробовать сейчас
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.Col}>
            <Carousel {...carouselData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
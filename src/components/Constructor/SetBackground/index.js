
// Libraries
import React from 'react';

// Components
import ColorPicker from '../../ColorPicker';

// Assets
import checkedIconWhite from '../../../assets/service/checkedIconWhite.svg';

// Backgrounds
import background1 from '../../../assets/backgrounds/background1.jpg';
import background2 from '../../../assets/backgrounds/background2.jpg';
import background3 from '../../../assets/backgrounds/background3.jpg';
import background4 from '../../../assets/backgrounds/background4.jpg';
import background5 from '../../../assets/backgrounds/background5.jpg';
import background6 from '../../../assets/backgrounds/background6.jpg';
import background7 from '../../../assets/backgrounds/background7.jpg';
import background8 from '../../../assets/backgrounds/background8.jpg';
import background9 from '../../../assets/backgrounds/test.svg';

// Styles
import styles from '../../Editor/style.module.scss';


const SetBackground = ({ formData, handleChangeFormData }) => {
  const BACKGROUNDS = [
    {
      id: 0,
      image: null
    },
    {
      id: 1,
      image: background1
    },
    {
      id: 2,
      image: background2
    },
    {
      id: 3,
      image: background3
    },
    {
      id: 4,
      image: background4
    },
    {
      id: 5,
      image: background5
    },
    {
      id: 6,
      image: background6
    },
    {
      id: 7,
      image: background7
    },
    {
      id: 8,
      image: background8
    },
    {
      id: 9,
      image: background9
    }
  ];

  return (
    <>
      <ColorPicker
        placeholder='Цвет фона'
        color={formData?.color || '#f3f2f7'}
        onChange={color => handleChangeFormData({ color })}
        style={{ marginBottom: 20 }}
        disabled={formData?.background.id !== 0}
      />
      <div className={styles.Block__Label}>Фон</div>
      <div
        className={styles.Block__Backgrounds}
        style={{gridTemplateColumns: `repeat(3, 1fr)`}}
      >
        {BACKGROUNDS.map(background => (
          <div
            className={styles.Block__Background}
            style={{backgroundColor: !background.image && formData?.color}}
            onClick={() => handleChangeFormData({ background })}
          >
            {background.image && (
              <img
                src={background.image}
                alt='Карточка фона'
                className={styles.Block__BackgroundImg}
              />
            )}
            {(formData?.background.id === background.id || (!background && !formData?.color)) && (
              <div className={styles.Block__Checked}>
                <div className={styles.Block__Checked__Button}>
                  <img src={checkedIconWhite} alt='Выбрано' />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default SetBackground;
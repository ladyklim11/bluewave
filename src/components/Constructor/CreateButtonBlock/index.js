
// Libraries
import React from 'react';

// Components
import ColorPicker from '../../ColorPicker';
import InputWithImage from '../../InputWithImage';
import Input from '../../Input';

// Contexts
import {PhoneScreenDataContext} from '../../Editor';

// Assets
import linkButton from '../../../assets/buttonsIcons/link.svg';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateButtonBlock = ({ formData, handleChangeFormData }) => {
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);

  const SIZES = [
    {
      label: 'Маленькая кнопка',
      value: 'small'
    },
    {
      label: 'Обычная кнопка',
      value: 'medium'
    },
    {
      label: 'Большая кнопка',
      value: 'big'
    }
  ];

  const ANIMATIONS = [
    {
      label: 'Нет',
      value: 'null'
    },
    {
      label: 'Flash (движение белой полосы слева направо под углом 30 градусов)',
      value: 'flash'
    },
    {
      label: 'Light (движение белой полосы слева направо под углом 90 градусов)',
      value: 'light'
    },
    {
      label: 'Ripple (движение белого полукруга слева направо из нижнего угла)',
      value: 'ripple'
    },
  ];

  const PAGES = JSON.parse(localStorage.getItem('reduxState')).editorPages.map(page => ({
    label: page.name,
    subLabel: page.link,
    value: page.link,
  }));

  return (
    <>
      <div
        className={styles.Block__LikeInput}
        style={{background: '#fff', marginBottom: 8}}
        onClick={() => setPhoneScreenData(prev => ({
          ...prev,
          isShow: true,
          setHide: size => {
            handleChangeFormData({ size });
            setPhoneScreenData(() => ({ isShow: false }));
          },
          title: 'Размер кнопки',
          additionalFunctional: {
            defaultType: 'radio',
            dataForDefaultType: SIZES,
            defaultValueForDefaultType: formData.size
          }
        }))}
      >
        {SIZES.find(size => size.value === formData.size)?.label || formData.size}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
        <ColorPicker
          placeholder='Цвет кнопки'
          color={formData.backgroundColor}
          onChange={color => handleChangeFormData({ backgroundColor: color })}
          style={{width: 'calc(50% - 4px)'}}
        />
        <ColorPicker
          placeholder='Цвет текста'
          color={formData.textColor}
          onChange={color => handleChangeFormData({ textColor: color })}
          style={{width: 'calc(50% - 4px)'}}
        />
      </div>
      <Input
        placeholder='Введите название кнопки'
        onChange={e => handleChangeFormData({ text: e.target.value })}
        value={formData.text}
        style={{marginBottom: 24}}
      />
      <div className={styles.Block__Label}>Ссылка</div>
      <InputWithImage
        icon={linkButton}
        inputProps={{
          placeholder: 'Ссылка для кнопки',
          onChange: e => handleChangeFormData({ link: e.target.value }),
          value: formData.link
        }}
      />
      <div
        className={styles.Block__LikeLink}
        style={{ marginBottom: 20 }}
        onClick={() => setPhoneScreenData(prev => ({
          ...prev,
          isShow: true,
          setHide: link => {
            setPhoneScreenData(() => ({ isShow: false }));
            handleChangeFormData({ link })
          },
          title: 'Выбрать страницу',
          additionalFunctional: {
            defaultType: 'radio',
            dataForDefaultType: PAGES,
            defaultValueForDefaultType: formData.link
          }
        }))}
      >
        Выбрать страницу
      </div>
      <div className={styles.Block__Label}>Анимация</div>
      <div
        className={styles.Block__LikeInput}
        style={{background: '#fff'}}
        onClick={() => setPhoneScreenData(prev => ({
          ...prev,
          isShow: true,
          setHide: animation => {
            setPhoneScreenData(() => ({ isShow: false }));
            handleChangeFormData({ animation })
          },
          title: 'Анимация',
          additionalFunctional: {
            defaultType: 'radio',
            dataForDefaultType: ANIMATIONS,
            defaultValueForDefaultType: formData.animation
          }
        }))}
      >
        {ANIMATIONS.find(animation => animation.value === formData.animation)?.label || ANIMATIONS[0].label}
      </div>
    </>
  )
}

export default CreateButtonBlock;
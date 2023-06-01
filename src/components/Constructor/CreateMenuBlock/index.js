
// Libraries
import React from 'react';

// Components
import {PhoneScreenDataContext} from '../../Editor';
import InputWithImage from '../../InputWithImage';

// Functions
import {getMenus} from '../../Editor/Menus';

// Assets
import linkButton from '../../../assets/buttonsIcons/link.svg';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateMenuBlock = ({ formData, handleChangeFormData }) => {
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);

  const PAGES = JSON.parse(localStorage.getItem('reduxState')).editorPages.map(page => ({
    label: page.name,
    subLabel: page.link,
    value: page.link,
  }));

  return (
    <>
      <div className={styles.Block__Label}>Тип меню</div>
      <div className={styles.Block__Zones} style={{marginBottom: 24}}>
        {getMenus().map(menu => (
          <div
            className={`
              ${styles.Block__Zone} 
              ${(menu.id === formData.menuIconId) && styles.Block__Zone_selected}
            `}
            onClick={() => handleChangeFormData({ menuIconId: menu.id })}
          >
            <img src={menu.icon} alt='Иконка' />
          </div>
        ))}
      </div>
      {formData.links.map((link, i) => (
        <>
          <InputWithImage
            icon={linkButton}
            inputProps={{
              placeholder: 'Ссылка для кнопки',
              onChange: e => {
                const links = [...formData.links];
                links[i] = e.target.value;
                handleChangeFormData({ links });
              },
              value: link?.to,
            }}
          />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <div
              className={styles.Block__LikeLink}
              onClick={() => setPhoneScreenData(prev => ({
                ...prev,
                isShow: true,
                setHide: to => {
                  const label = PAGES.find(page => page.value === to)?.label;
                  setPhoneScreenData(() => ({ isShow: false }));
                  const updatedLinks = [...formData.links];
                  updatedLinks[i] = { to, label };
                  handleChangeFormData({ links: updatedLinks })
                },
                title: 'Выбрать страницу',
                additionalFunctional: {
                  defaultType: 'radio',
                  dataForDefaultType: PAGES,
                  defaultValueForDefaultType: formData.links[i]?.to
                }
              }))}
            >
              Выбрать страницу
            </div>
            <div
              className={styles.Block__LikeLink}
              onClick={() => handleChangeFormData({ links: [...formData.links.slice(0, i), ...formData.links.slice(i + 1)] })}
            >
              Удалить
            </div>
          </div>
        </>
      ))}
      <button
        onClick={() => handleChangeFormData({ links: [...formData.links, null] })}
        disabled={formData.links.length >= 10}
      >
        Добавить ссылку
      </button>
    </>
  )
}

export default CreateMenuBlock;
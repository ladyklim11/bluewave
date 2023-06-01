
// Libraries
import React from 'react';

// Components
import InputWithImage from '../../InputWithImage';

// Constants
import {SOCIALS} from '../../Editor/constants';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateSocialsBlock = ({ formData, handleChangeFormData }) => {
  const list = ['vk', 'facebook', 'youtube'];
  const placeholders = ['vk.com/id542354', 'facebook.com/234532453', 'youtube.com/channel/4235432'];
  const USED_SOCIALS_HERE = Object.entries(SOCIALS).filter(([id]) => list.find(social => social === id));
  const sortedSocials = list.map(item => USED_SOCIALS_HERE.find(([social]) => item === social)).filter(item => item);

  return sortedSocials.map(([id, content], i) => (
    <>
      <div className={styles.Block__Label}>Ссылка на аккаунт {content.label}</div>
      <InputWithImage
        icon={content.buttonIcon}
        inputProps={{
          placeholder: placeholders[i],
          onChange: e => handleChangeFormData({ [id]: e.target.value }),
          value: formData && formData[id],
          style: { marginBottom: 20 }
        }}
      />
    </>
  ));
}

export default CreateSocialsBlock;
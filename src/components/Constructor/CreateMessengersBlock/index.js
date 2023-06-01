
// Libraries
import React from 'react';

// Components
import InputWithImage from '../../InputWithImage';

// Constants
import {SOCIALS} from '../../Editor/constants';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateMessengersBlock = ({ formData, handleChangeFormData }) => {
  const list = ['telegram', 'whatsapp', 'viber', 'skype'];
  const placeholders = ['@example или 79923532312', '@example или 79923532312', '@example или 79923532312', '@example']
  const USED_SOCIALS_HERE = Object.entries(SOCIALS).filter(([id]) => list.find(social => social === id));
  const sortedSocials = list.map(item => USED_SOCIALS_HERE.find(([social]) => item === social)).filter(item => item);

  return sortedSocials.map(([id, content], i) => (
    <>
      <div className={styles.Block__Label}>Аккаунт {content.label}</div>
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
  ))
}

export default CreateMessengersBlock;
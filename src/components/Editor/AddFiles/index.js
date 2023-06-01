
// Libraries
import React from 'react';

// Assets
import camIcon from '../../../assets/service/cam.svg';

// Styles
import styles from './style.module.scss';


const AddFiles = ({ title, onChange, isMultiple, style }) => {
  return (
    <>
      <div
        className={styles.Field}
        onClick={() => document.getElementById('image_load').click()}
        style={style}
      >
        <div className={styles.Image}>
          <img src={camIcon} alt='Иконка' />
        </div>
        <div className={styles.Text}>
          {title}
        </div>
      </div>
      <input
        id='image_load'
        placeholder='Загрузить файл'
        type='file'
        onChange={onChange}
        style={{display: 'none'}}
        multiple={isMultiple}
      />
    </>
  )
}

export default AddFiles;
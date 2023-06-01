
// Libraries
import React from 'react';

// Components
import ColorPicker from '../../ColorPicker';

// Functions
import {getDividers} from '../../Editor/Dividers';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateDividerBlock = ({ formData, handleChangeFormData }) => {
  return (
    <>
      <ColorPicker
        placeholder='Цвет разделителя'
        color={formData.backgroundColor}
        onChange={color => handleChangeFormData({ backgroundColor: color })}
        style={{ marginBottom: 20 }}
      />
      <div className={styles.Block__Label}>Тип разделителя</div>
      <div className={styles.Block__Zones}>
        {getDividers().map(divider => (
          <div
            className={`
              ${styles.Block__Zone} 
              ${divider.id === formData.dividerId && styles.Block__Zone_selected}
            `}
            onClick={() => handleChangeFormData({ dividerId: divider.id })}
          >
            {divider.content('#6442EE')}
          </div>
        ))}
      </div>
    </>
  )
}

export default CreateDividerBlock;
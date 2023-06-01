
// Libraries
import React from 'react';

// Components
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import ColorPicker from '../../ColorPicker';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateBreadcrumbsBlock = ({ formData, handleChangeFormData }) => {
  return (
    <>
      <ColorPicker
        placeholder='Цвет текста'
        color={formData.textColor}
        onChange={color => handleChangeFormData({ textColor: color })}
        style={{ marginBottom: 20 }}
      />
      <div className={styles.Block__Label}>Размещение</div>
      <RadioGroup
        onChange={e => handleChangeFormData({ position: e.target.value })}
        value={formData.position}
      >
        <FormControlLabel value='left' control={<Radio />} label='Слева' />
        <FormControlLabel value='right' control={<Radio />} label='Справа' />
      </RadioGroup>
    </>
  )
}

export default CreateBreadcrumbsBlock;

// Libraries
import React from 'react';

// Components
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MSelect
} from '@material-ui/core';


const Select = ({ items = [], inputLabel, value, onChange, style }) => {
  return (
    <FormControl style={{...style}}>
      {inputLabel && <InputLabel>{inputLabel}</InputLabel>}
      <MSelect
        value={value}
        onChange={onChange}
        variant='outlined'
      >
        {items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
      </MSelect>
    </FormControl>
  )
}

export default Select;
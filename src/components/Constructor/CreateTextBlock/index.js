
// Libraries
import React from 'react';

// Components
import TextEditor from '../../Editor/TextEditor';


const CreateTextBlock = ({ formData, handleChangeFormData }) => {
  return (
    <TextEditor
      value={formData}
      onChange={value => handleChangeFormData(value)}
    />
  )
}

export default CreateTextBlock;
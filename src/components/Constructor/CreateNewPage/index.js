
// Libraries
import React from 'react';

// Components
import Input from '../../Input';


const CreateNewPage = ({ formData, handleChangeFormData }) => {
  return (
    <>
      <Input
        placeholder='Введите название страницы'
        onChange={e => handleChangeFormData({ title: e.target.value })}
        value={formData.title}
        style={{marginBottom: 6}}
      />
      <Input
        placeholder='Адрес страницы'
        onChange={e => handleChangeFormData({ url: e.target.value })}
        value={formData.url}
      />
    </>
  )
}

export default CreateNewPage;
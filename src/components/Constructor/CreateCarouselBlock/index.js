
// Libraries
import React from 'react';

// Components
import {FormControlLabel, Switch} from '@material-ui/core';
import AddFiles from '../../Editor/AddFiles';

// Assets
import removeIcon from '../../../assets/actionsIcons/remove.svg';

// Styles
import styles from '../../Editor/style.module.scss';
import Input from "../../Input";


const CreateCarouselBlock = ({ formData, handleChangeFormData }) => {
  return (
    <>
      {!!formData.photos.length && formData.photos.map(({ image }, i) => (
        <div className={styles.Block__Preview}>
          <img
            src={image}
            alt='Превью'
            style={{
              width: '100%'
            }}
          />
          <div
            className={styles.Block__PreviewRemove}
            onClick={() => {
              const splicedData = [...formData.photos];
              splicedData.splice(i, 1);
              handleChangeFormData({ photos: splicedData });
            }}
          >
            <img src={removeIcon} style={{width: '100%', height: '100%'}} alt='Удалить' />
          </div>
        </div>
      ))}
      <AddFiles
        title='Загрузить файлы'
        onChange={e => {
          const fileToDataURL = file => {
            const reader = new FileReader();
            return new Promise(function (resolve) {
              reader.onload = function (event) {
                resolve(event.target.result)
              };
              reader.readAsDataURL(file);
              return 'loh';
            })
          }

          Promise.all([...e.target.files].map(fileToDataURL)).then(uploadedImages => handleChangeFormData({
            photos: [
              ...formData.photos,
              ...uploadedImages.map(image => ({ image }))
            ]
          }))
        }}
        isMultiple
        style={{marginBottom: 20, height: '150px'}}
      />
      {!!formData.photos.length && (
        <>
          <div className={styles.Switch} style={{marginTop: 0, marginBottom: 20}}>
            <FormControlLabel
              control={(
                <Switch
                  checked={formData.autoplay}
                  onClick={e => handleChangeFormData({ autoplay: e.target.checked })}
                />
              )}
              label='Автоматическая смена слайдов'
            />
          </div>
          <Input
            placeholder='Скорость смены слайдов (в секундах)'
            onChange={e => handleChangeFormData({ speed: e.target.value })}
            value={formData.speed}
            style={{ marginBottom: 20 }}
            disabled={!formData.autoplay}
          />
        </>
      )}
    </>
  )
}

export default CreateCarouselBlock;
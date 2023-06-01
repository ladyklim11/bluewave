
// Libraries
import React from 'react';

// Components
import {FormControlLabel, Switch} from '@material-ui/core';
import Cropp from '../../Cropper';
import AddFiles from '../../Editor/AddFiles';
import InputWithImage from '../../InputWithImage';

// Assets
import removeIcon from '../../../assets/actionsIcons/remove.svg';
import linkButton from '../../../assets/buttonsIcons/link.svg';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateImageBlock = ({ formData, handleChangeFormData }) => {
  const [localState, setLocalState] = React.useState({
    src: null,
    image: null,
    link: null
  });
  const handleChangeLocalState = value => setLocalState(prev => ({ ...prev, ...value }));

  return (
    <>
      {localState.image && (
        <div style={{marginBottom: 20}}>
          <Cropp
            img={formData?.url || localState?.image || localState?.url}
            onSelectCrop={(image, is_avatar) => handleChangeFormData({ image, is_avatar, url: null })}
          />
        </div>
      )}
      {formData.url || formData.image
        ? (
          <>
            <div className={styles.Block__Preview}>
              <img
                src={formData.url || formData.image}
                alt='Превью'
                className={formData.is_avatar ? 'Avatar' : undefined}
              />
              <div
                className={styles.Block__PreviewRemove}
                onClick={() => {
                  handleChangeLocalState({ src: null, image: null, link: null });
                  handleChangeFormData({ image: null, url: null });
                }}
              >
                <img src={removeIcon} style={{width: '100%', height: '100%'}} alt='Удалить' />
              </div>
            </div>
            <div className={styles.Switch}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={formData.is_avatar}
                    onClick={e => handleChangeFormData({ is_avatar: e.target.checked })}
                  />
                )}
                label='Аватар'
              />
            </div>
          </>
        )
        : !localState.image && !localState.url
          ? (
            <>
              <div className={styles.Block__Preview}>
                <AddFiles
                  title='Загрузить файл'
                  onChange={e => handleChangeLocalState({ image: e.target.files[0] })}
                />
              </div>
              <div className={styles.Block__Label}>Загрузка по ссылке</div>
              <InputWithImage
                icon={linkButton}
                inputProps={{
                  placeholder: 'Вставьте ссылку...',
                  onChange: e => handleChangeLocalState({ link: e.target.value }),
                  value: localState.link,
                  style: { marginBottom: 20 }
                }}
              />
              <button
                style={{
                  marginTop: 8,
                  backgroundColor: 'rgba(100, 66, 238, 0.07)',
                  color: '#6442EE',
                  boxShadow: 'none',
                }}
                className='small'
                onClick={() => handleChangeFormData({ url: localState.link })}
                disabled={!localState.link}
              >
                Загрузить
              </button>
            </>
          )
          : ''
      }
    </>
  )
}

export default CreateImageBlock;
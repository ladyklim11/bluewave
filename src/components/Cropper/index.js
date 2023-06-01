
// Libraries
import React, { useState } from 'react';
import Cropper from 'react-cropper';

// Components
import {FormControlLabel, Switch} from '@material-ui/core';

// Styles
import 'cropperjs/dist/cropper.css';
import './style.css';
import styles from '../Editor/style.module.scss';


export const Cropp = ({ img, onSelectCrop }) => {
  const [image, setImage] = useState(null);
  const [saved, setSaved] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(img);
  }, []);

  const [cropData, setCropData] = useState('#');

  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  React.useEffect(() => {
    if (saved) {
      onSelectCrop(cropData, isAvatar);
    }
  }, [saved])

  return (
    <div>
      <div style={{ width: '100%' }}>
        {!saved && (
          <div className={isAvatar && 'AVATAR_SELECT'}>
            <Cropper
              style={{ height: 400, width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview='.img-preview'
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              cropBoxMovable={false}
              cropBoxResizable={false}
              toggleDragModeOnDblclick={!isAvatar}
              background={false}
              responsive={false}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <div className={styles.Switch}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={isAvatar}
                    onClick={e => setIsAvatar(e.target.checked)}
                  />
                )}
                label='Аватар'
              />
            </div>
            <button
              style={{marginTop: 10}}
              onClick={e => {
                getCropData(e);
                setSaved(true);
              }}
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cropp;

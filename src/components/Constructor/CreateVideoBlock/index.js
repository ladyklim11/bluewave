
// Libraries
import React from 'react';

// Components
import InputWithImage from '../../InputWithImage';

// Constants
import {SOCIALS} from '../../Editor/constants';

// Styles
import styles from '../../Editor/style.module.scss';


const CreateVideoBlock = ({ formData, handleChangeFormData }) => {
  const [error, setError] = React.useState(null);

  // нужно в будущих релизах это подправить
  const validateYouTubeUrl = (url) => {
    if (url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (!(match && match[2].length === 11)) {
        setError('Ошибка загрузки. Вставьте Youtube-ссылку');
      }
      else {
        setError(null);
      }
    }
  }

  React.useEffect(() => {
    validateYouTubeUrl(formData.url);
  }, [formData.url])

  return (
    <>
      <div className={styles.Block__Label}>Ссылка на youtube видео</div>
      <InputWithImage
        icon={SOCIALS.youtube.buttonIcon}
        inputProps={{
          placeholder: 'google.com/search',
          onChange: e => handleChangeFormData({ url: e.target.value }),
          value: formData.url,
          style: { marginBottom: 20 }
        }}
        error={error}
      />
    </>
  )
}

export default CreateVideoBlock;
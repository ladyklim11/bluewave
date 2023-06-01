
// Libraries
import React from 'react';

// Styles
import styles from './style.module.scss';
import AddFiles from "../Editor/AddFiles";
import removeIcon from "../../assets/actionsIcons/remove.svg";
import {checkRules} from "../Editor/BlockCreator";


const VALIDATION = {
  image: {
    required: true
  },
  link: {
    required: true
  },
  name: {
    required: true
  },
  price: {
    required: true
  },
  description: {
    required: true
  }
};

const ActionScreen = ({ show, formData: defaultData, onSubmit }) => {
  const [formData, setFormData] = React.useState(defaultData);

  React.useEffect(() => {
    setFormData(defaultData);
  }, [defaultData]);

  const handleChangeFormData = value => setFormData(prev => ({ ...prev, ...value }));

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  return show ? (
    <div className={styles.Container}>
      {formData && (
        <div className={styles.Wrapper}>
          <div className={styles.Forms}>
            {formData.image ? (
              <div className={styles.Preview}>
                <img
                  src={formData.image}
                  alt='Превью'
                />
                <div
                  className={styles.PreviewRemove}
                  onClick={() => {
                    handleChangeFormData({ image: null });
                  }}
                >
                  <img src={removeIcon} style={{width: '100%', height: '100%'}} alt='Удалить' />
                </div>
              </div>
            ) : (
              <AddFiles
                title='Загрузить изображение'
                style={{height: 150}}
                value={formData.image}
                onChange={e => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    handleChangeFormData({ image: reader.result });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
            )}
            <div className={styles.Item}>
              <div className={styles.Title}>Название товара</div>
              <input value={formData.name} onChange={e => handleChangeFormData({ name: e.target.value })} />
            </div>
            <div className={styles.Item}>
              <div className={styles.Title}>Цена товара</div>
              <input value={formData.price} onChange={e => handleChangeFormData({ price: e.target.value })} />
            </div>
            <div className={styles.Item}>
              <div className={styles.Title}>Описание</div>
              <input value={formData.description} onChange={e => handleChangeFormData({ description: e.target.value })} />
            </div>
            <div className={styles.Item}>
              <div className={styles.Title}>Ссылка</div>
              <input value={formData.link} onChange={e => handleChangeFormData({ link: e.target.value })} />
            </div>
          </div>
          <button
            className={styles.Button}
            onClick={() => onSubmit(formData)}
            disabled={!checkRules(formData, VALIDATION)}
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  ) : <></>
};

export default ActionScreen;
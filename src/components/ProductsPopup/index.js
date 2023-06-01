
// Libraries
import React from 'react';

// Components
import AddFiles from '../Editor/AddFiles';

// Assets
import removeIcon from '../../assets/actionsIcons/remove.svg';
import closeIcon from '../../assets/service/closeIcon.svg';

// Styles
import styles from './style.module.scss';
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

const ProductsPopup = ({ show, defaultValues, title, handleHidePopup, onSubmit }) => {
  const [formData, setFormData] = React.useState(defaultValues);

  React.useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  React.useEffect(() => {
    if (!show) {
      setFormData(null);
    }
  }, [show]);

  const handleChangeFormData = value => setFormData(prev => ({ ...prev, ...value }));


  const PAYMENT_TYPES = [
    {
      label: 'Категория 1',
      value: '1'
    },
    {
      label: 'Категория 2',
      value: '2'
    },
    {
      label: 'Категория 3',
      value: '3'
    }
  ];

  return (
    <>
      {show && (
        <div className={styles.Popup}>
          <div className={styles.Shadow} onClick={handleHidePopup} />
          <div className={styles.Content}>
            <div className={styles.Wrapper}>
              <div className={styles.CloseIcon} onClick={handleHidePopup}>
                <img src={closeIcon} alt='Закрыть' />
              </div>
              <div className={styles.Title}>{title}</div>
              <div className={styles.Form}>
                {formData?.image ? (
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
                  <div className={styles.AddFile}>
                    <AddFiles
                      title='Загрузить файл'
                      onChange={e => {
                        const reader = new FileReader();
                        reader.onload = () => {
                          handleChangeFormData({ image: reader.result });
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.Form}>
                <div className={styles.Label}>Название товара</div>
                <input
                  placeholder='Введите название'
                  className={styles.Input}
                  value={formData?.name}
                  onChange={e => handleChangeFormData({ name: e.target.value })}
                />
              </div>
              <div className={styles.Form}>
                <div className={styles.Label}>Цена товара</div>
                <input
                  placeholder='Введите цену'
                  className={styles.Input}
                  value={formData?.price}
                  onChange={e => handleChangeFormData({ price: e.target.value })}
                />
              </div>
              {/*<div className={styles.Form}>
                <div className={styles.Label}>Категория</div>
                <PhoneSelect
                  title={formData?.category ? formData.category.label : 'Выбрать категорию'}
                  type='radio'
                  items={PAYMENT_TYPES}
                  handleChange={category => handleChangeFormData({ category })}
                  style={{marginBottom: 8}}
                  onlyPhoneMode={false}
                />
              </div>*/}
              <div className={styles.Form}>
                <div className={styles.Label}>Описание товара</div>
                <input
                  placeholder='Введите описание'
                  className={styles.Input}
                  value={formData?.description}
                  onChange={e => handleChangeFormData({ description: e.target.value })}
                />
              </div>
              <div className={styles.Form}>
                <div className={styles.Label}>Ссылка</div>
                <input
                  placeholder='Введите ссылку'
                  className={styles.Input}
                  value={formData?.link}
                  onChange={e => handleChangeFormData({ link: e.target.value })}
                />
              </div>
              <div className={styles.Row}>
                <button
                  className={styles.ButtonReject}
                  onClick={handleHidePopup}
                >
                  Отмена
                </button>
                <button
                  className={styles.ButtonAccept}
                  onClick={() => {
                    handleHidePopup();
                    onSubmit(formData);
                  }}
                  disabled={!checkRules(formData, VALIDATION)}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductsPopup;
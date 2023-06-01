
// Libraries
import React from 'react';

// Assets
import styles from './style.module.scss';

// Styles
import deleteIcon from '../../../assets/actionsIcons/deleteGray.svg';
import editIcon from '../../../assets/service/edit.svg';


const ProductCard = ({ product, actions }) => {
  return (
    <div className={styles.ProductCard}>
      <div className={styles.Preview}>
        <img src={product.image.url || product.image} alt='Картинка продукта' />
      </div>
      <div className={styles.Content}>
        {actions ? (
          <>
            <div className={styles.Name}>{product.name}</div>
            <div className={styles.Description}>{product.description}</div>
            <div className={styles.Price2}>{product.price} Р</div>
            <div className={styles.Actions}>
              {actions?.edit && (
                <div
                  className={styles.Action}
                  onClick={() => actions.edit()}
                >
                  <img src={editIcon} alt='Редактировать' />
                </div>
              )}
              {actions?.delete && (
                <div
                  className={styles.Action}
                  onClick={() => actions.delete()}
                >
                  <img src={deleteIcon} alt='Удалить' />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.Title}>
              {product.name}
            </div>
            <div className={styles.Desc}>
              {product.desc}
            </div>
            <div className={styles.Price}>
              {product.price} Р
            </div>
            <button className={styles.Button}>
              Купить
            </button>
          </>
        )}
      </div>
    </div>
  )
};

export default ProductCard;
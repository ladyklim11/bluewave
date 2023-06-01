
// Libraries
import React from 'react';
import {useSelector} from 'react-redux';

// Components
import Page from '../../components/Page';
import Table from '../../components/Table';
import ProductsPopup from '../../components/ProductsPopup';
import {LoaderDataContext} from '../../App.js';
import styles from './style.module.scss';
import plusIcon from '../../assets/service/plus.svg';
import {useMediaQuery} from 'react-responsive';
import ProductCard from '../../components/Constructor/ProductCard';
import {API} from '../../constants';
import PhoneScreen from "../../components/Editor/PhoneScreen";
import basketIcon from "../../assets/service/basket.svg";
import {Link} from "react-router-dom";
import ActionScreen from "../../components/ActionScreen";
import closeIcon from "../../assets/service/closeIcon.svg";


const Products = () => {
  const {
    userData: {
      user,
      token
    },
  } = useSelector(store => store);
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const canUse = user?.level >= 3;

  const [products, setProducts] = React.useState(null);
  const [popupData, setPopupData] = React.useState({
    show: false,
    defaultValues: null
  });
  const [actionsData, setActionsData] = React.useState({
    mode: null,
    id: null
  });
  const { setLoaderData } = React.useContext(LoaderDataContext);

  const rows = React.useMemo(() => products && products.data.map(({ id, category_id, image, name, price, description, link }) => ({
    id,
    values: {
      image: image.url,
      name,
      price,
      category: category_id,
      description,
      link,
    },
  })), [products]);

  const handleHidePopup = () => setPopupData(() => ({ show: false }));

  const columns = React.useMemo(() => ([
    'Изображение',
    'Название',
    'Цена',
    'Категория',
    'Описание',
    'Ссылка',
  ]), []);

  React.useEffect(() => {
    if (canUse) {
      setLoaderData({ loading: true });
      fetch(`${API}/api/card-product`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => {
          setProducts(res);
          setLoaderData({ loading: false });
        })
        .catch(() => setLoaderData({ loading: false }));
    }
  }, [user]);

  const handleAddProduct = product => {
    fetch(`${API}/api/card-product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(res => setProducts(prev => ({ ...prev, data: [...prev.data, res] })))
  };

  const handleEditProduct = product => {
    fetch(`${API}/api/card-product/${actionsData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(res => setProducts(prev => ({ ...prev, data: prev.data.map(prevProduct => prevProduct.id === res.id ? res : prevProduct) })))
  };

  const handleDeleteProduct = ({ id }) => {
    fetch(`${API}/api/card-product/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(() => setProducts(prev => ({ ...prev, data: prev.data.filter(prevProduct => prevProduct.id !== id) })))
  };

  const editProduct = product => {
    setActionsData({ mode: 'edit', id: product.id });
    setPopupData({ show: true, title: 'Изменить товар', defaultValues: product.values })
  };

  const [actionScreenData, setActionScreenData] = React.useState({
    isShow: false,
    formData: null
  });

  return (
    <>
      <Page
        headerProps={{
          title: isMobile
            ? actionsData.mode === 'edit'
              ? 'Изменить товар'
              : actionsData.mode === 'add'
                ? 'Добавить товар'
                : 'Товары'
            : 'Товары',
          renderActionButton: () => (
            <div
              className={styles.CloseIcon}
              onClick={() => {
                setActionScreenData({ isShow: false });
                setActionsData({
                  mode: null,
                  id: null
                })
              }}
            >
              {actionsData.mode && (
                <img src={closeIcon} alt='Закрыть' />
              )}
            </div>
          )
        }}
      >
        {isMobile ? (
          <ActionScreen
            {...actionScreenData}
            onSubmit={product => {
              actionsData.mode === 'edit' ? handleEditProduct(product) : handleAddProduct(product)
              setActionScreenData({ show: false })
            }}
          />
        ) : (
          <ProductsPopup
            {...popupData}
            handleHidePopup={handleHidePopup}
            onSubmit={product => actionsData.mode === 'edit' ? handleEditProduct(product) : handleAddProduct(product)}
          />
        )}
        <div className={styles.Wrapper}>
          {canUse && (
            <button
              className={styles.CreateButton}
              onClick={() => {
                const defaultValues = {
                  image: null,
                  name: null,
                  price: null,
                  category: null,
                  description: null,
                  link: null
                };

                setActionsData({ mode: 'add', id: null })
                setPopupData({ show: true, title: 'Добавить товар', defaultValues } );
                setActionScreenData({ show: true, formData: defaultValues });
              }}
            >
              <div className={styles.Plus}>
                <img src={plusIcon} alt='' />
              </div>
              <span style={{marginBottom: 2}}>Создать</span>
            </button>
          )}
          {!canUse && isMobile && (
            <div className={styles.Alert}>
              <div className={styles.Alert__Circle}>
                <img src={basketIcon} alt='' />
              </div>
              <div className={styles.Alert__Info}>
                Список всех товаров, которые представлены в вашем магазине и доступны для заказа
              </div>
              <span className={styles.Alert__Splash}>PRO</span>
              <div className={styles.Alert__Level}>Доступно на PRO-тарифе.&nbsp;</div>
              <Link to='tariffs' className={styles.Alert__Link}>К тарифам</Link>
            </div>
          )}
          {isMobile ? products && rows.map(({ id, values: product }) => (
            <ProductCard
              product={product}
              actions={{
                delete: () => handleDeleteProduct({ id }),
                edit: () => {
                  setActionsData({ mode: 'edit', id });
                  setPopupData({ show: true, title: 'Изменить товар', defaultValues: product });
                  setActionScreenData({ show: true, formData: product });
                }
              }}
            />
          )) : (
            <Table
              rows={rows}
              columns={columns}
              handleEdit={editProduct}
              handleDelete={handleDeleteProduct}
              canUse={canUse}
            />
          )}
        </div>
      </Page>
    </>
  )
}

export default Products;
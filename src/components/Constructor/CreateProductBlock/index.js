
// Libraries
import React from 'react';
import {useSelector} from 'react-redux';

// Components
import PhoneSelect from '../../PhoneSelect';
import ProductCard from '../ProductCard';

// Constants
import {API} from '../../../constants';

// Contexts
import {LoaderDataContext} from '../../../App';


const CreateProductBlock = ({ formData, handleChangeFormData }) => {
  const {
    userData: {
      token
    },
  } = useSelector(store => store);
  const { setLoaderData } = React.useContext(LoaderDataContext);
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
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
        setLoaderData({ loading: false });
        setProducts(res.data);
      })
      .catch(() => setLoaderData({ loading: false }));
  }, []);

  return (
    <>
      <PhoneSelect
        title={formData.products.length > 0 ? `Выбрано ${formData.products.length} товар(ов)` : 'Выберите товар из списка'}
        type='checkbox'
        items={products && products.map(product => ({
          label: product.name,
          value: product.id
        }))}
        handleChange={selectedProducts => {
          const selectedProductsIds = selectedProducts.map(({ value }) => value);
          handleChangeFormData({ products: products.filter(product => selectedProductsIds.includes(product.id))})
        }}
        style={{marginBottom: 8}}
        defaultValues={formData.products.map(({ id, name }) => ({ label: name, value: id }))}
      />
      {formData.products.map(product => (
        <ProductCard
          product={product}
          actions={{
            delete: () => handleChangeFormData({products: formData.products.filter(item => item.id !== product.id)})
          }}
        />
      ))}
      {/* <div className={styles.Empty}>
              <div className={styles.Circle} />
              <div className={styles.EmptyText}>
                У вас пока нет ни одного товара
              </div>
            </div>*/}
    </>
  )
}

export default CreateProductBlock;
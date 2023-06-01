
// Libraries
import React from 'react';

// Components
import {LoaderDataContext} from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
import styles from './style.module.scss';


const Loader = () => {
  const { loaderData } = React.useContext(LoaderDataContext);

  const {
    loading,
    // Мы можем добавить сюда вывод текста, в будущем
    // Поэтому структура не формата loading: true без объекта
  } = loaderData;

  return (
    <>
      {loading && (
        <div className={styles.Loader}>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default Loader;

// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';

// Components
import {
  Table as MaterialUiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

// Assets
import basketIcon from '../../assets/service/basket.svg';
import EditIcon from '../../assets/tableIcons/edit.svg';
import DeleteIcon from '../../assets/tableIcons/delete.svg';

// Styles
import styles from './style.module.scss';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});


const Table = ({ rows, columns, handleEdit, handleDelete, canUse }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EditButton = ({ data }) => (
    <button
      className={styles.Button}
      onClick={() => handleEdit(data)}
    >
      <img src={EditIcon} alt='Редактировать' />
    </button>
  );

  const DeleteButton = ({ data }) => (
    <button
      className={styles.Button}
      onClick={() => handleDelete(data)}
    >
      <img src={DeleteIcon} alt='Удалить' />
    </button>
  );

  return (
    <div className={styles.Container}>
      <TableContainer className={classes.container}>
        <MaterialUiTable aria-label='table'>
          {(canUse || (!isMobile && !canUse)) && (
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell style={{fontSize: 14, fontWeight: 400}}>
                    {column}
                  </TableCell>
                ))}
                <TableCell style={{width: 60}} />
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {canUse && rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1}>
                  {Object.entries(row.values).map(([type, value]) => (
                    <TableCell style={{fontSize: 16, fontWeight: 400}}>
                      {type === 'image'
                        ? (
                        <div style={{display: 'flex'}}>
                          <img src={value} className={styles.Img} />
                        </div>
                        )
                        : type === 'link'
                          ? <Link to={value}>{value}</Link>
                          : value
                      }
                    </TableCell>
                  ))}
                  <TableCell>
                    <div style={{display: 'flex'}}>
                      <EditButton data={row} />
                      <DeleteButton data={row} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MaterialUiTable>
      </TableContainer>
      {!canUse ? (
        <div className={styles.Alert}>
          <div className={styles.Alert__Circle}>
            <img src={basketIcon} />
          </div>
          <div className={styles.Alert__Info}>
            Список всех товаров, которые представлены в вашем магазине и доступны для заказа
          </div>
          <div className={styles.Alert__Level}>
            <span className={styles.Alert__Splash}>PRO</span>
            <span>Доступно на PRO-тарифе.&nbsp;</span>
            <Link to='tariffs' style={{color: '#6442EE'}}>К тарифам</Link>
          </div>
        </div>
      ) : !rows || rows.length === 0 && (
        <div className={styles.Alert}>
          <div className={styles.Alert__Circle}>
            <img src={basketIcon} />
          </div>
          <div className={styles.Alert__Info}>
            Список всех товаров, которые представлены в вашем магазине и доступны для заказа
          </div>
        </div>
      )}
    </div>
  )
}

export default Table;
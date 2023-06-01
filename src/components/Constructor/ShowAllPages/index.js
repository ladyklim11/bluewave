
// Libraries
import React from "react";

// Contexts
import {PhoneScreenDataContext} from "../../Editor";

// Assets
import checkedIcon from "../../../assets/service/checked.svg";
import editIcon from "../../../assets/actionsIcons/edit.svg";

// Styles
import styles from "../../Editor/style.module.scss";
import {API} from "../../../constants";
import {useSelector} from "react-redux";


const ShowAllPages = ({ actions, values }) => {
  const {
    userData: {
      token,
      user,
    },
  } = useSelector(store => store);
  const { setPhoneScreenData } = React.useContext(PhoneScreenDataContext);

  return (
    <div>
      {values.pages.map(page => (
        <div className={styles.ShowAllPages}>
          <div
            className={styles.ShowAllPages__Content}
            onClick={() => {
              actions.setActivePage(page);
              actions.setScreen(null);
            }}
          >
            <div className={styles.ShowAllPages__Title}>
              {page.name}
              {values.activePage.id === page.id && (
                <img src={checkedIcon} style={{marginLeft: 6, marginBottom: 2}} alt='Выбрано' />
              )}
            </div>
            <div className={styles.ShowAllPages__Url}>{page.link}</div>
          </div>
          <div
            className={styles.ShowAllPages__Edit}
            onClick={() => {
              setPhoneScreenData(prev => ({
                ...prev,
                isShow: true,
                setHide: data => {
                  setPhoneScreenData(() => ({ isShow: false }));
                  actions.setScreen(null);
                  const setChanges = () => actions.changePage({
                    ...page,
                    ...data
                  });

                  if (values.activePage.name !== data.name || values.activePage.link !== data.link) {
                    if (!user) {
                      setChanges();
                    } else {
                      fetch(`${API}/api/page/${page.id}`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` },
                      })
                        .then(res => res.json())
                        .then(res => {
                          actions.blockDoWrapper(
                            () => fetch(`${API}/api/page/${res.id}`, {
                              method: 'PUT',
                              headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                ...res,
                                ...data
                              })
                            })
                              .then(() => setChanges())
                          )
                        })
                    }
                  }
                  // handleChangeFormData({ link })
                },
                title: 'Отредактировать страницу',
                additionalFunctional: {
                  defaultType: 'editPage',
                  defaultValueForDefaultType: {
                    name: page.name,
                    link: page.link,
                  }
                }
              }));
              //
            }}
          >
            <img src={editIcon} alt='Редактировать' style={{fill: 'red'}} />
          </div>
        </div>
      ))}
    </div>
  )
};

export default ShowAllPages;
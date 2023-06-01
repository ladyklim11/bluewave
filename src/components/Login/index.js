
// Libraries
import React from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Form from './Form';

// Contexts
import {LoaderDataContext} from '../../App';

// Constants
import {API} from '../../constants';

// Assets
import closeIcon from '../../assets/service/closeIcon.svg';
import google from '../../assets/social_main/google.svg';
import instagram from '../../assets/buttonsIcons/instagram.svg';
import vk from '../../assets/buttonsIcons/vk.svg';

// Styles
import styles from './style.module.scss';


Modal.setAppElement(document.getElementById('root'));

const rules = {
  email: {
    required: true,
    minLength: 3,
  },
  password: {
    required: true,
    minLength: 8,
  },
  password_confirmation: {
    required: true,
    minLength: 8,
  },
};

const Login = ({
  loginData,
  setLoginData,
}) => {
  const [backendErrors, setBackendErrors] = React.useState([]);
  const {
    show,
    step: defaultStep,
    error
  } = loginData;

  const dispatch = useDispatch();
  const { setLoaderData } = React.useContext(LoaderDataContext);

  const errorsWrapper = (res, onSuccess) => {
    if (res?.code && res.code !== 200) {
      setBackendErrors(res.errors);
    } else {
      onSuccess();
    }
  }

  const signIn = async (data) => {
    await queryWrapper(
      () => fetch(`${API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(userData => {
          errorsWrapper(userData, () => {
            dispatch({ type: 'SIGN_IN', user: userData});
            userData.user && !userData.user.login_instagram ? setStep(STEPS.ConnectWithInstagram) : handleHide();
          })
        })
        .catch()
    );

    return true;
  };

  const signUp = async (data) => {
    await queryWrapper(
      () => fetch(`${API}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({ ...data, accept: true })
      })
        .then(res => res.json())
        .then(res => errorsWrapper(res, () => {
          dispatch({ type: 'SIGN_IN', user: res});
          handleHide();
        }))
        .catch()
    );
  };

  const handleHide = () => {
    setLoginData(() => ({ show: false, step: STEPS.SignIn }));
  };

  const STEPS = {
    SignIn: 'SignIn',
    SignUp: 'SignUp',
    PasswordRecovery: 'PasswordRecovery',
    PasswordRecoverySuccess: 'PasswordRecoverySuccess',
    PasswordChange: 'PasswordChange',
    ConnectWithInstagram: 'ConnectWithInstagram',
    ConnectWithInstagramFailed: 'ConnectWithInstagramFailed'
  }

  const FORMS = React.useMemo(() => ({
    [STEPS.SignIn]: {
      submitText: 'Войти',
      onSubmit: signIn,
      fields: [
        {
          id: 'email',
          title: 'Логин',
          placeholder: 'Введите логин',
          rules: rules.email
        },
        {
          id: 'password',
          title: 'Пароль',
          type: 'password',
          placeholder: 'Введите пароль',
          rules: rules.password,
          subAction: () => setStep(STEPS.SignUp)
        },
      ],
      backendErrors
    },
    [STEPS.SignUp]: {
      submitText: 'Зарегистрироваться',
      onSubmit: signUp,
      fields: [
        {
          id: 'email',
          title: 'Напишите ваш e-mail',
          placeholder: 'Введите e-mail',
          rules: rules.email,
        },
        {
          id: 'password',
          title: 'Придумайте пароль',
          type: 'password',
          placeholder: 'Введите пароль',
          rules: rules.password,
        },
        {
          id: 'password_confirmation',
          title: 'Повторите пароль',
          type: 'password',
          placeholder: 'Введите пароль повторно',
          rules: rules.password_confirmation,
        },
      ],
      backendErrors
    },
    [STEPS.PasswordRecovery]: {
      submitText: 'Восстановить пароль',
      onSubmit: signIn,
      fields: [
        {
          id: 'email',
          title: 'Напишите ваш e-mail',
          placeholder: 'Введите e-mail',
          rules: rules.email,
        },
      ],
      backendErrors
    },
    [STEPS.PasswordChange]: {
      submitText: 'Изменить пароль',
      onSubmit: signIn,
      fields: [
        {
          id: 'password',
          title: 'Новый пароль',
          type: 'password',
          placeholder: 'Введите новый пароль',
          rules: rules.password,
        },
        {
          id: 'password_confirmation',
          title: 'Повторите пароль',
          type: 'password',
          placeholder: 'Введите пароль еще раз',
          rules: rules.password_confirmation,
        },
      ],
      backendErrors
    }
  }), [backendErrors]);

  const [step, setStep] = React.useState(defaultStep || STEPS.SignIn);

  const {
    userData: {
      user,
    },
  } = useSelector(store => store);

  React.useEffect(() => {
    setBackendErrors([]);
  }, [step]);

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  React.useEffect(() => {
    if (defaultStep === STEPS.ConnectWithInstagram) {
      setStep(user ? defaultStep : STEPS.SignIn);
    } else {
      setStep(defaultStep || STEPS.SignIn);
    }
  }, [defaultStep]);

  const queryWrapper = async (query) => {
    setLoaderData({ loading: true });
    try {
      await query();
    } catch {
      console.log('u cant do it')
    }
    setLoaderData({ loading: false });
  };

  const SocialLinks = () => {
    const LINKS = [
      {
        id: 'vk',
        imgSrc: vk,
        url: `${API}/auth/vk/redirect`,
        disabled: true,
      },
      {
        id: 'google',
        imgSrc: google,
        url: `${API}/auth/google/redirect`,
        disabled: true,
      },
    ];

    return (
      <div className={styles.SocialLinks} style={{gridTemplateColumns: `repeat(${LINKS.length}, 1fr)`}}>
        {LINKS.map(link => (
          <button className={styles.SocialLink} key={link.id} href={link.url} disabled={link.disabled}>
            <img src={link.imgSrc} />
          </button>
        ))}
      </div>
    )
  };

  const Divider = () => (
    <div className={styles.Divider}>
      <div className={styles.Divider__Line} />
      <div className={styles.Divider__Text}>
        или
      </div>
      <div className={styles.Divider__Line} />
    </div>
  );

  const WrappedForms = () => <Form {...FORMS[step]} />

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleHide}
      className={styles.Modal}
      style={{overlay: { zIndex: 1002, overflow: 'auto' }}}
    >
      <div className={styles.Header}>
        <div className={styles.Logo}>BlueWave</div>
        <div className={styles.Close} onClick={handleHide}>
          <img src={closeIcon} />
        </div>
      </div>
      <div className={styles.Content}>
        {step === STEPS.SignIn && (
          <>
            <div className={styles.Title}>Вход в аккаунт</div>
            <SocialLinks />
            <Divider />
            <WrappedForms />
            <div className={styles.SubText}>
              <span>У вас ещё нет аккаунта? </span>
              <span className={styles.Action} onClick={() => setStep(STEPS.SignUp)}>
                Зарегистрироваться
              </span>
            </div>
          </>
        )}
        {step === STEPS.SignUp && (
          <>
            <div className={styles.Title}>Регистрация</div>
            <SocialLinks />
            <Divider />
            <WrappedForms />
            <div className={styles.SubText}>
              <span>У вас уже есть аккаунт? </span>
              <span className={styles.Action} onClick={() => setStep(STEPS.SignIn)}>
                Войти
              </span>
            </div>
          </>
        )}
        {step === STEPS.PasswordRecovery && (
          <>
            <div className={styles.Title}>
              Восстановить пароль
            </div>
            <WrappedForms />
            {/*
            <button onClick={() => setStep(STEPS[3])}>
              Отправить
            </button>
            */}
          </>
        )}
        {step === STEPS.PasswordRecoverySuccess && (
          <>
            <div className={styles.Title}>
              Ссылка для восстановления пароля отправлена
            </div>
            <div className={styles.Info}>
              Мы отправили вам ссылку для восстановления пароля на e-mail
            </div>
            <button>Перейти в почту</button>
          </>
        )}
        {step === STEPS.PasswordChange && (
          <>
            <div className={styles.Title}>
              Изменить пароль
            </div>
            <WrappedForms />
            <button>
              Сохранить пароль
            </button>
          </>
        )}
        {step === STEPS.ConnectWithInstagram && (
          <>
            <a
              href={`${API}/auth/instagram/redirect?user_id=${user?.id}`}
              className={styles.Button}
            >
              <img src={instagram} />
            </a>
            <div className={styles.SubText}>
              {user ? (
                <span
                  className={styles.Action}
                  onClick={() => {
                    dispatch({ type: 'EDITOR_LOGOUT' });
                    dispatch({ type: 'LOGOUT' });
                    setStep(STEPS.SignIn);
                  }}
                >
                  Выйти из аккаунта
                </span>
              ) : (
                <>
                  <span>Вернуться на </span>
                  <span className={styles.Action} onClick={() => setStep(STEPS.SignIn)}>
                    страницу входа
                  </span>
                </>
              )}
            </div>
          </>
        )}
        {step === STEPS.ConnectWithInstagramFailed && (
          <>
            <div className={styles.Title}>
              {error}
            </div>
            <div className={styles.Info}>
              Аккаунт уже используется, необходимо привязать свой аккаунт или восстановить доступ к профилю
            </div>
            <button onClick={() => setStep(STEPS.ConnectWithInstagram)}>
              Вернуться назад
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default Login;


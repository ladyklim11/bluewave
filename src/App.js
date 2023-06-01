
// Libraries
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// Service
import history from './history';

// Constants
import {API} from './constants';

// Pages
import Landing from './pages/Landing';
import Constructor from './pages/Constructor';
import Tariffs from './pages/Tariffs';
import Products from './pages/Products';
import Login from './components/Login';
import Site from './pages/Site';


export const LoaderDataContext = React.createContext();
export const LoginScreenDataContext = React.createContext();

const DEFAULT_LOADING_DATA = {
  loading: false,
};

const ROUTES = [
  {
    path: '/constructor',
    component: Constructor,
  },
  {
    path: '/tariffs',
    component: Tariffs,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '',
    component: Site
  }
]


const App = () => {
  const {
    userData: {
      token,
      user,
    },
  } = useSelector(store => store);
  const dispatch = useDispatch();
  const [loaderData, setLoaderData] = React.useState(DEFAULT_LOADING_DATA);
  const [loginData, setLoginData] = React.useState({
    show: false,
    step: 'SignIn',
    error: null
  });

  const providedLoading = React.useMemo(() => ({
    loaderData,
    setLoaderData
  }), [loaderData]);

  const providedLogin = React.useMemo(() => ({
    loginData,
    setLoginData
  }), [loginData]);

  React.useEffect(() => {
    const SOCIALS = {
      vk: 'vk',
      google: 'google',
    }
    const params = new URLSearchParams(history.location.search);
    const authWithSocial = params.get('social');

    if (authWithSocial) {
      if (authWithSocial === SOCIALS.instagram) {
        if (+params.get('social_auth') !== 1) {
          setLoginData({ show: true, step: 'ConnectWithInstagramFailed', error: params.get('message').replaceAll('"', '') })
        } else {
          token && fetch(`${API}/api/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(userData => dispatch({ type: 'SIGN_IN', user: { user: userData, token }}))
        }
      } else {
        const socialHash = params.get('social_hash');
        fetch(`${API}/api/login/social-hash`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hash: socialHash })
        })
          .then(res => res.json())
          .then(userData => dispatch({ type: 'SIGN_IN', user: userData }))
      }
    }
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const authWithSocial = params.get('social');

    if (user && !user.login_instagram && !authWithSocial) {
      setLoginData({ show: true, step: 'ConnectWithInstagram' })
    }
  }, [user]);

  return (
    <LoaderDataContext.Provider value={providedLoading}>
      <Login {...providedLogin} />
      <LoginScreenDataContext.Provider value={providedLogin}>
        <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/' component={Landing} />
            {ROUTES.map(route => <Route path={route.path} component={route.component} />)}
          </Switch>
        </BrowserRouter>
      </LoginScreenDataContext.Provider>
    </LoaderDataContext.Provider>
  );
}

export default App;

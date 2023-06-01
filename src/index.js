
// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

// Components
import App from './App';

// Styles
import './index.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const theme = createTheme({
  palette: {
    secondary: {
      main: '#452DA5',
    },
  },
});


// TODO: перенести в отдельный файл

export const signIn = loginData => ({
  type: 'SIGN_IN',
  loginData,
});

export const logout = () => ({
  type: 'LOGOUT',
});

// reducers.js
const userData = (state = {
  user: null,
  token: null
}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.user;
    case 'LOGOUT':
      return {
        user: null,
        token: null
      };
    default:
      return state;
  }
};

const editorPages = (state = [], action) => {
  switch (action.type) {
    case 'EDITOR_SET_PAGES':
      return [...action.pages]
    case 'EDITOR_ADD_PAGE':
      return [action.page, ...state];
    case 'EDITOR_REMOVE_PAGE':
      return [...state.filter(page => page.id !== action.page.id)];
    case 'EDITOR_CHANGE_PAGE':
      return [...state.map(page => page.id === action.page.id ? action.page : page)];
    case 'EDITOR_LOGOUT':
      return [];
    default:
      return state;
  }
};

const reducers = combineReducers({
  userData,
  editorPages
});

// store.js
const configureStore = (initialState) => {
  const store = createStore(
    reducers,
    localStorage.getItem('reduxState')
      ? JSON.parse(localStorage.getItem('reduxState'))
      : {}
    ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
};

const store = configureStore();

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import {getBrowserLocales} from './utils/locales'

// import i18n (needs to be bundled ;)) 
import './i18n';
import i18next from 'i18next';


//var lang = Navigator.language;
var lang = getBrowserLocales();
console.log("LENGUAJE NAVEGADOR DETECTADO:", lang)
/* if (store.getState().user._id!==""){
  if (store.getState().user.language!=="BROWSER"){
    console.log("USUARIO ENCONTRADO. IDIOMA", store.getState().user.language)
    lang = store.getState().user.language
  }
}  */

if(!i18next.isInitialized){
  i18next.init({
      lng:lang,
      fallbackLng: 'en-EN',
      debug: false,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      }
    }).then(()=>{
      
      
      root.render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    }).catch((error)=>{
      root.render(
        <React.StrictMode>
        <Provider store={store}>
          <p>ERROR DE LENGUAJE</p>
          {error.message}
        </Provider>
      </React.StrictMode>
      )
    })
  }else{
      if (i18next.language!==lang){
        i18next.changeLanguage(lang);
      }
  }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



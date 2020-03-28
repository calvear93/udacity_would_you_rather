import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';
import 'moment/locale/es-us';
import store from './store/store';
import 'semantic-ui-css/semantic.css';
import './styles/App.scss';
import App from './App';

/* Application rendering. */
ReactDOM.render(
    <BrowserRouter>
        <Provider store={ store }>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

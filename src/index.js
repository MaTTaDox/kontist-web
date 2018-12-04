import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import App from "./components/App/App";
import {store, history} from './core';

import './core/fontAwesome';

import './style/core.css'
import Login from "./components/App/Login";

window.store = store;

i18n.changeLanguage('de');

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route path='' component={App}/>
                    </Switch>
                </ConnectedRouter>
            </MuiThemeProvider>
        </Provider>
    </I18nextProvider>,
    document.getElementById('root')
);


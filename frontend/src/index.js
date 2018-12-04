import ChatPage from './components/chat/ChatPage'

require('./styles/main.scss');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'

import {isAuthenticated} from './components/common/login/utils'
import appRoutes from './utils/app-routes'

import App from './App'
import store from './store'
import LoginPage from './components/common/login/LoginPage'

/* eslint-disable no-undef */
global.__ROOT_CONTEXT__ = '/';
const contextRoot = __ROOT_CONTEXT__;

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
});

function checkAuthenticated(nextState, replace, callback) {
    if (!isAuthenticated()) replace(appRoutes.LOGIN);
    callback();
}

const router = (
    <Provider store={store}>
        <Router history={history} >
            <Route path={contextRoot} component={App}>
                <IndexRoute component={ChatPage} onEnter={checkAuthenticated}/>
                <Route path={appRoutes.LOGIN} component={LoginPage}/>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));

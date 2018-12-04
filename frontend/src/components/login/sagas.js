import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {clearAuthentication, authenticate, buildProfile, refresh} from './utils'
import {loginWithEmailAndPassword, loginWithRefreshToken} from '../../datasources/login/login-datasource'
import ActionTypes, {authError, authSuccess, refreshSuccess} from './actions'
import appRoutes from '../../utils/app-routes'
import { notify } from '../../utils/notification'
import {webSocketSubscribe, webSocketUnsubscribe} from '../websocket/utility-actions'

export default function *() {
    yield [
        takeEvery(ActionTypes.LOGIN_USERNAME_PASSWORD, handleStartLogin),
        takeEvery(ActionTypes.LOGIN_REFRESH_TOKEN, handleRefresh),
        takeEvery(ActionTypes.DROP_AUTHENTICATION, handleDropAuthentication),
        takeEvery(ActionTypes.LOGIN_SUCCESS, handleLoginSuccess),
        takeEvery(ActionTypes.LOGOUT, handleLogout)
    ]
}

function *handleDropAuthentication() {
    clearAuthentication()
}

function *handleStartLogin({form}) {
    const {access_token: accessToken, refresh_token: refreshToken} =  yield call(loginWithEmailAndPassword, form);

    if (accessToken) {
        authenticate(accessToken, refreshToken, buildProfile(form));
        yield put(authSuccess(accessToken))
    } else {

        const notification = notify(
            'Access denied',
            'Credentials isn\'t correct',
            { autoHide: true, level: 'error' }
        );

        yield notification.show;
        yield put(authError('Invalid credentials'));
    }
}

function *handleRefresh({token}) {
    try {
        const {access_token: accessToken, refresh_token: refreshToken} =  yield call(loginWithRefreshToken, token);

        if (accessToken) {
            refresh(accessToken, refreshToken);
            yield put(refreshSuccess());
        } else {

            const notification = notify(
                'Access denied',
                'Credentials isn\'t correct',
                { autoHide: true, level: 'error' }
            );

            yield notification.show;
            yield put(authError('Invalid credentials'));
        }
    } catch (e) {
        clearAuthentication();
        yield put(push(appRoutes.LOGIN))
    }
}

function *handleLoginSuccess({accessToken}) {
    yield put(webSocketSubscribe());
    yield put(push(appRoutes.ROOT))
}

function *handleLogout() {
    clearAuthentication();
    yield put(webSocketUnsubscribe());
    yield put(push(appRoutes.LOGIN))
}

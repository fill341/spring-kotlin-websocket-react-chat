import {call} from 'redux-saga/effects'
import {put} from 'redux-saga/effects'
import {take} from 'redux-saga/effects'
import {notify} from '../utils/notification'
import {List, Map} from 'immutable'
import fetch from 'isomorphic-fetch'
import {getRefreshToken, getToken} from '../components/login/utils'
import {refreshToken} from '../components/login/actions'
import Actions from '../components/login/actions'

const request = (method, url, body) => {

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };

    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers,
        credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } if (response.status === 401) {
            return {status: 401};
        } else {
            throw {
                status: response.status,
                message: response.statusText
            };
        }
    }).then((json) => json);
};

export function *list(method, url, body) {
    let result = {};
    try {
        let response = yield call(request, method, url, body);
        if (response.status && response.status === 401) {
            yield put(refreshToken(getRefreshToken()));
            yield take(Actions.REFRESH_SUCCESS);
            response = yield call(request, method, url, body);
        }
        result.data = List(response);
    } catch(error) {
        result.error = error;
    }

    return result;
}

export function *one(method, url, body) {
    let result = {};
    try {
        let response = yield call(request, method, url, body);

        if (response.status && response.status === 401) {
            yield put(refreshToken(getRefreshToken()));
            yield take(Actions.REFRESH_SUCCESS);

            response = yield call(request, method, url, body);
        }
        result.data = Map(response);
    } catch(error) {
        result.error = error;
    }
    return result;
}

export function *getOrDisplayError(fetchData, setData) {
    const { data } = yield call(fetchData);

    if (data) {
        yield put(setData(data))
    } else {
        const notification = notify(
            'Error',
            'Oh... Something went wrong... Please try that again.',
            { autoHide: true, level: 'error' }
        );

        yield notification.show;
    }
}



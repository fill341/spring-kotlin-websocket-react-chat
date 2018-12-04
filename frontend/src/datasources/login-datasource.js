import apiRoutes from '../utils/api-routes'
import {url} from '../utils/api-routes'
import base64 from 'base-64'

export function loginWithEmailAndPassword(form) {
    return fetch(url(`${apiRoutes.LOGIN}\?grant_type=password&client_id=app&username=${form.get('username')}&password=${form.get('password')}`), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode('app:secret')
        }
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Login or password was incorrect');
        }

        return response.json();
    }).catch(() => {
        return {}
    });
}

export function loginWithRefreshToken(refreshToken) {
    return fetch(url(`${apiRoutes.LOGIN}\?grant_type=refresh_token&refresh_token=${refreshToken}`), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode('app:secret')
        }
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Refresh token is incorrect');
        }

        return response.json();
    });
}
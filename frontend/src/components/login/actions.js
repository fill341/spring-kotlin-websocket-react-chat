
const Actions = {
    LOGIN_USERNAME_PASSWORD: 'auth.LOGIN_USERNAME_PASSWORD',
    LOGIN_REFRESH_TOKEN: 'auth.LOGIN_REFRESH_TOKEN',
    LOGIN_SUCCESS: 'auth.LOGIN_SUCCESS',
    REFRESH_SUCCESS: 'auth.REFRESH_SUCCESS',
    AUTH_ERROR: 'auth.AUTH_ERROR',
    DROP_AUTHENTICATION: 'auth.DROP_AUTHENTICATION',
    LOGOUT: 'auth.LOGOUT',
    SET_PROFILE: 'auth.SET_PROFILE'
};

export default Actions;

export function submitLogin(form) {
    return {
        type: Actions.LOGIN_USERNAME_PASSWORD,
        form
    }
}

export function refreshToken(token) {
    return {
        type: Actions.LOGIN_REFRESH_TOKEN,
        token
    }
}

export function dropAuthentication() {
    return {
        type: Actions.DROP_AUTHENTICATION
    };
}

export function authError(errorMessage) {
    return {
        type: Actions.AUTH_ERROR,
        error: errorMessage
    }
}

export function authSuccess(accessToken) {
    return {
        type: Actions.LOGIN_SUCCESS,
        accessToken
    }
}

export function refreshSuccess() {
    return {
        type: Actions.REFRESH_SUCCESS
    }
}

export function setProfile(profile) {
    return {
        type: Actions.SET_PROFILE,
        profile
    }
}

export function logout() {
    return {
        type: Actions.LOGOUT
    }
}

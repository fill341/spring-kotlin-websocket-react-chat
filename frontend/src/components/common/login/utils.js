const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const PROFILE = 'profile';

export function isAuthenticated() {
    const authToken = window.localStorage.getItem(ACCESS_TOKEN);
    return !!(authToken);
}

export function setAuthToken(authToken) {
    window.localStorage.setItem(ACCESS_TOKEN, authToken)
}

export function refresh(accessToken, refreshToken) {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function authenticate(accessToken, refreshToken, profile) {
    refresh(accessToken, refreshToken);
    window.localStorage.setItem(PROFILE, profile ? JSON.stringify(profile) : '{}');
}

export function clearAuthentication() {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.removeItem(PROFILE);
}

export function getToken() {
    return window.localStorage.getItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN)
}

export function getProfile() {
    return JSON.parse(window.localStorage.getItem(PROFILE));
}

export function decodePayload(token) {
    const payloadEncoded = token.split('.')[1];
    return JSON.parse(window.atob(payloadEncoded));
}

export function buildProfile(form) {
    return {
        'id': null,
        'name': form.get('username'),
        'firstName': form.get('username'),
        'lastName': null,
        'email': null,
        'profilePicURL': null
    }
}
export default {
    LOGIN: '/oauth/token',
    TEST: '/api/v1/test'
};

export function url(apiUrl) {
    if (process.env.BACKEND_BASE_URL) {
        return `${process.env.BACKEND_BASE_URL}${apiUrl}`;
    } else  {
        return apiUrl;
    }
}
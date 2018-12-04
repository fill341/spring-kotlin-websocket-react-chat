/* eslint-disable no-console */

export function debug(...msg) {
    if ('production' !== process.env.NODE_ENV) {
        console.log(...msg)
    }
}

export function error(...msg) {
    console.error(...msg)
}

import { put } from 'redux-saga/effects'
import Notifications from 'react-notification-system-redux'
import { debug, error } from './logger'

const defaultTimeout = 3;

export function notify(title, message, opts = {}) {
    const { autoHide = true, level = 'info' } = opts;
    opts = Object.assign({
        title,
        message,
        level,
        position: 'tr',
        autoDismiss: autoHide ? defaultTimeout : 0,
        dismissible: autoHide,
        uid: Date.now()
    }, opts);

    if (opts.level === 'error') {
        error(message);
    } else {
        debug(message);
    }

    return {
        get show() {
            return put(Notifications.show(opts));
        },

        get hide() {
            return put(Notifications.hide(opts.uid));
        }
    }
}

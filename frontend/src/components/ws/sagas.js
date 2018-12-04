import {call, put, take, takeEvery} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import SockJS from 'sockjs-client'
import webstomp from 'webstomp-client'
import {getToken} from '../common/login/utils'
import {ServerActions} from './server-actions'
import {error} from '../../utils/logger'
import {UtilityActions} from './utility-actions';
import {ClientActions} from './client-actions';

let endpoint = '/stomp';
let client;

if (process.env.BACKEND_BASE_URL) {
    endpoint = process.env.BACKEND_BASE_URL + endpoint;
}

function init() {
    if (!client) {
        return eventChannel((emitter) => {
            let socket = new SockJS(endpoint + '?access_token=' + getToken(), {
                    heartbeat: true
                }
            );

            client = webstomp.over(socket);
            client.hasDebug = false;

            client.connect({},  () => {
                client.subscribe('/ws/**', (message) => {
                    const event = JSON.parse(message.body);

                    if (event.type) {
                        let exist = false;
                        for (let i in ServerActions) {
                            if (ServerActions[i] === event.type) {
                                exist = true;
                                break;
                            }
                        }

                        if (exist) {
                            return emitter(event);
                        } else {
                            error(`Event ${event.type} isn't registered`);
                        }
                    }
                });
            });

            return () => {}
        })
    }
}

function *handleSubscribe() {
    const channel = yield call(init);
    if (channel) {
        while (true) {
            const action = yield take(channel);
            yield put(action);
        }
    }
}

function *handleUnsubscribe() {
    client.disconnect();
}

function *handleClientMessage({message}) {
    client.send('/ws/in/1', JSON.stringify(message), {})
}

export default function *sagas() {
    yield [
        takeEvery(UtilityActions.SUBSCRIBE, handleSubscribe),
        takeEvery(UtilityActions.UNSUBSCRIBE, handleUnsubscribe),
        takeEvery(ClientActions.CLIENT_MESSAGE, handleClientMessage)
    ]
}

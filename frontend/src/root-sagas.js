import login from './components/login/sagas'
import chat from './components/chat/sagas'
import sagas from './components/websocket/sagas'

export default function *rootSaga() {
    yield [
        login(),
        chat(),
        sagas()
        // add your saga here
    ];
}

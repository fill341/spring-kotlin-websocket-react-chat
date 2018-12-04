import login from './components/common/login/sagas'
import chat from './components/chat/sagas'
import sagas from './components/ws/sagas'

export default function *rootSaga() {
    yield [
        login(),
        chat(),
        sagas()
        // add your saga here
    ];
}

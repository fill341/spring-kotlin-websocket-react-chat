import { put, call } from 'redux-saga/effects'

export function *getOrDisplayError(fetchData, setData) {
    const {data} = yield call(fetchData);

    if (data) {
        yield put(setData(data))
    }
}

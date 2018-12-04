import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-sagas'

// import the root reducer
import rootReducer from './root-reducers'
import {Map} from 'immutable'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    Map(),
    compose(
        applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
);

sagaMiddleware.run(rootSaga);

if (module.hot) {
    module.hot.accept('./root-reducers', () => {
        const nextRootReducer = require('./root-reducers').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;

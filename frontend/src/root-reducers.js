import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as notifications } from 'react-notification-system-redux'

import login from './components/common/login/reducers'
import chat from './components/chat/reducers'

const initialState = fromJS({
    locationBeforeTransitions: null
});

function routerReducer(state = initialState, action) {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
}

const rootReducer = combineReducers({
    app: combineReducers({
        login,
        chat
        // add your reducer here
    }),
    notifications,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;

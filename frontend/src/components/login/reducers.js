import { Map } from 'immutable'
import Actions from './actions'

function handleSetProfile(state, {profile}) {
    return state.set('profile', profile);
}

export default function(state = Map(), action) {
    switch(action.type) {
        case Actions.SET_PROFILE:
            return handleSetProfile(state, action);
        default:
            return state;
    }
}

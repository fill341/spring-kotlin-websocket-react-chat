import { Map } from 'immutable'
import {ServerActions} from '../ws/server-actions'
import {List} from 'immutable'

function handleSetTest(state, {author, content}) {
    return state.updateIn(['messages'],  (messages = List()) => {
        return messages.push({author, content});
    });
}

export default function(state = Map(), action) {
    switch(action.type) {
        case ServerActions.NEW_MESSAGE:
            return handleSetTest(state, action);
        default:
            return state;
    }
}

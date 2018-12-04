export const UtilityActions  = {
    SUBSCRIBE: 'app.ws.SUBSCRIBE',
    UNSUBSCRIBE: 'app.ws.UNSUBSCRIBE'
};

export function webSocketSubscribe() {
    return {
        type: UtilityActions.SUBSCRIBE
    }
}

export function webSocketUnsubscribe() {
    return {
        type: UtilityActions.UNSUBSCRIBE
    }
}

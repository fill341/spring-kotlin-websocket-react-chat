export const ClientActions  = {
    CLIENT_MESSAGE: 'client.ws.SEND_MESSAGE'
};

export function sendMessage(message) {
    return {
        type: ClientActions.CLIENT_MESSAGE,
        message
    }
}

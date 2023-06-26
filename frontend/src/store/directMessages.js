export const RECEIVE_DIRECT_MESSAGES = '/directMessages/RECEIVE_DIRECT_MESSAGES';
export const RECEIVE_DIRECT_MESSAGE = '/directMessages/RECEIVE_DIRECT_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';

export const receiveDirectMessages = (directMessages) => ({
    type: RECEIVE_DIRECT_MESSAGES,
    directMessages
})

export const receiveDirectMessage = (directMessage) => ({
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
})

export const removeCurrentWorkspace = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getDirectMessages = (state) => {
    return state.directMessages ? Object.values(state.directMessages) : []
}

const directMessagesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_DIRECT_MESSAGES:
            return { ...state, ...action.directMessages }
        case RECEIVE_DIRECT_MESSAGE:
            return {};
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        default:
            return state;
    }
}

export default directMessagesReducer;





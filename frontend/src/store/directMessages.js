export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const RECEIVE_DIRECT_MESSAGE = '/directMessages/RECEIVE_DIRECT_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
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
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.directMessages }
        case RECEIVE_DIRECT_MESSAGE:
            return {};
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        default:
            return state;
    }
}

export default directMessagesReducer;





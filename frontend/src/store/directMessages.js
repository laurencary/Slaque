export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const RECEIVE_DIRECT_MESSAGE = '/directMessages/RECEIVE_DIRECT_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const MARK_DIRECT_MESSAGE_READ = '/directMessages/MARK_DIRECT_MESSAGE_READ';

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

export const markDirectMessageRead = (messageableId) => ({
    type: MARK_DIRECT_MESSAGE_READ,
    messageableId
})

export const getDirectMessages = (state) => {
    return state.directMessages ? Object.values(state.directMessages) : []
}

const directMessagesReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.directMessages }
        case RECEIVE_DIRECT_MESSAGE:
            return {};
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        case MARK_DIRECT_MESSAGE_READ:
            newState
            [action.messageableId].unreadMessageCount = 0
            return newState;
        default:
            return state;
    }
}

export default directMessagesReducer;





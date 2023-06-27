export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const MARK_CHANNEL_READ = '/channels/MARK_CHANNEL_READ';

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const removeChannels = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const markChannelRead = (messageableId) => ({
    type: MARK_CHANNEL_READ,
    messageableId
})

export const getChannels = (state) => {
    return state.channels ? Object.values(state.channels) : []
}

const channelsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.channels }
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        case MARK_CHANNEL_READ:
            newState[action.messageableId].unreadMessages = false
            return newState;
        default:
            return state;
    }
}

export default channelsReducer;
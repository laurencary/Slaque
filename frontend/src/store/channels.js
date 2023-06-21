export const RECEIVE_CHANNELS = '/channels/RECEIVE_CHANNELS';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE'

export const receiveChannels = (channels) => ({
    type: RECEIVE_CHANNELS,
    channels
})

export const removeChannels = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getChannels = (state) => {
    return state.channels ? Object.values(state.channels) : []
}

const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...state, ...action.channels }
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        default:
            return state;
    }
}

export default channelsReducer;
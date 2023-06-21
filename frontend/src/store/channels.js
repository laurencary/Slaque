export const RECEIVE_CHANNELS = '/channels/RECEIVE_CHANNELS';

export const receiveChannels = (channels) => ({
    type: RECEIVE_CHANNELS,
    channels
})

export const getChannels = (state) => {
    return state.channels ? Object.values(state.channels) : []
}

const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...state, ...action.channels }

        default:
            return state;
    }
}

export default channelsReducer;
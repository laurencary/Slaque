export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE'

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const removeChannels = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getChannels = (state) => {
    return state.channels ? Object.values(state.channels) : []
}

const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.channels }
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        default:
            return state;
    }
}

export default channelsReducer;
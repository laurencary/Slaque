import csrfFetch from "./csrf";

export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const RECEIVE_CHANNEL = '/RECEIVE_CHANNEL';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const MARK_CHANNEL_READ = '/channels/MARK_CHANNEL_READ';
export const REMOVE_CHANNEL = '/channels/REMOVE_CHANNEL';

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const removeChannels = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    channelId
})

export const receiveChannel = (channel) => ({
    type: RECEIVE_CHANNEL,
    channel
})

export const markChannelRead = (messageableId) => ({
    type: MARK_CHANNEL_READ,
    messageableId
})

export const getSubscribedChannels = (state) => {
    if (state.currentWorkspace.subscribedChannels) {
        const subChannels = state.currentWorkspace.subscribedChannels;
        return Object.values(state.channels).filter(channel => subChannels.includes(channel.id))
    } else {
        return [];
    }
}

export const getAllChannels = (state) => {
    return state.channels ? Object.values(state.channels) : []
}

export const createChannel = (channel) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channel)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveChannel(data.channel));
        return data.channel.id
    }
}

export const updateChannel = (channel) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channel)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveChannel(data.channel));
    }
}

export const deleteChannel = (channelId) => async(dispatch) =>{
    const res = csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })

    dispatch(removeChannel(channelId));
}

const channelsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.channels }
        case RECEIVE_CHANNEL:
            newState[action.channel.id] = action.channel
            return newState;
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        case REMOVE_CHANNEL:
            delete newState[action.channelId];
            return newState;
        case MARK_CHANNEL_READ:
            // debugger
            newState[action.messageableId].unreadMessages = false
            return newState;
        default:
            return state;
    }
}

export default channelsReducer;
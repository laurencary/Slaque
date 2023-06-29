import csrfFetch from "./csrf";

export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    channelId
})

export const createChannelSubscription = (channelId, workspaceUserId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channel_subscriptions/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ channelId, workspaceUserId })
    })

}

export const deleteChannelSubscription = (channelId, workspaceUserId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channel_subscriptions/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ channelId, workspaceUserId })
    })

    if (res.ok) {
        dispatch(removeChannel(channelId));
    }
}
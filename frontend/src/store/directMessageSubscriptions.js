import csrfFetch from "./csrf";
import { receiveDirectMessage } from "./directMessages";

export const createDirectMessageSubscription = (directMessageId, workspaceUserId) => async (dispatch) => {
    const res = await csrfFetch(`/api/direct_message_subscriptions/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ directMessageId, workspaceUserId })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveDirectMessage(data.directMessage))
    }
}
import csrfFetch from "./csrf";
import { createMessage } from "./messages";

export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const RECEIVE_DIRECT_MESSAGE = '/directMessages/RECEIVE_DIRECT_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const MARK_DIRECT_MESSAGE_READ = '/directMessages/MARK_DIRECT_MESSAGE_READ';
export const REMOVE_DIRECT_MESSAGE = '/directMessages/REMOVE_DIRECT_MESSAGE'

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const receiveDirectMessage = (directMessage) => ({
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
})

export const removeDirectMessage = (directMessageId) => ({
    type: REMOVE_DIRECT_MESSAGE,
    directMessageId
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

export const deleteDirectMessage = (directMessageId) => async (dispatch) => {
    const res = csrfFetch(`/api/direct_messages/${directMessageId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeDirectMessage(directMessageId));
    }
}

export const createDirectMessage = (workspaceUserIds, message, workspaceId) => async (dispatch) => {
    const res = await csrfFetch(`/api/direct_messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ workspaceUserIds, workspaceId })
    })

    if (res.ok) {
        const data = await res.json();
        const newMessage = {
            ...message,
            messageableId: data.directMessage.id
        }
        // debugger
        dispatch(createMessage(newMessage))
        dispatch(receiveDirectMessage(data.directMessage))
    }
}

const directMessagesReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...state, ...action.payload.directMessages }
        case RECEIVE_DIRECT_MESSAGE:
            newState[action.directMessage.id] = action.directMessage
            return newState;
        case REMOVE_DIRECT_MESSAGE:
            delete newState[action.directMessageId]
            // debugger
            return newState;
        case REMOVE_CURRENT_WORKSPACE:
            return {};
        case MARK_DIRECT_MESSAGE_READ:
            newState[action.messageableId].unreadMessageCount = 0
            return newState;
        default:
            return state;
    }
}

export default directMessagesReducer;





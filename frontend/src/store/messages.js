import { markChannelRead } from "./channels";
import { markDirectMessageRead } from "./directMessages";
import csrfFetch from "./csrf";

export const RECEIVE_MESSAGES = '/messagesReducer/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = '/messagesReducer/RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = '/messagesReducer/REMOVE_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const MARK_MESSAGE_READ = '/MARK_MESSAGE_READ';

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
})

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId
})

export const removeCurrentWorkspace = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getMessages = (state) => {
    return state.messages ? Object.values(state.messages) : []
}


export const fetchMessages = (messageableId, messageableType) => async (dispatch) => {
    const type = messageableType === "channel" ? "channel" : "direct_message"

    const res = await fetch(`/api/${type}s/${messageableId}`)

    if (res.ok) {
        const messages = await res.json();
        dispatch(receiveMessages(messages));
    }
}

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
}

export const updateMessage = (message) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
}

export const updateMessageUnreads = (message, messageableId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}/mark_read`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
    })
    // debugger
    message.messageableType === "channel" ? 
        dispatch(markChannelRead(messageableId)) : dispatch(markDirectMessageRead(messageableId))
}

export const deleteMessage = (messageId) => {
    const res = csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })
}

const messagesReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return { ...action.messages }
        case RECEIVE_MESSAGE:
            // newState[action.id] = action.message
            // return newState;
            const { message } = action;
            return { ...state, [message.id]: message };
        case REMOVE_MESSAGE: 
            delete newState[action.messageId];
            return newState;
        case REMOVE_CURRENT_WORKSPACE:
            return {}
        default:
            return state;
    }
}
export default messagesReducer;

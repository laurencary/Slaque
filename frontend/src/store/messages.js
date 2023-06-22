import csrfFetch from "./csrf";

export const RECEIVE_MESSAGES = '/messagesReducer/RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = '/messagesReducer/RECEIVE_MESSAGE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
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

    if (res.ok) {
        const message = await res.json();
        dispatch(receiveMessage(message));
    }
}

const messagesReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return { ...action.messages }
        case RECEIVE_MESSAGE:
            newState[action.message.id] = action.message
            return newState;
        case REMOVE_CURRENT_WORKSPACE:
            return {}
        default:
            return state;
    }
}
export default messagesReducer;

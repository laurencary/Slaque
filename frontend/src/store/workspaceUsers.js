import csrfFetch from "./csrf";

export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';
export const RECEIVE_WORKSPACE_USER = '/workspaceUsers/RECEIVE_WORKSPACE_USER'

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const removeCurrentWorkspace = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const receiveWorkspaceUser = (workspaceUser) => ({
    type: RECEIVE_WORKSPACE_USER,
    workspaceUser
})

export const getWorkspaceUsers = (state) => {
    return state.workspaceUsers ? Object.values(state.workspaceUsers) : []
}

export const updateWorkspaceUser = (workspaceUser) => async (dispatch) => {
    // debugger
    const res = await csrfFetch(`/api/workspace_user_subscriptions/${workspaceUser.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({workspaceUser})
    })

    if (res.ok) {
        const workspaceUser = await res.json()
        dispatch(receiveWorkspaceUser(workspaceUser))
    }
}

export const createWorkspaceUser = (workspaceUser) => async (dispatch) => {
    const res = await csrfFetch(`/api/workspace_user_subscriptions`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ workspaceUser })
    })

    if (res.ok) {
        const payload = await res.json();
        dispatch(receiveCurrentWorkspace(payload))
    }
}

const workspaceUsersReducer = (state = {}, action) => {
    const newState = {...state}

    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...action.payload.workspaceUsers }
        case RECEIVE_WORKSPACE_USER: 
            newState[action.workspaceUser.id] = action.workspaceUser;
            return newState;
        case REMOVE_CURRENT_WORKSPACE:
            return {}
        default:
            return state;
    }
}

export default workspaceUsersReducer;
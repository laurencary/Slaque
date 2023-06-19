export const RECEIVE_WORKSPACE_USERS = '/workspaceUsers/RECEIVE_WORKSPACE_USERS';

export const receiveWorkspaceUsers = (payload) => ({
    type: RECEIVE_WORKSPACE_USERS,
    payload
})

export const getWorkspaceUsers = (state) => {
    return state.workspaceUsers ? Object.values(state.workspaceUsers) : []
}

export const fetchUserWorkspaces = (workspaceId) => async (dispatch) => {
    const res = await fetch(`/api/workspaces/${workspaceId}`)

    if (res.ok) {
        const payload = await res.json();
        dispatch(receiveWorkspaceUsers(payload));
    }
}

const workspaceUsersReducer = (state = {}, action) => {
    const newState = {...state}

    switch (action.type) {
        case RECEIVE_WORKSPACE_USERS:
            return { ...action.payload.workspaceUsers }

        default:
            return state;
    }
}

export default workspaceUsersReducer;
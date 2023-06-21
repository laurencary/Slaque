import { receiveChannels } from "./channels";
import { receiveCurrentWorkspace } from "./currentWorkspace";

export const RECEIVE_WORKSPACE_USERS = '/workspaceUsers/RECEIVE_WORKSPACE_USERS';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';

export const receiveWorkspaceUsers = (workspaceUsers) => ({
    type: RECEIVE_WORKSPACE_USERS,
    workspaceUsers
})

export const removeCurrentWorkspace = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getWorkspaceUsers = (state) => {
    return state.workspaceUsers ? Object.values(state.workspaceUsers) : []
}

export const fetchWorkspaceUsers = (workspaceId) => async (dispatch) => {
    const res = await fetch(`/api/workspaces/${workspaceId}`)

    if (res.ok) {
        const payload = await res.json();
        dispatch(receiveWorkspaceUsers(payload.workspaceUsers));
        dispatch(receiveCurrentWorkspace(payload.currentWorkspace));
        dispatch(receiveChannels(payload.channels));
    }
}

const workspaceUsersReducer = (state = {}, action) => {
    const newState = {...state}

    switch (action.type) {
        case RECEIVE_WORKSPACE_USERS:
            return { ...action.workspaceUsers }
        case REMOVE_CURRENT_WORKSPACE:
            return {}
        default:
            return state;
    }
}

export default workspaceUsersReducer;
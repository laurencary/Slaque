export const RECEIVE_CURRENT_WORKSPACE = '/RECEIVE_CURRENT_WORKSPACE';
export const REMOVE_CURRENT_WORKSPACE = '/REMOVE_CURRENT_WORKSPACE';

export const receiveCurrentWorkspace = (payload) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    payload
})

export const removeCurrentWorkspace = () => ({
    type: REMOVE_CURRENT_WORKSPACE
})

export const getWorkspaceUsers = (state) => {
    return state.workspaceUsers ? Object.values(state.workspaceUsers) : []
}

const workspaceUsersReducer = (state = {}, action) => {
    const newState = {...state}

    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return { ...action.payload.workspaceUsers }
        case REMOVE_CURRENT_WORKSPACE:
            return {}
        default:
            return state;
    }
}

export default workspaceUsersReducer;
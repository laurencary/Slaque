export const RECEIVE_CURRENT_WORKSPACE = '/currentWorkspace/RECEIVE_CURRENT_WORKSPACE';

export const receiveCurrentWorkspace = (currentWorkspace) => ({
    type: RECEIVE_CURRENT_WORKSPACE,
    currentWorkspace
})

export const getCurrentWorkspaceProfile = state => {
    return state.currentWorkspace.workspaceSubscriptionId ? state.workspaceUsers[state.currentWorkspace.workspaceSubscriptionId] : null
}

const currentWorkspaceReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_WORKSPACE:
            return {...state, ...action.currentWorkspace}
    
        default:
            return state;
    }
}

export default currentWorkspaceReducer;
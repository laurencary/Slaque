export const RECEIVE_OTHER_WORKSPACES = 'RECEIVE_OTHER_WORKSPACES';

export const receiveOtherWorkspaces = (otherWorkspaces) => ({
    type: RECEIVE_OTHER_WORKSPACES,
    otherWorkspaces
})

export const getOtherWorkspaces = (state) => {
    return state.otherWorkspaces ? Object.values(state.otherWorkspaces) : []

}

const otherWorkspacesReducer = (state = {}, action) => {
    // const newState = { ...state };

    switch (action.type) {
        case RECEIVE_OTHER_WORKSPACES:
            return { ...action.otherWorkspaces }

        default:
            return state;
    }
}

export default otherWorkspacesReducer;
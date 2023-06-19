import csrfFetch from "./csrf";

export const RECEIVE_USER_WORKSPACES = 'workspaceUserSubscriptions/RECEIVE_USER_WORKSPACES';

export const receiveUserWorkspaces = (userWorkspaces) => ({
    type: RECEIVE_USER_WORKSPACES,
    userWorkspaces
})

export const getUserWorkspaces = (state) => {
    console.log(state);
    return state.userWorkspaces ? Object.values(state.userWorkspaces) : []
}

export const fetchUserWorkspaces = () => async (dispatch) => {
    const res = await fetch(`/api/workspace_user_subscriptions`)

    if (res.ok) {
        const userWorkspaces = await res.json();
        dispatch(receiveUserWorkspaces(userWorkspaces));
    }
}

const userWorkspacesReducer = (state = {}, action) => {
    const newState = {...state};

    switch (action.type) {
        case RECEIVE_USER_WORKSPACES:
            return {...action.userWorkspaces}
    
        default:
            return state;
    }
}

export default userWorkspacesReducer;
export const RECEIVE_USER_WORKSPACES = 'RECEIVE_USER_WORKSPACES';

export const receiveUserWorkspaces = (userWorkspaces) => ({
    type: RECEIVE_USER_WORKSPACES,
    userWorkspaces
})

export const getUserWorkspaces = (state) => {
    return state.userWorkspaces ? Object.values(state.userWorkspaces) : []
}
// called in session!!!!
// export const fetchUserWorkspaces = () => async (dispatch) => {
//     debugger
//     const res = await fetch(`/api/workspace_user_subscriptions`)

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveUserWorkspaces(data.userWorkspaces));
//         dispatch(receiveOtherWorkspaces(data.otherWorkspaces))
//     }
// }

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
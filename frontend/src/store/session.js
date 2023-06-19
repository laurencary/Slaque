import csrfFetch from "./csrf";
import { receiveUserWorkspaces } from "./workspaceUserSubscriptions";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
    return {
    type: SET_CURRENT_USER,
    payload: user
    }
}

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
})

export const fetchUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    dispatch(receiveUserWorkspaces(data.userWorkspaces));
    return response;
}

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    storeCSRFToken(response);

    const data = await response.json();
    console.log(data.user);
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(receiveUserWorkspaces(data.userWorkspaces));
    return response;
}

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        sessionStorage.removeItem("currentUser")
    }
}

const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const signup = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(receiveUserWorkspaces(data.userWorkspaces));

    return response;
}

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(receiveUserWorkspaces(data.userWorkspaces));
    return response;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
}



const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser")) || null
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            // debugger
            return { ...state, user: action.payload };
        case REMOVE_CURRENT_USER:
            const newState = {...state}
            newState.user = null
            return newState
        default:
            return state;
    }
};

export default sessionReducer;
import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/setCurrentUser';

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
})

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
})

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    storeCSRFToken(response);

    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
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
    storeCurrentUser(user);
    dispatch(setCurrentUser(data.user));
    return response;
}

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });

//     dispatch(removeCurrentUser());
// }



const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.payload };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };    
        default:
            return state;
    }
};

export default sessionReducer;
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
    dispatch(setCurrentUser(data.user));
    return response;
}

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });

//     dispatch(removeCurrentUser());
// }


const initialState = { user: null }

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
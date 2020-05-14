import {
    SIGN_IN,
    SIGN_OUT,
    ERROR,
    SET_VIEW_STATE,
    GET_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_SCHOOLS,
    CREATE_SCHOOL,
    UPDATE_SCHOOL,
    DELETE_SCHOOL
} from "./types";
import homework from "../api/homework";
import history from "../history";

const createRequest = (fn, dispatch) => {
    dispatch({
        type: SET_VIEW_STATE,
        payload: 'loading'
    });
    try {
        fn();
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: err.response.data.message
        });
    }
    dispatch({
        type: SET_VIEW_STATE,
        payload: 'ready'
    });
};

export const signIn = (username, password) => async dispatch => {
    await createRequest(async () => {
        const res = await homework.post(
            '/users/signin', {
                username: username,
                password
            }
        );
        dispatch({
            type: SIGN_IN,
            payload: res.data
        });
        history.push('/dashboard');
    }, dispatch);
};

export const signOut = () => ({
    type: SIGN_OUT
});

export const getUsers = () => async dispatch => {
    await createRequest(async () => {
        const res = await homework.get('/users');
        dispatch({
            type: GET_USERS,
            payload: res.data.data.docs
        });
    }, dispatch)
};

export const createUser = (user) => async (dispatch, getState) => {
    await createRequest(async () => {
        const res = await homework.post('/users', {...user}, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: CREATE_USER,
            payload: res.data.data.doc
        });
        history.push('/dashboard');
    }, dispatch)
};

export const updateUser = (user, id) => async (dispatch, getState) => {
    await createRequest(async () => {
        const res = await homework.patch(`/users/${id}`, {...user}, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: UPDATE_USER,
            payload: res.data.data.doc
        });
        history.push('/dashboard');
    }, dispatch);
};

export const deleteUser = id => async (dispatch, getState) => {
    await createRequest(async () => {
        await homework.delete(`/users/${id}`, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: DELETE_USER,
            payload: id
        });
        history.push('/dashboard');
    }, dispatch);
};

export const getSchools = () => async dispatch => {
    await createRequest(async () => {
        const res = await homework.get('/schools');
        dispatch({
            type: GET_SCHOOLS,
            payload: res.data.data.docs
        });
    }, dispatch)
};

export const createSchool = school => async (dispatch, getState) => {
    await createRequest(async () => {
        const res = await homework.post('/schools', {...school}, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: CREATE_SCHOOL,
            payload: res.data.data.doc
        });
        history.push('/dashboard');
    }, dispatch)
};

export const updateSchool = (school, id) => async (dispatch, getState) => {
    await createRequest(async () => {
        const res = await homework.patch(`/schools/${id}`, {...school}, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: UPDATE_SCHOOL,
            payload: res.data.data.doc
        });
        history.push('/dashboard');
    }, dispatch);
};

export const deleteSchool = id => async (dispatch, getState) => {
    await createRequest(async () => {
        await homework.delete(`/schools/${id}`, {
            headers: {Authorization: getState().auth.token}
        });
        dispatch({
            type: DELETE_SCHOOL,
            payload: id
        });
        history.push('/dashboard');
    }, dispatch);
};
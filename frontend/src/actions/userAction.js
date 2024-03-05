import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
} from "../constants/userConstant";

import axios from "axios";


// Login

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })



    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Register

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error,
        })
    }
}


// Load User

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })



    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Logout User

export const logOut = () => async (dispatch) => {
    try {


        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS })



    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error,
        })
    }
};




// Update Profile

export const updateProfile = (userDate) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userDate, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.error
        });
    }

}

// Update Password

export const updatePassword = (password) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/update`, password, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.error
        });
    }

}

// Forgot Password

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })



    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error,
        })
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};


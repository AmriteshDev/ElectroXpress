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
    LOGOUT_FAIL
} from "../constants/userConstant";



export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGIN_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
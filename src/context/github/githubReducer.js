import {
    SET_LOADING,
    SEARCH,
    CLEAR_USER_ARR,
    SET_SINGLE_USER,
    GET_USER_REPOS,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                userArr: action.payload,
                loading: false,
            };
        case SET_SINGLE_USER:
            return {
                ...state,
                singleUser:action.payload,
                loading:false
            };
        case CLEAR_USER_ARR:
            return {
                ...state,
                userArr: [],
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_REPOS:
            return {
            ...state,
                repos: action.payload,
                loading: false,
        }
        default:
            return state;
    }
};

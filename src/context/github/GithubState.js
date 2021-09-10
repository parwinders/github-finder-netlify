import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    SET_LOADING,
    SEARCH,
    CLEAR_USER_ARR,
    SET_SINGLE_USER,
    GET_USER_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
    const initialState = {
        loading: false,
        singleUser: {},
        userArr: [],
        alert: null,
        singleUser: {},
        repos: [],
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search Users
    const searchFn = async (e) => {
        console.log("App Search got :", e);
        setLoading();
        let data = await axios.get(
            `https://api.github.com/search/users?q=${e}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({
            type: SEARCH,
            payload: data.data.items,
        });
    };

    //Get User
    const getUser = async (e) => {
        console.log("userSearch got:", e);
        setLoading();
        let data = await axios.get(
            `https://api.github.com/users/${e}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        //setLoading(false);
        //setSingleUser(data.data);
        dispatch({
            type: SET_SINGLE_USER,
            payload: data.data,
        });
    };

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    //Clear user_Arr /Search Result
    const clearResult = () =>
        dispatch({
            type: CLEAR_USER_ARR,
        });

    //Get User Repos
    const getUserRepos = async (e) => {
        console.log("userSearch got:", e);
        setLoading(true);
        let data = await axios.get(
            `https://api.github.com/users/${e}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({
            type: GET_USER_REPOS,
            payload: data.data,
        });
    };

    return (
        <GithubContext.Provider
            value={{
                singleUser: state.singleUser,
                userArr: state.userArr,
                repos: state.repos,
                loading: state.loading,
                searchFn,
                setLoading,
                clearResult,
                getUser,
                getUserRepos,
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};
export default GithubState;

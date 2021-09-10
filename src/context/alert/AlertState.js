import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT } from "../types";

const AlertState = (props) => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Set Alert
    const alertFn = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: ({ msg: msg, type: type }),
        });
        //setAlert({ msg: msg, type: type });
        setTimeout(() => dispatch({ type: SET_ALERT, payload: null }), 2000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                alertFn,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;

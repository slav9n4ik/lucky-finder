import {REQUEST_INIT_FAIL, REQUEST_INIT_SUCCESS, REQUEST_PROFILES_SUCCESS, REQUESTING_INIT} from "./actionTypes";
import {REQUEST_PROFILES_FAIL} from "./actionTypes";
import {REQUESTING_PROFILES} from "./actionTypes";

export const setCurrentProfilesAction = args => {
    return {
        type: REQUESTING_PROFILES,
        payload: args
    };
};

export const setCurrentProfilesSuccess = args => {
    return {
        type: REQUEST_PROFILES_SUCCESS,
        payload: args
    };
};

export const setCurrentProfilesFail = () => {
    return {type: REQUEST_PROFILES_FAIL};
};

export const fetchInitAction = args => {
    return {
        type: REQUESTING_INIT,
        payload: args
    };
};

export const fetchInitSuccess = args => {
    return {
        type: REQUEST_INIT_SUCCESS,
        payload: args
    };
};

export const fetchInitFail = () => {
    return {type: REQUEST_INIT_FAIL};
};



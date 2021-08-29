import React from "react";
import {REQUEST_PROFILES_SUCCESS, REQUEST_PROFILES_FAIL, REQUESTING_PROFILES} from "../actions/actionTypes";

const initialState = {
    data: {},
    request: {},
    loading: true,
    error: false,
};

export const currentProfiles = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTING_PROFILES:
            return {
                ...state,
                request: action.payload,
                loading: true,
                error: false,
            };
        case REQUEST_PROFILES_SUCCESS:
            return {
                data: action.payload,
                request: {},
                loading: false,
                error: false,
            };
        case REQUEST_PROFILES_FAIL:
            return {
                data: {},
                request: {},
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
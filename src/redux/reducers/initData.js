import React from "react";
import {
    REQUESTING_INIT, REQUEST_INIT_SUCCESS, REQUEST_INIT_FAIL
} from "../actions/actionTypes";

const initialState = {
    data: {},
    request: {},
    loading: true,
    error: false,
};

export const initData = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTING_INIT:
            return {
                ...state,
                request: action.payload,
                loading: true,
                error: false,
            };
        case REQUEST_INIT_SUCCESS:
            return {
                data: action.payload,
                request: {},
                loading: false,
                error: false,
            };
        case REQUEST_INIT_FAIL:
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
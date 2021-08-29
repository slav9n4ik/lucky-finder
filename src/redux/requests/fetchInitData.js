import axios from "axios";
import {fetchInitAction, fetchInitFail, fetchInitSuccess} from "../actions";

function fetchInitData(dispatch, request) {
    dispatch(fetchInitAction(request))
    axios.put(`../initSearchData`, request)
        .then(response => {
            dispatch(fetchInitSuccess(response.data))
        })
        .catch(error => {
            dispatch(fetchInitFail())
        });
}

export {fetchInitData}
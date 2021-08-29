import axios from "axios";
import {setCurrentProfilesAction, setCurrentProfilesFail, setCurrentProfilesSuccess} from "../actions";

function fetchCurrentProfiles(dispatch, request) {
    dispatch(setCurrentProfilesAction(request))
    axios.put(`../searchProfiles`, request)
        .then(response => {
            dispatch(setCurrentProfilesSuccess(response.data))
        })
        .catch(error => {
            dispatch(setCurrentProfilesFail())
        });
}

export {fetchCurrentProfiles}
import {combineReducers} from 'redux';
import {currentProfiles} from "./currentProfiles";
import {initData} from "./initData";

const allReducers = combineReducers({
    currentProfiles: currentProfiles,
    initData: initData
})

export default allReducers;
import authReducer from "./auth";

const { combineReducers } = require("redux");
const { default: profileReducer } = require("./profile");

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
})

export default rootReducer;
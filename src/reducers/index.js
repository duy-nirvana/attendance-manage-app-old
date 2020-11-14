const { combineReducers } = require("redux");
const { default: profileReducer } = require("./profile");

const rootReducer = combineReducers({
    profile: profileReducer,
})

export default rootReducer;
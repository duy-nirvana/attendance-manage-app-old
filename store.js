const { createStore } = require("redux");
const { default: rootReducer } = require("./src/reducers");

const store = createStore(rootReducer);

export default store;
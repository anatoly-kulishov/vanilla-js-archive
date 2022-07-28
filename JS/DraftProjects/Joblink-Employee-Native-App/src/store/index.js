import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/rootReducer";

const middleware = [thunk];

export default createStore(
    rootReducer,
    applyMiddleware(...middleware)
)
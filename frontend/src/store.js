import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducer = combineReducers({
    //contains reducers
})

const initialState = {};

const middleware = [thunk];
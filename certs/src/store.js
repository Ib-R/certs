import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import combinedReducers from "./reducers";

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combinedReducers,
    initialState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

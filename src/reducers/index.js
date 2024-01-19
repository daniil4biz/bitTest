import { combineReducers, legacy_createStore } from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer
});

export const store = legacy_createStore(rootReducer);
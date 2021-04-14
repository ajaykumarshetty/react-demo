import { createStore, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk"
import reducer from "./reducer";


const store = createStore(reducer, applyMiddleware(ThunkMiddleware));

export default store
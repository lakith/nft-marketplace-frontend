import { combineReducers } from 'redux';
import {IAuthenticationState, loginReducer} from "./login";

export interface StoreState {
    login: IAuthenticationState
}

const RootReducer = combineReducers<StoreState>({
    login: loginReducer
});

export default RootReducer;
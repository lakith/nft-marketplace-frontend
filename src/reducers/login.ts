import {ILogin, LoginUserFailAction, LoginUserSuccessAction, LogoutUserAction} from "../actions/login";
import {ActionTypes} from "../actions/types";

export type Actions = LoginUserSuccessAction | LogoutUserAction | LoginUserFailAction

export interface IAuthenticationState {
    user: ILogin | null,
    loading: boolean,
    error: string | null
}

const initialState: IAuthenticationState = {
    user : null,
    loading: false,
    error: null
}

export const loginReducer = (state: IAuthenticationState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.loginUserSuccess:
            return {
                loading: false,
                error: null,
                user: action.payload
            }
        case ActionTypes.loginUserFail:
            return {
            loading: false,
            error: action.payload,
            user: null
        }
        case ActionTypes.logoutUser:
            return {
                loading: false,
                error: null,
                user: null
            }
        default:
            return state
    }
}
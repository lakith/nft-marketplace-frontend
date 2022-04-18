import axios from 'axios';
import {Dispatch} from 'redux'
import { ActionTypes } from './types';

enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface IUser {
    role: UserRole,
    name: string,
    email: string,
    id: string
}

export interface ILogin {
    user: IUser | null;
    token: string | null;
    expires: string | null;
}

export interface IResponse {
    data: ILogin
    message: string
}

export interface LoginUserSuccessAction {
    type: ActionTypes.loginUserSuccess
    payload: ILogin
}

export interface LoginUserFailAction {
    type: ActionTypes.loginUserFail
    payload: null
}


export interface LogoutUserAction {
    type: ActionTypes.logoutUser
    payload: null
}

export const loginUser = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try{
            const response = await axios.post<IResponse>(`http://localhost:3500/api/user/login`, {
                password:password,
                email: email
            })
            console.log("login response", response.data)
            dispatch<LoginUserSuccessAction>({
                type: ActionTypes.loginUserSuccess,
                payload: response.data.data
            })
        } catch (e) {
            dispatch<LoginUserFailAction>({
                type: ActionTypes.loginUserFail,
                payload: null
            })
        }
    }
}

export const logoutUser = () => {
    return {
        type: ActionTypes.logoutUser,
        payload: null
    }
}
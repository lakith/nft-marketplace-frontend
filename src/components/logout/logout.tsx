import React from "react";
import { useDispatch } from 'react-redux';
import {bindActionCreators} from "redux";
import {loginActionCreators} from "../../actions/index";

export default function Logout () {
    const dispatch = useDispatch();
    const { logoutUser } = bindActionCreators(loginActionCreators, dispatch);
    logoutUser()

    return (<div> Logout User....</div>)
}
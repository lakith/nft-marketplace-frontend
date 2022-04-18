import React from 'react';
import {Routes} from 'react-router';
import CommonRoutes from "./components/routes/commonRoutes";
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loginActionCreators} from "./actions/index";
import {RootStore} from './store'
import {Route} from "react-router-dom";
import {NFT} from "./constants/constants";
import NewArt from "./components/new-art/new-art";
// import Logout from "./components/logout/logout";

function App() {

    const dispatch = useDispatch();
    const { loginUser } = bindActionCreators(loginActionCreators, dispatch);
    const loginDatanew = useSelector((state: RootStore) => state.login);

    return (
        <React.Fragment>
            <Routes>
                {CommonRoutes}
                {/*{(loginDatanew && loginDatanew.user && loginDatanew.user.user && loginDatanew.user.token) ? (*/}
                {/*    <Route*/}
                {/*        key={'f02cb4ca-be75-11ec-9d64-0242ac120002'}*/}
                {/*        path={`/${NFT}/logout`}*/}
                {/*        element={<Logout/>}*/}
                {/*    />*/}
                {/*) : null}*/}
            </Routes>
        </React.Fragment>
    );
}

export default App;

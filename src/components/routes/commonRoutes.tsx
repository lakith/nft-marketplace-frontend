import React from 'react';
import {Route} from 'react-router-dom';
import {NFT} from '../../constants/constants';
import Login from "../login/login";
import NewCollection from "../new-collection/new-collection";
import NewArt from "../new-art/new-art";
import HomePage from "../home/home-page";
import CollectionPage from "../collection-page/collection-page";
import ListedCollection from "../listed-collection/listed-collection";

const CommonRoutes = [
    <Route
        key={'c53c0e09-20a7-400a-9118-697cbc739360'}
        path={`/`}
        element={<Login/>}
    />,
    <Route
        key={'c53c0e09-20a7-400a-9118-697cbc739360'}
        path={`/${NFT}/login`}
        element={<Login/>}
    />,
    <Route
        key={'b8ba4593b7-dcf7-436-485c8-3d01aa54a74539'}
        path={`/${NFT}/home-page`}
        element={<HomePage/>}
    />,
    <Route
        key={'b8b6565a4593b7-dcf7-436-485c658-3d01aa54a74539'}
        path={`/${NFT}/collection-page/:collectionId`}
        element={<CollectionPage/>}
    />,
    <Route
        key={'b8b656655a4593b7-dcf7-436-485c658-38787d01aa54a74539'}
        path={`/${NFT}/listed-collection`}
        element={<ListedCollection/>}
    />,
    <Route
        key={'2eb01a78-0c34-4424-a740-bc773cb26889'}
        path={`/${NFT}/new-collection`}
        element={<NewCollection/>}
    />,
    <Route
        key={'0e0b8522-4363-4728-9fa2-05c1c0dedd0d'}
        path={`/${NFT}/new-art/:collectionId`}
        element={<NewArt/>}
    />,
];

export default CommonRoutes;

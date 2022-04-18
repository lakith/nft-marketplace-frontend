import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import rootReducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'nft-key',
    storage,
    whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store);

export type RootStore = ReturnType<typeof rootReducers>
export default store;
export { persistor };

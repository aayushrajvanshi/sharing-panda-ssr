import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
const thunk = require('redux-thunk').default;
import { createLogger } from 'redux-logger';
const logger = createLogger();

import reducer from '../reducers/';

export const configure = () => {
    const store = createStore(reducer, compose(
        applyMiddleware(thunk),
        //autoRehydrate(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    //persistStore();
    return store;
};
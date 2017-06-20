/**
 * redux 中间件的使用
 *
 * @author wujohns
 * @date 17/6/20
 */
'use strict';

const redux = require('redux'),
    applyMiddleware = redux.applyMiddleware,
    createStore = redux.createStore;
const createLogger = require('redux-logger').createLogger;
const logger = createLogger();

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(
    reducer,
    applyMiddleware(logger)
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
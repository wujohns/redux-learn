/**
 * redux 自制中间件
 *
 * @author wujohns
 * @date 17/6/21
 */
'use strict';

const redux = require('redux'),
    applyMiddleware = redux.applyMiddleware,
    createStore = redux.createStore;

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

/**
 * @params {Object} middlewaveAPI - redux 的 applyMiddleware 机制传递的参数
 * @params {Function} middlewareAPI.dispatch - store.dispatch 的引用
 * @params {Function} middlewareAPI.getState - store.getState 的引用
 */
const cusLogger = ({ dispatch, getState }) => next => action => {
    console.log('\n------ custom logger ----------');
    console.log(`action type: ${ action.type }`);
    console.log(`before: ${ getState() }`);
    next(action);
    console.log(`after: ${ getState() }`);
};

const store = createStore(
    reducer,
    applyMiddleware(cusLogger)
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
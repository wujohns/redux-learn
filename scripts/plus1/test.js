/**
 * 对自制简易版 redux 的使用测试
 *
 * @author wujohns
 * @date 17/6/23
 */
'use strict';

const redux = require('./redux');

const addReducer = (state = 1, action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        default:
            return state;
    }
};

const textReducer = (state = '', action) => {
    switch (action.type) {
        case 'HELLO':
            return 'hello world!!!';
        case 'CLEAR':
            return '';
        default:
            return state;
    }
};

const reducer = redux.combineReducers({
    add: addReducer,
    text: textReducer
});
const store = redux.createStore(reducer);

const unsubscribe = store.subscribe(() => {
    console.log('\n----- state change -------');
    console.log(store.getState());
});

store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'HELLO' });
store.dispatch({ type: 'ADD' });
unsubscribe();
store.dispatch({ type: 'ADD' });
/**
 * redux 基础使用（典型的 订阅/发布 模式）
 *
 * @author wujohns
 * @date 17/6/19
 */
'use strict';

const redux = require('redux');

/**
 * action 与 state 的对应处理
 * action 格式为:
 * {
 *     type {String} action的类型
 *     palyload {AnyType} 该 action 传递的参数
 * }
 */
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

const store = redux.createStore(reducer);
console.log(store.getState());

// 当 store 中有改变时就会调用 store.subscribe 中的函数
const unsubscribe = store.subscribe(() => {
    console.log('------- state change -------');
});

// 通过 store 的进行事件发布
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState());

// 取消订阅
unsubscribe();
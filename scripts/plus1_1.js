/**
 * 自制简易版 redux
 *
 * @author wujohns
 * @date 17/6/22
 */
'use strict';

/**
 * store 创建方法
 * @param {Function} reducer - reducer
 * @param {Object} enhancer - applyMiddleware 载入中间件后返回的对象
 * @returns {Object} store 对象 
 */
const createStore = (reducer, enhancer) => {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }

    const listeners = [];
    let isDispatching = false;

    const getState = () => currentState;

    const subscribe = (listener) => {
        let isSubscribed = true
        listeners.push(listener);

        const unsubscribe = () => {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    };

    const dispatch = (action) => {
        reducer(state, action);

        const length = listeners.length;
        for (let i = 0; i < length; i++) {
            const listener = listeners[i];
            listener && listener();
        }

        return action;
    }
};
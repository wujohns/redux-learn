/**
 * 自制简易版 redux
 * 备注：部分简化部分会导致 bug，只保证基础使用模拟
 *
 * @author wujohns
 * @date 17/6/22
 */
'use strict';

/**
 * redux
 * @class
 */
class redux {
    /**
     * 初始化
     * @constructor
     */
    constructor (reducer) {
        this.reducer = reducer;
        this.state = reducer(undefined, {});
        this.listeners = [];
    }

    /**
     * 获取当前 state
     * @returns {AnyType} state
     */
    getState () {
        return this.state;
    }

    /**
     * 订阅方法
     * @param {Function} listener - 订阅执行方法 
     * @returns {Function} 取消订阅方法
     */
    subscribe (listener) {
        let isSubscribed = true;
        listeners.push(listener);

        const unsubscribe = () => {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
        return unsubscribe;
    }

    /**
     * 发送 action
     * @param {Object} action - 相应的 action
     * @returns {Object} action
     */
    dispatch (action) {
        state = reducer(state, action);

        const length = listeners.length;
        for (let i = 0; i < length; i++) {
            const listener = listeners[i];
            listener && listener();
        }
        return action;
    }

    /**
     * 创建相应的 store
     * @param {Function} reducer - reducer
     * @param {Function} enhancer - applyMiddleware加载中间件后返回的结果
     * @return {Object} store 对象
     */
    static createStore (reducer, enhancer) {
        if (typeof enhancer === 'function') {
            return enhancer(createStore)(reducer);
        }
        return new redux(reducer);
    }

    /**
     * reducer 组装方法
     * @param {Object} reducers - 对应的 reducer 组成的对象
     * @returns {Function} 组装后新的 reducer
     */
    static combineReducers (reducers) {}

    /**
     * 加载中间件的方法
     * @param {...Function} middlewares - 中间件
     * @returns {Function} a store enhancer applying the middleware
     */
    static applyMiddleware (...middlewares) {
        
    }
}

module.exports = redux;
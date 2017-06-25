/**
 * 自制简易版 redux
 * 备注：部分简化部分会导致 bug，只保证基础使用模拟
 *
 * @author wujohns
 * @date 17/6/22
 */
'use strict';

const _ = require('lodash');

/**
 * redux
 * @class
 */
class Redux {
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
        this.listeners.push(listener);

        const unsubscribe = () => {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
        return unsubscribe;
    }

    /**
     * 发送 action
     * @param {Object} action - 相应的 action
     * @returns {Object} action
     */
    dispatch (action) {
        this.state = this.reducer(this.state, action);

        const length = this.listeners.length;
        for (let i = 0; i < length; i++) {
            const listener = this.listeners[i];
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
            return enhancer(reducer);
        }
        return new Redux(reducer);
    }

    /**
     * reducer 组装方法
     * @param {Object} reducers - 对应的 reducer 组成的对象
     * @returns {Function} 组装后新的 reducer
     */
    static combineReducers (reducers) {
        return (state = {}, action) => {
            const resultState = _.reduce(reducers, (nextState, reducer, key) => {
                nextState[key] = reducer(state[key], action);
                return nextState;
            }, {});
            return resultState;
        }
    }

    /**
     * 函数拼接方法（洋葱模型构造器）
     * @param {...Function} 被注入了 getState 以及 dispatch 方法的中间件
     * @returns {Function} 组合后的中间件
     * @private
     */
    static _compose (...funcs) {
        if (funcs.length === 0) {
            return (arg) => arg;
        }
        if (funcs.length === 1) {
            return funcs[0];
        }

        return funcs.reduce((a, b) => (...args) => a(b(...args)));
    }

    /**
     * 加载中间件的方法
     * @param {...Function} middlewares - 中间件
     * @returns {Function} a store enhancer applying the middleware
     */
    static applyMiddleware (...middlewares) {
        return (reducer) => {
            const store = new Redux(reducer);
            let dispatch = store.dispatch.bind(store);

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            };
            const chain = _.map(middlewares, middleware => middleware(middlewareAPI));
            dispatch = Redux._compose(...chain)(dispatch);

            store.dispatch = dispatch;
            return store;
        };
    }
}

module.exports = Redux;
/**
 * redux 中间件的制作
 *
 * @author wujohns
 * @date 17/6/20
 */
'use strict';

// applyMiddleware 的原始代码
const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer, preloadedState, enhancer) => {
            const store = createStore(reducer, preloadedState, enhancer);
            let dispatch = store.dispatch;
            let chain = [];

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            };
            chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch
            }
        }
    };
};

// redux-thunk 原始代码，thunk 即为该中间件
const createThunkMiddleware = (extraArgument) => {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
};

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
/**
 * redux 异步方案（redux-thunk方式）
 *
 * @author wujohns
 * @date 17/6/20
 */
'use strict';

const redux = require('redux'),
    applyMiddleware = redux.applyMiddleware,
    createStore = redux.createStore;
const thunk = require('redux-thunk').default;

const reducer = (state = 'free', action) => {
    switch (action.type) {
        case 'START':
            state = 'runing';
            break;
        case 'STOP':
            state = 'free';
            break;
        default:
            break;
    }
    return state;
};

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('\n-------- state change ----------');
    console.log(store.getState());
});

const thunkFn = (delayTime, callback) => {
    return (dispatch, getState) => {
        dispatch({ type: 'START' });
        setTimeout(() => {
            dispatch({ type: 'STOP' });
            return callback(null, 'redux-thunk');
        }, delayTime);
    }
};

store.dispatch(thunkFn(1000, (err, type) => {
    console.log(type);
}));
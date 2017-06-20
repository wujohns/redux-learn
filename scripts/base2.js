/**
 * redux 中 reducer 的拆分
 *
 * @author wujohns
 * @date 17/6/19
 */
'use strict';

const redux = require('redux'),
    createStore = redux.createStore,
    combineReducers = redux.combineReducers;

// signReducer 部分
const signInitState = {
    username: '',
    email: '',
    hasLogin: false
};
const signReducer = (state = signInitState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case 'LOGIN':
            state.username = payload.username;
            state.email = payload.email;
            state.hasLogin = true;
            return state;
            break;
        case 'LOGOUT':
            state.username = '';
            state.email = '';
            state.hasLogin = false;
            return state;
            break;
        default:
            return state;
    } 
};

// titleReducer 部分
const titleInitState = 'welcome';
const titleReducer = (state = titleInitState, action) => {
    switch (action.type) {
        case 'RUSH':
            state = 'rushing';
            return state;
            break;
        case 'STOP':
            state = 'stoping';
            return state;
            break;
        default:
            return state;
    }
};

// 对 sign 与 title 进行组合
const reducer = combineReducers({
    sign: signReducer,
    title: titleReducer
});
const store = createStore(reducer);

store.subscribe(() => {
    console.log('\n------- state change -----------');
    console.log(store.getState());
});

store.dispatch({ type: 'RUSH' });
store.dispatch({
    type: 'LOGIN',
    payload: {
        username: 'wujohns',
        email: 'wujohns@163.com'
    }
});

store.dispatch({ type: 'STOP' });
store.dispatch({ type: 'LOGOUT' });
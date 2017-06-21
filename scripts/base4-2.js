/**
 * redux 异步方案（直接依靠外部组织，不依赖中间件）
 *
 * @author wujohns
 * @date 17/6/20
 */
'use strict';

const redux = require('redux'),
    createStore = redux.createStore;

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
const store = createStore(reducer);

store.subscribe(() => {
    console.log('\n-------- state change ----------');
    console.log(store.getState());
});

const fn = (delayTime, callback) => {
    store.dispatch({ type: 'START' });
    setTimeout(() => {
        store.dispatch({ type: 'STOP' });
        return callback(null, 'just callback');
    }, delayTime);
};

fn(1000, (err, type) => {
    console.log(type);
});
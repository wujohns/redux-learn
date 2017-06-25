# redux 异步方案
目前在 redux 中有两种异步方案，一种是 `redux-thunk` ,另一种则是 `redux-promise`，这里
介绍 `redux-thunk` 的解决方案后，补充一个推荐的方案。

## thunk 结构说明
thunk 结构说明参考 [plus2 自制redux前的js知识补充](/docs/plus2 自制redux前的js知识补充.md)
章节中的**柯里化**部分

## redux-thunk的使用
`redux-thunk` 可以使 `store.dispatch` 接受一个函数作为参数，如下：
```javascript
const redux = require('redux'),
    applyMiddleware = redux.applyMiddleware,
    createStore = redux.createStore;
const thunk = require('redux-thunk').default;

... // reducer 的定义

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.dispatch({ type: 'STOP' });   // 普通 action 格式不受影响
store.dispatch((dispatch, getState) => {
    dispatch({ type: 'START' });
    const state = getState();
    console.log(state);
});
```

其中 `store.dispatch` 接受的函数格式如下：
```javascript
/**
 * @params {Function} dispatch - 同 store.dispatch 方法（函数引用，想想大一的C课程）
 * @params {Function} getState - 同 store.getState 方法（函数引用，想想大一的C课程）
 */
function (dispatch, getState) {
    ...
}
```

一些异步处理的操作可以使用 thunk 格式封装（非严格thunk）：
```javascript
// 这里用 setTimeout 模拟异步
const thunkFn = (delayTime, callback) => {
    return (dispatch, getState) => {
        dispatch({ type: 'START' });
        setTimeout(() => {
            dispatch({ type: 'STOP' });
            return callback(null, 'redux-thunk');
        }, delayTime);
    };
};

store.dispatch(thunkFn(1000, (err, type) => {
    console.log(type);
}));
```
详细代码参考 [scripts/base4-1.js](scripts/base4-1.js)

## 另一种对异步逻辑封装的方式（推荐）
看到这里可以会有人觉得 `redux-thunk` 好厉害，简直 666，但个人认为按照那种方式处理只会徒增
代码的复杂度，维护比较麻烦（`redux-promise` 也是一样的）。   
这里直接使用最简单的回调结构来对异步操作进行封装：
```javascript
...
const async = require('async');
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
```
复杂异步逻辑配合 [async.js](http://caolan.github.io/async/) 组织即可（万金油）。  
详细代码参考 [scripts/base4-2.js](/scripts/base4-2.js)
# redux 中间件开发
常用的几个开源中间件基本可以满足日常开发的需要，这里记录中间件的开发作为机制理解用。
`redux-thunk` 是一个经典的 `redux` 中间件（可以作为样板），其源码也很简洁，这里通过
对其的分析来探究如何编写中间件

## redux-thunk 的源码
这里做了进一步简化，感兴趣也可以查看[原始代码](https://github.com/gaearon/redux-thunk/blob/master/src/index.js)
```javascript
const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
};
```

## 自制 redux 中间件
仿照 `redux-thunk` 的结构，就可以自己制作相应的中间件。使得 `store.dispatch` 发送相
应的 `action` 时执行我们在中间件中定义的操作。ex：
```javascript
/**
 * @params {Object} middlewaveAPI - redux 的 applyMiddlewave 机制传递的参数
 * @params {Function} middlewaveAPI.dispatch - store.dispatch 的引用
 * @params {Function} middlewaveAPI.getState - store.getState 的引用
 */
const cusLogger = ({ dispatch, getState }) => next => action => {
    console.log('\n------ custom logger ----------');
    console.log(`action type: ${ action.type }`);
    console.log(`before: ${ getState() }`);
    next(action);
    console.log(`after: ${ getState() }`);
};
```
完整代码见 `scripts/base5.js`  

## 原理分析
在补充章节有相关的原理分析：  
[plus1 自制简易的redux](/docs/plus1 自制简易的redux.md)  
[plus2 自制简易的redux前的js知识补充](/docs/plus2 自制redux前的js知识补充.md)  
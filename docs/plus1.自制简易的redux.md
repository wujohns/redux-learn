# 自制简易的 redux  
redux 是典型的 `订阅/发布` 模式，通过对 redux 的简易实现可以方便掌握这一模式在 js 下的
应用与实现。这里主要记录实现的过程。  
PS: 如果对其中用到的语法特性感到困惑可以先参考 plus2

## dispatch 与 subscribe
`redux` 在订阅事件的时候会向其 `listeners` 数组中将处理方法 `push` 进去，然后在 `dispatch` 
的时候则会依次调用这些处理方法。

`dispatch` 时：
1. 会依次调用在 `subscribe` 时 `push` 到 `listeners` 中的方法
1. 会将当前的 `state` 和相应的 `action` 传递给 `reducer`，并将 `reducer` 的返回值赋值给 `state`

## reducer 组装
`reducer` 是通过 `reduce` 方法将传入的 `reducer` 依次执行计算出相应的 `state` 来
作为新的 `reducer`，案例如下：
```javascript
combineReducers (reducers) {
    return (state = {}, action) => {
        const resultState = _.reduce(reducers, (nextState, reducer, key) => {
            nextState[key] = reducer(state[key], action);
            return nextState;
        }, {});
        return resultState;
    }
}
```

## 中间件机制
`redux` 的中间件采用的是洋葱模型，在 `plus2` 中有介绍，可以细看。

完整代码见 [scripts/plus1/redux.js](/scripts/plus1/redux.js)，
实际测试见 [scripts/plus1/test.js](/scripts/plus1/test.js)
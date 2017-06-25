# redux 的基础使用
redux 中基于 reducer 创建的 store 本质上可以视作一个带有 **订阅/发布** 机制的全局变量（然后在 react 的组件中
做 `订阅/发布` 操作来实现组件间的联动）

## store 的创建  
`store` 的是基于 `reducer` 创建的：  
1. `reducer` 包含两个参数 `state` 与 `action`  
1. `state` 即为 `store` 中存储的状态  
1. `action` 按照规范包含两个部分 `type` 与 `payload`，其中 `type` 用于区分是那个 `action`，而 `payload` 则是
该 `action` 传递的参数。  

案例如下：  
```javascript
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
const store = createStore(reducer);
// store.getState() --- 获取当前 state
// store.dispatch(<action>) --- 发布修改 state 的 action
// store.subscribe(<callback>) --- state 发生变更时触发 callback
```

## 对 store 的订阅/取消订阅  
在 `store` 创建后，即可对其 `state` 的变化进行订阅，当 `state` 发生变化时，即会执行订阅时传入的函数：  
```javascript
const unsubscribe = store.subscribe(() => {
    console.log('------ state change --------');
});

unsubscribe();  // 取消订阅
```

## 对 store 的读取/修改  
执行 `store.getState()` 即可读取 `state`  
执行 `store.dispatch(<action>)` 即可发出修改 `state` 的 `action`  

案例如下：
```javascript
// 通过 store 的进行事件发布
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState());
```

完整代码参考：[scripts/base1.js](/scripts/base1.js)
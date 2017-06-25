# redux 中间件使用
在开发过程中有时会有一些通用的逻辑或功能需要加入到 redux 的工作流中，这时可以采用 redux 的中
间件方案进行解决处理。

## 中间件的使用  
使用 `redux` 的 `applyMiddleware` 方法即可载入相应的中间件：
```javascript
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
const logger = createLogger();

...

const store = createStore(
    reducer,
    applyMiddleware(logger)
    // 多个中间件则为：applyMiddleware(m1, m2, m3...)
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
// 控制台会有相关的日志记录
```

当使用多个中间件时在载入顺序上需要注意，原理相关可以参考 **中间件开发** 以及后续的 **自制redux部分**

完整代码参考 [scripts/base3.js](scripts/base3.js)
# redux 中 reducer 的组装  
在开发过程中，redux 的规范是一个页面只能有一个 store （技术上可以创建多个，但构架上禁止这样做），但
在较为复杂的单页应用（spa）中，把所有的 action --> state 放在一个 reducer 中肯定是不友好的（各部分逻
辑会混杂在一起），所以对 reducer 的拆分以及后续的拼接（一个页面只能有一个store）是有必要的。  

## reducer 的拼接  
`redux` 中对 `reducer` 进行拼接的方法是 `combineReducers`，且拼接组装后返回的结果也是一个 `reducer` 形式的函
数（可以组装后再组装）  

使用案例如下：
```javascripts
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
```

组装后 `store` 中 `state` 的结构为（和 `json对象` 的赋值类似）： 
```javascripts
console.log(store.getStore());
/**
 * 输出结果为：
 * {
 *      sign: { username: '', email: '', hasLogin: false },
 *      title: 'welcome'   
 * }
 */
```

使用 `dispatch` 发送相应的 `action` 即可修改相应的 `state`：
```javascripts
store.dispatch({
    type: 'LOGIN',
    payload: {
        username: 'wujohns',
        email: 'wujohns@163.com'
    }
});
console.log(store.getStore());
/**
 * 输出结果为：
 * {
 *      sign: {
 *          username: 'wujohns',
 *          email: 'wujohns@163.com',
 *          hasLogin: false
 *      },
 *      title: 'welcome'   
 * }
 */
```

回归本质：基于 reducer 创建的 store 本质上可以视作一个带有 *订阅/发布* 机制的全局变量  
完整代码参考 `scripts/base2.js`
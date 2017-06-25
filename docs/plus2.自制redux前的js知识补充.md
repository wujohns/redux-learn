# 知识补充
该部分的知识补充主要是为了理解 `redux` 的源码。主要难于理解的地方都属于函数式编程部分。  

## 复合函数
复合函数即组合多个函数并返回一个新函数。  

抽象为公式即为：
```
f(x) = x^2 + 1
g(x) = 2x
f(g(x)) = f(2x) = 4x^2 + 1
```

代码案例：
```
const greet = (x) => `hello, ${ x }`;
const emote = (x) => `${ x } :)`;
const compose = (f, g) => {
    return (x) => f(g(x))
};

const greeting = compose(greet, emote);
greeting('Mark');       // 返回 hello, Mark :)
```

平时的具体应用可以参照 _.filter 函数的使用。

## 柯里化
`(4) redux 异步方案` 中的 `thunk` 介绍并非严格意义上的 `thunk`。无论是 `thunk` 还是柯里化，
其核心思想均为将多参数函数变为多层返回单参数函数，案例如下：
```javascript
// 普通结构
const ori = (title, subTitle, content) => {
    return `
        <h1>title</h1>
        <h3>subTitle</h3>
        <p>content</p>
    `;
};

// 柯里化结构
const curry = (title) => (subTitle) => (content) => {
    return `
        <h1>title</h1>
        <h3>subTitle</h3>
        <p>content</p>
    `;
}

// 调用
ori('Hello', 'blue sky', 'shoot the sun');
curry('Hello')('bule sky')('shoot the sun');
```

这样做的方便之处在于：
1. 可以动态构造需要的函数
1. 数据的产出类似于管道的加工流程
案例如下：
```javascript
const hello = curry('Hello');
const template = {
    aaa: hello('aaa'),
    bbb: hello('bbb')
};
template.aaa('shoot the sun');
template.bbb('shoot the moon');
```

而所谓的 thunk 则是在这种柯里化的函数中，有一个参数为回调函数，案例如下：
```
const thunk = (delayTime) => (callback) => {
    console.log(`delayTime: ${ delayTime }`);
    setTimeout(() => {
        return callback();
    }, delayTime);
};

thunk(1000)(() => {
    console.log('after delay time');
});
```

## compose + 柯里化
两者配合即可组织为洋葱模型，实现相应的中间件机制。compose的实现如下：
```
const compose = (...funcs) => {
    if (funcs.length === 0) {
        return (arg) => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};
```
其作用为将格式为 `(...args) => {...}` 的一堆函数拼接为  `(...args) => {...}`，例如 
`compose(a,b,c)` --> `(...args) => a(b(c(...args)))`。

而中间件的格式为：
```
const m = next => action => {
    ...
    next(action);
    ...
};
```
所以在 `compose(a, b, c)` 拼接的过程中：
1. `b` 成了 `a` 的 `next` ，`c` 成了 `b` 的 `next`  
1. 最后一层 `next` 是从外面传入的函数  
1. `action` 则作为参数被一层层传入（每层皆可以使用和修改）
1. 当 `next` 执行完后则会由一层层从里到外，执行每层 `next` 后面定义的内容

完整案例代码见 [scripts/plus2/compose.js](/scripts/plus2/compose.js)
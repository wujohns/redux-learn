/**
 * redux 中的技术点使用 compose 来构建洋葱模型组织中间件
 *
 * @author wujohns
 * @date 17/6/23
 */
'use strict';

const compose = (...funcs) => {
    if (funcs.length === 0) {
        return (arg) => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

const m1 = next => action => {
    console.log('start m1');
    next(action);
    console.log('end m1');
};

const m2 = next => action => {
    console.log('start m2');
    next(action);
    console.log('end m2');
};

const showAction = (action) => {
    console.log(action);
};

const show = compose(...[m1, m2])(showAction);
show('--------- run show action -----------');
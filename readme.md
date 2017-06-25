# redux 原理探究笔记  

在较复杂的单页应用中，为了方便对前端状态的管理，可以考虑使用 redux。这里主要
是对 redux 使用以及接口做相关的实验。需要注意的是这里对 redux 的功能做探究，
所以不用引入 `dom` 相关，代码都可用 `node` 直接调试。  

`node` 版本要求 >= 6.0.0

## 相关文件
`/docs` 相关的笔记记录  
`/scripts` 相关的脚本，可直接用 `node` 进行执行  

## docs 目录
基础部分：  
(1) [redux的基础使用](/docs/1.redux的基础使用.md)  
(2) [redux中reducer的拆分](/docs/2.redux中reducer的拆分.md)  
(3) [redux中间件使用](/docs/3.redux中间件使用.md)  
(4) [redux异步方案](/docs/4.redux异步方案.md)  
(5) [redux中间件开发](/docs/5.redux中间件开发.md)  

额外补充：  
[plus1 自制简易的redux](/docs/plus1.自制简易的redux.md)  
[plus2 自制简易的redux前的js知识补充](/docs/plus2.自制redux前的js知识补充.md)  

相关参考：  
[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)  
[Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)  
[Redux 中间件 Middleware 详解](https://juejin.im/entry/575ce0225bbb50006372884e)  
[深入浅出 Redux 中间件](https://toutiao.io/posts/io5vu/preview)  
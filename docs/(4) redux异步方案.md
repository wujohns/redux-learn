# redux 异步方案
目前 `redux` 生态中异步方案比较流行的是 `redux-promise` 方案，但个人认为 `promise` 以及对其有
强依赖 `async/await` 标准并不是很好（promise is ugly），所以这里并不采用 `redux-promise` 作为
`redux` 的异步方案，而是采用 [async.js](http://caolan.github.io/async/) 配合的方案
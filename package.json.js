/**
 * module bundler with simple configure
 */
'use strict';

const packageConfig = {
    // 基础说明配置
    name: 'redux-learn',
    version: '0.0.1',
    author: 'wujohns',
    description: 'learn redux',
    license: 'MIT',

    /**
     * scripts
     */
    scripts: {
        // test: './node_modules/mocha/bin/mocha ./test/build.test.js'
    },

    engine: {
        node: '>=4.0.0'
    },

    dependencies: {
        // 基础工具
        'lodash': '^4.17.4',
        'async': '^2.4.1',

        // redux 相关
        'redux': '^3.7.0',
        'redux-logger': '^3.0.6'
    },

    devDependencies: {}
};

const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, './package.json');
fs.writeFileSync(targetFile, JSON.stringify(packageConfig, null, 2), {
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666
});
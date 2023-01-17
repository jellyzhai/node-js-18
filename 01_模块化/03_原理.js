/*
    所有的CommonJs的模块都会被包装到一个函数中
    (function(exports,require, module,__filename,__dirname) {
        // 模块代码会被放到这里
    });
*/

let a = 10
let b = 20

// 证明当前模块是一个函数
console.log(arguments);

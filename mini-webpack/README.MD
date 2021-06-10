# 手写 mimi 版 webpack

## 原理分析

假设现在有两个 js 模块（复合 commomjs 标准的 es5 模块）。

```js
// index.js
const add = require('./add.js').default
console.log(add(1 , 2))

// add.js
exports.default = function(a, b) { return a + b }
```

commomjs 规范下导出的模块使用`exports.default = ...`导出代码块，使用的模块使用`const add = require('./xxx.js').default`导入后即可使用。

但是 commomjs 规范在浏览器环境下无法直接使用，即你的 index.html 可能如下：

```html
<script src="./index.js"></script>
```

此时浏览器会报错：`Uncaught ReferenceError: require is not defined`。这就需要经过 webpack 打包处理才行了。我们先通过模拟 exports 对象和 require 方法来让代码能成功执行。

1.模拟 exports 对象
我们知道如果在 node.js 打包的时候我们会使用 fs.readfileSync() 来读取 js 文件。读取的 js 文件会是一个字符串。而如果需要将字符串中的代码运行会有两个方法分别是 eval 和 new Function。

```js
const exports = {};
const code = `exports.default = function(a, b) { return a + b }`; // 文件读取后的代码字符串
eval(code);
exports.default(1, 2);
```

上面这段代码的运行结果将模块中的方法绑定在 exports 对象中。由于子模块中可能会声明变量，为了不污染全局我们使用一个自运行函数来封装一下。

```js
const exports = {}
const code = `exports.default = function(a, b) { return a + b }`; // 文件读取后的代码字符串
(function (exports, code) {
  eval(code)
})(exports, code)
```

2.模拟 require 函数
require 函数的功能就是根据提供的文件名称加载对应的模块。

```js
function require(file) {
  const exports = {}
  const code = `exports.default = function(a, b) { return a + b }`; // 文件读取后的代码字符串
  (function (exports, code) {
    eval(code)
  })(exports, code)

  return exports;
}

const add = require("add.js").default;
console.log(add(1, 2));
```

上面的代码演示的是单个固定模块的处理问题，如果是多个模块呢？大概应该长这样：

```js
(function (list) {
  function require(file) {
    const exports = {}
    const code = `exports.default = function(a, b) { return a + b }`; // 文件读取后的代码字符串
    (function (exports, code) {
      eval(code)
    })(exports, code)

    return exports;
  }
  require("index.js");
})({
  "index.js": `
    var add = require('add.js').default
    console.log(add(1, 2))
  `,
  "add.js": `exports.default = function(a, b){ return a + b }`,
});
```

可以看到传入了一个文件名称和代码串的映射。这个就是 webpack 打包生成 bundle.js 的最简陋版本。当然要说明的一点是真正 bundle.js 文件中还需要增加模块间的依赖关系。形如：

```json
{
  "./src/index.js": {
    "deps": { "./add.js": "./src/add.js" },
    "code": "....."
  },
  "./src/add.js": {
    "deps": {},
    "code": "......"
  }
}
```

另外，由于大多数前端程序都习惯使用 es6 语法所以还需要预先将 es6 语法转换为 es5 语法。

总结一下思路，webpack打包可以分为以下三个步骤：

1. 分析依赖
2. ES6转ES5
3. 替换 exports 和 require

## 功能实现

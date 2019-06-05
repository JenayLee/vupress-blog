# webpack
---

## 什么是webpack

1. webpack是一个模块打包工具（module bundler）。
2. js文件通过script标签静态引入，js文件之间由于没有强依赖关系，如果文件1要用到文件2的某些方法或变量，则必须将文件1放到文件2后面加载。
随着项目的增大，js文件之间的依赖关系越发错综复杂，维护难度也越来越高。
因此引入" 模块 "的概念让js文件之间相互引用，而不用担心文件间的排列顺序。
基于这种理念，CommonJS和AMD规范被创造，然后有了require.js、system.js这样的前端模块加载工具和node的模块系统，直到现在流行的es6 module。
3. 模块的引入解决了文件之间依赖引用的问题，而打包则解决了文件过多的问题。
4. bundler可以把多个关联的文件打包到一起从而大量减少文件的数量提供网页加载性能。
5. 提供模块化的开发方式和编译打包功能是webpack的核心。

### 核心概念

#### 1. Module(模块) 
 
对于webpack，模块不仅仅是JavaScript模块，它包括了任何类型的源文件，不管是图片、字体、json文件等。
webpack支持一下的方式引用模块:
- ES2015 `import`方法
- CommonJS `require()`方法
- AMD `define`和`require`语法
- css/sass/less文件中的`@import`语法
- `url(...)`和`<img src=...>`中的图片路径

#### 2. Dependency Graph(依赖关系图)

所谓的依赖关系图是webpack根据每个模块之间的依赖关系递归生成的一张内部逻辑图，有了这张依赖关系图，
webpack就能按图索骥把所有需要模块打包成一个bundler文件了。

#### 3. Entry(入口)

绘制依赖关系图的起始文件被称为entry。默认的entry为`./src/index.js`，或者我们可以在配置文件中配置。
entry可以为一个也可以为多个。
* 单个entry:
```
module.exports = {
    entry: './src/index.js'
}
```
或者
```
module.exports = {
    entry: {
        main: './src/index.js'
    }
}
```
* 多个entry，多个chunk

如果有多个entry，并且每个entry生成对应的chunk，我们需要传入object：
```
module.exports = {
    entry: {
        app: './src/app.js',
        admin: './src/admin.js'
    }
}
```
这种写法有最好的灵活性和扩展性，支持和其他的局部配置进行合并。比如将开发环境和生产的配置
分离，并抽离出公共的配置，在不同的环境下运行时再将环境配置和公共配置进行合并。

#### 4. Output(出口)

有了入口，对应的就有出口。顾名思义，出口就是webpack打包完成的输出，output定义了输出的路径
和文件名称。webpack默认的输出路径为`./dist/main.js`。同样，我们可以在配置文件中配置output：
```
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + './dist',
        filename: 'bundle.js'
    }
}
```
* 多个entry的情况

当有多个entry的时候，一个entry应该对应一个output，此时输出的文件名需要使用替换符声明以确保文件名
的唯一性，例如使用入口模块的名称：
```
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist' 
    }
}
```
最终在`./dist`路径下面会生成`app.js`和`search.js`两个bundle文件。

#### 5. Loader(加载器)

webpack自身只支持加载js和json模块，而webpack的理念是让所有的文件都能被引用和加载并生成
依赖关系图，所以loader出场了。Loader能让webpack能够处理其他类型的文件（比如图片、字体文件、xml）。
我们可以在配置文件中这样定义一个loader：
* webpack.config.js
```
module.exports = {
    module: {
        rules: [
            test: /\.txt$/,
            use: 'raw-loader'
        ]
    }
}
```
其中`test`定义了需要被转化的文件或者文件类型，`use`定义了对该文件进行转化的loader的类型。
该条配置相当于告诉webpack当遇到一个txt文件的引用时（使用require或者import进行引用），先
用`raw-loader`转换一下该文件再把它打包进bundle。
还有其他各种类型的loader，比如加载css文件的`css-loader`，加载图片和字体文件的`file-loader`，
加载html文件的`html-loader`，将最新JS语法转换成ES5的`babel-loader`等等。

#### 6. Plugin(插件)

Plugin和loader是两个比较混淆和模糊的概念。Loader是用来转换和加载特定类型的文件，所以loader
的执行层面是单个的源文件。而Plugin可以实现的功能更强大，Plugin可以监听webpack处理过程中的关键
事件，深度集成进webpack的编译器，可以说Plugin的执行层面是整个构建过程。Plugin系统是构成webpack
的主干，webpack自身也基于Plugin系统搭建，webpack有丰富的内置插件和外部插件，并且允许用户自定义
插件。与loader不同，使用Plugin我们必须先引用该插件：
```
const webpack = require('webpack'); // 用于引用webpack内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 外部插件

module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
}
```

## 实例

1. 创建项目

首先创建`react-webpack-starter`项目并使用`npm init`初始化

2. 安装依赖
* 安装react
```
npm i react react-dom
```
* 安装webpack相关
```
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader
```
安装`webpack-cli`后可以在命令行执行webpack命令；
`webpack-dev-server`提供了简易的web服务器，
并且在修改文件之后自动执行webpack的编译操作并自动刷新浏览器，省去了重复的手动操作；
`html-webpack-plugin`用于自动生成`index.html`，并且在`index.html`中自动添加
对bundle文件的引用；`style-loader`和`css-loader`用于加载css文件。

* 安装babel相关

由于react中使用了`class`，`import`这样的es6的语法，为了提高网站的浏览器兼容性，
我们需要用babel转换一下。
```
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```
其中`@babel/core`是babel的核心模块，包含了babel的核心功能；`@babel/preset-env`
支持转换ES6以及更新的js语法，并且可根据需要兼容的浏览器类型选择加载的Plugin从而精简
生成的代码；`@babel/preset-react`包含了babel转换react所需要的Plugin；
`babel-loader`是webpack的babel加载器。

* 配置webpack

在项目根目录下新建`webpack.config.js`，内容如下：
```
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: 'base-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 注意排列顺序，执行顺序与排列顺序相反
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
```
其中`HtmlWrbpackPlugin`使用自定义的模板来生成html文件，模板的内容如下：
```
// ./src/index.html

<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width,initial-scle=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        <title>My React App</title>
    </head>
    <body>
        <div id='app'></div>
    </body>
</html>
```
* 配置babel

在项目根目录下新建`.babelrc`文件，配置我们安装的两个babel preset:
```
// .babelrc

{
    'presets': [
        '@babel/preset-env',
        '@babel/preset-react'
    ]
}
```
* 生成react应用根节点
```
// ./src/index

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App/>, document.getElementById('app'));
```
```
// ./src/component/App.js

import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                my react webpack starter
            </div>
        )
    }
}
```
```
// ./src/components/App.css

body {
    font-size: 60px;
    font-weight: bolder;
    color: red;
    text-transform: uppercase;
}
```
* 配置 `package.json`

最后，在`package.json`文件里加上两个scripts，用来运行开发服务器和打包：
```
// package.json

'scripts': {
    'start': 'webpack-dev-server --mode development --open --hot',
    'build': 'webpack --mode production'
}
```
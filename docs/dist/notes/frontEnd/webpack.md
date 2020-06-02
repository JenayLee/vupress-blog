# webpack

``` javascript
/**
 * webpack的配置文件
 * * 所有构建工具都是基于nodejs平台运行的，模块化默认采用commonjs
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'development';

const commonCssLoader = [
    // 'style-loader',
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'  // 解决css中图片路径问题
        }
    }, // 将js中的css提取，取代style-loader
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                // postcss的插件
                require('postcss-preset-env')(),
            ],
        },
    },
];
module.exports = {
    // 开发环境和生产环境的差别
    // 开发环境：能让代码本地调试运行的环境。源码（es6，less, etc.） -> webpack -> bundle (自动化)
    // 生产环境：能让代码优化上线运行的环境。css -> js（闪屏，大 -> 提取）；代码压缩；样式和js兼容
    mode: 'development',
    // mode: 'production',
    entry: './src/index.js',
    output: {
        // 输出文件资源目录
        path: resolve(__dirname, 'dist'),
        // 指定名称+目录
        filename: 'bundle.[contenthash].js',
    },
    module: {
        rules: [
            // 在package.json中eslintConfig --> airbnb
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',  // post 延后执行
                options: {
                    // 自动修复
                    fix: true,
                },
            },
            {
                // 以下loader只会匹配一个
                // 优化生产环境构建打包速度
                // 注意：不能有两个配置处理同一个类型文件
                oneOf: [
                    // less-loader 将less文件编译成css文件
                    // css-loader 将css文件变成commonjs模块加载js中，内容是样式字符串
                    // style-loader 创建style标签，将js中的样式资源插入，添加到head中生效
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader],
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader'],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif)/,
                        loader: 'url-loader',
                        options: {
                            // 图片大小小于8kb，就会被base64处理
                            // 优点：减少请求数量（减轻服务器压力）
                            // 缺点：图片体积会更大（文件请求速度更慢）
                            limit: 30 * 1024,
                            // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                            // 解析时会出问题：[object Module]
                            // 解决：关闭url-loader的es6模块化，使用commonjs解析
                            esModule: false,

                            // 给图片进行重命名
                            // [hash:10] 取图片hash的前10位
                            // [ext] 取文件原来的扩展名
                            name: '[hash:10].[ext]',
                            outputPath: 'images',
                        },
                    },
                    {
                        test: /\.html/,
                        // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                        loader: 'html-loader',
                    },
                    // {
                    //     exclude: /\.(css|html|js|less)/,
                    //     loader: 'file-loader'
                    // }
                    {
                        test: /\.(ttf|eot|woff|woff2|svg)$/i,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts',
                            },
                        }, ],
                    },
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        use: [
                            /**
                             * 开启多进程打包
                             * * 进程启动大概为600ms，进程通信也有开销
                             * * 只有工作消耗时间比较长，才需要多进程打包
                             */
                            {
                                loader: 'thread-loader',
                                options: {
                                    workers: 2 // 进程2个
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    // 预设：指示babel做怎样的兼容性处理
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                // 按需加载
                                                useBuiltIns: 'usage',
                                                // 指定core-js版本
                                                corejs: {
                                                    version: 3,
                                                },
                                                // 指定兼容性做到哪个版本浏览器
                                                targets: {
                                                    chrome: '60',
                                                },
                                            },
                                        ],
                                    ],
                                    // 开启babel缓存
                                    // 第二次构建时，会读取之前的缓存
                                    cacheDirectory: true,
                                },
                            }
                        ]
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩
            minify: {
                // 去空格
                collapseWhitespace: true,
                // 删注释
                removeComments: true,
            },
        }),
        // 提取css
        new MiniCssExtractPlugin({
            filename: 'css/main.[contenthash].css',
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            // 1. 帮助serviceworker快速启动 2. 删除旧的serviceworker
            // 生成一个serviceworker配置文件
            clientClaim: true,
            skipWaiting: true,
        }),
    ],
    // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // HMR
        hot: true,
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    // 配置某些包不参与打包
    externals: {
        jquery: 'jQuery'
    },
    devtool: 'source-map',
};
```

## entry

- 1.1  单入口（string）
    - `'./src/index.js'`
    - 打包形成一个chunk，输出一个bundle文件，此时chunk的名称默认是main

- 1.2 多入口（array）
    - `['./src/index.js', './src/add.js']`
    - 所有入口文件最终只会形成一个chunk，输出一个bundle文件
    - 只有在HMR功能中让html热更新生效

- 1.3 多入口（object）
    - `{index: './src/index.js', add: './src/add.js'}` 或 `{index: ['./src/index.js', './src/count.js'], add: './src/add.js'}`
    - 有几个入口文件就形成几个chunk，输出几个bundle文件。此时chunk的名称是key值

## output
```javascript
output: {
        // 输出文件资源目录
        path: resolve(__dirname, 'dist'),
        // 指定名称+目录
        filename: 'js/[name].js',
        //所有资源引入公共路径前缀
        publicPath: '/',
        // 非入口chunk的名称
        chunkFilename: 'js/[name]_chunk.js',
        libraray: '[name]',  // 整个库向外暴露的变量名
        // libraray: 'window',  // 变量名添加到browser
        // libraray: 'global',  // 变量名添加到node
        // libraray: 'commonjs/amd'
}
```


## devServer
```javascript
devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'dist'),
    // 监视contentBase目录下的所有文件，一旦文件变化就回reload
    watchContentBase: true,
    watchOptions: {
        // 忽略文件
        ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口
    port: 5000,
    // 域名
    host: 'localhost',
    // 开启HMR
    hot: true,
    // 自动打开浏览器
    open: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错，不要全屏提示
    overlay: false,
    // 服务器代理：解决开发环境跨越问题
    proxy: {
        '/api': {
            // 一旦（5000）服务器接收到/api/xxx请求，就会把请求转发到另一个服务器（3000）
            target: 'http://localhost:3000',
            // 发送请求时，请求路径重写： 将/api/xxx --> /xxx （去掉/api）
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}
```

## optimization
```javascript
optimization: {
    splitChunks: {
        chunks: 'all',
        // 以下配置为默认值，可不写
        // minSize: 30 * 1024, // 分割的chunk最小为30kb
        // maxSize: 0, // 最大没有限制
        // minChunks: 1, // 要提取的chunk最小被引用1次
        // maxAsyncRequests: 5, // 按需加载试并行加载的文件最大数量
        // maxInitialRequests: 3, // 入口js文件最大并行请求数量
        // automaticNameDelimiter: '~', // 名称连接符
        // name: true， // 可以使用命名规则
        // cacheGroups: {
        //     // 分割chunk的组
        //     // node_modules文件会被打包到vendors组的chunk中 --> vendors~xx.js
        //     // 满足上面的公共规则，如：大小超过30kb，至少被引用一次
        //     vendors: {
        //         test: /[\\/]node_modules[\\/]/,
        //         // 优先级
        //         priority: -10
        //     }，
        //     default: {
        //         // 要提取的chunk最少被引用2次
        //         minChunks: 2,
        //         // 优先级
        //         priority: -20,
        //         // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
        //         reuseExistingChunk: true
        //     }
        // }
    }，
    // 将当前模块记录其他模块的hash单独打包为一个runtime文件
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
    }，
    minimizer: [
        // 配置生产环境的压缩方案：js和css
        new TerserWebpackPlugin({
            // 开启缓存
            cache: true,
            // 开启多进程打包
            parallel: true,
            // 启动source-map
            sourceMap: true
        })
    ]
}
```

##  缓存
- babel缓存
    - 让第二次打包构建速度更快
    ```javascript
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        }
    ```
- 文件资源缓存（让代码上线远行缓存更好使用）
    - hash：每次webpack构建时会生成一个唯一的hash值
        - 问题：因为js和css同时会使用一个hash值，如果重新打包，会导致所有缓存失效（可能只改动一个文件）
    - chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
        - 问题：js和css的hash值还是一样的，因为css是在js中被引入的，所以同属于一个chunk
    - contenthash（推荐）：根据文件的内容生成hash值，不同文件hash值一定不一样

##  HMR
hot module replacement 热模块替换/模块热替换

作用：一个模块发生变化：只会重新打包这一个模块，而不是打包所有模块 -> 极大提升构建速度
- 样式文件：支持HMR，因为style-loader内部实现了
- js文件：不支持HMR，需要修改js代码，添加支持HMR功能的代码
    ```javascript
        if(module.hot){
            module.hot.accept('./print.js', function(){
                print()
            })
        }
    ```
    - 注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
- html文件：不支持HMR (不用做HMR功能)
    - 解决：修改entry入口，将html文件引入，会导致html文件不能热更新

## PWA
渐进式网络开发应用程序（离线可访问）
- workbox --> workbox-webpack-plugin
```javascript
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            // 1. 帮助serviceworker快速启动 2. 删除旧的serviceworker
            // 生成一个serviceworker配置文件
            clientClaim: true,
            skipWaiting: true,
        }),
    ]
```
- 在入口文件中配置，必须在服务器运行
```javascript
    // 注册serviceworker（处理兼容性问题）
    if('serviceWorker' in navigator){
        window.addEventListener('load', ()=>{
            navigator.serviceworker.register('/service-worker.js')
            .then(()=>{})
            .catch(()=>{})
        })
    }
```

##  code split
``` javascript
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    }
```
   - 可以将node_modules中代码单独打包一个chunk最终输出
   - 自动分析多入口chunk中有没有公共的文件，如果有会打包成单独一个chunk
        - 通过js代码，让某个文件被单独打包成一个chunk
        ```javascript
            // import动态导入语法：能将某个文件单独打包
            import(/* webpackChunkName: 'test'*/"./test")
            .then(({fun1, fun2})=>{})
            .catch(res=>{})
        ```

##  tree shaking
去除无用代码
- 前提：1. 必须使用es6模块化  2. 开启production环境
- 作用：减少代码体积
- 在package.json中配置
    - `"sideEffects": false`  所有代码都没有副作用（都可以进行tree shaking）
    - 问题：可能会把css / @babel/polyfill 等文件干掉
    - 解决：`"sideEffects": ["*.css", "*.less"]`







## source-map
一种提供源代码构建后代码映射技术

如果构建后代码出错了，通过映射可以追踪代码错误
```javascript
    devtool: 'source-map'
```
-`[inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map`

区别：外部生成了map文件，内联没有；内联构建速度更快

- 1. `source-map`: 外部
    - 错误代码准备信息 & 源代码的错误位置
- 2. `inline-source-map`：内联
    - 只生成一个内联source-map
    - 错误代码准备信息 & 源代码的错误位置
- 3. `hidden-source-map`：外部
    - 错误代码错误原因 & 没有错误位置
    - 不能追踪源代码错误，只能提示到构建后代码的错误位置
- 4. `eval-source-map`：内联
    - 每一个文件都生成对应的source-map，都在eval中
    - 错误代码准确信息 & 源代码的错误位置
- 5. `nosource-source-map`：外部
    - 错误代码准确信息 & 但是没有任何源代码信息
- 6. `cheap-source-map`：外部
    - 错误代码错误原因 & 源代码的错误位置
    - 只能精确到行
- 7. `cheap-module-source-map`：外部
    - 错误代码准确信息 & 源代码的错误位置
    - module会将loader的source-map加入

- 开发环境：速度快，调试更友好
    - 速度快 eval > inline > cheap > ...
        - `eval-cheap-source-map` / `eval-source-map`
    - 调试更友好
        - source-map | cheap-module-source-map | cheap-source-map
        - `eval-source-map` / ` eval-cheap-module-source-map`
- 生产环境：源代码要不要隐藏？调试要不要更友好
    - 内联会让代码体积变大，所以在生产环境不用内联
        - `nosource-source-map` 全部隐藏
        - `hidden-source-map` 只隐藏源代码，会提示错误位置
    - `source-map` / `cheap-module-source-map`

##  懒加载/预加载
- 懒加载：当文件需要使用时才加载（使用import动态导入）
- 预加载prefetch：会在使用之前，提前加载js文件
    - 等其他资源加载完毕后再加载
    - 存在兼容性问题，慎用
    ```javascript
        // import动态导入语法：能将某个文件单独打包
        import(/* webpackChunkName: 'test' , webpackPrefetch: true*/"./test")
        .then(({fun1, fun2})=>{})
        .catch(res=>{})
     ```
- 正常加载：可以认为是并行加载（同一时间加载多个文件）

## js兼容性处理
`babel-loader @babel/core`
- eslint处理
    - 正常来讲，一个文件只能被一个loader处理
    - 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
        - 先执行eslint 再执行babel
        ```javascript
            // webpack.config.js
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',
                options: {
                    // 自动修复
                    fix: true,
                },
            },

            // package.json
            "eslintConfig": {
                "extends":  "airbnb-base",
                "env": {
                    "browser": true  // 支持浏览器的全局变量
                }
            }
        ```

- 基本js兼容性处理： `@babel/preset-env`
    ```javascript
         {
            loader: 'babel-loader',
            options: {
                // 预设：指示babel做怎样的兼容性处理
                presets: [
                    [
                        '@babel/preset-env'
                    ],
                ]
            }
         }
    ```
    - 问题：只能转换基本语法，如promise高级语法不能转换
- 全部js兼容性处理： `@babel/polyfill`  通过import引入
    - 问题：只能解决部分兼容性问题，但所有兼容性代码会全部引入，体积太大了
- 按需加载： `core-js`
```javascript
    {
        loader: 'babel-loader',
        options: {
            // 预设：指示babel做怎样的兼容性处理
            presets: [
                [
                    '@babel/preset-env',
                    {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定core-js版本
                        corejs: {
                            version: 3,
                        },
                        // 指定兼容性做到哪个版本浏览器
                        targets: {
                            chrome: '60',
                        },
                    },
                ],
            ]
        }
    }
```

## css兼容性处理
`postcss -> postcss-loader postcss-preset-env`
```javascript
// 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => [
            // postcss的插件
            require('postcss-preset-env')(),
        ],
    },
},
```
- browserslist默认选中生产环境，可通过node环境变量调整：`process.env.NODE_ENV = "development"`
```javascript
// package.json
"browserslist": {
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ],
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
    ]
},
```

## 开发环境优化

 * 优化打包构建速度
    * <a href="#hmr">HMR</a>

* 优化代码调试
    * <a href="#source-map">source-map</a>

## 生产环境优化

 * 优化打包构建速度
    * oneOf
    * <a href="#缓存">babel缓存</a>
    * 多进程打包
    * externals
    * dll

* 优化代码运行性能
    * <a href="#缓存">缓存（hash-chunkhash-contenthash)</a>
    * <a href="#tree-shaking">tree shaking</a>
    * <a href="#code-split">code split</a>
    * <a href="#懒加载-预加载">懒加载/预加载</a>
    * <a href="#pwa">pwa</a>

## webpack5

此版本重点关注以下内容：
* 通过持久缓存提高构建性能
* 使用更好的算法和默认值来改善长期缓存
* 通过更好的树摇和代码生成来改善捆绑包大小
* 清除处于怪异状态的内部结构，同时在V4中实现功能而不引入任何重大更改
* 通过引入重大更改来为将来的功能做准备，以便使我们能够尽可能长时间地使用V5

#### 下载

`npm i webpack@next webpack-cli -D`

#### 自动删除Node.js Polyfills

早期，webpack的目标是允许在浏览器中运行大多数node.js模块，但是模块格局发生了变化，许多模块用途现在主要是为了前端目的而编写的。webpack <= 4 附带了许多node.js核心模块的polyfill，一旦模块使用任何核心模块（即crypro模块），这些模块就会自动应用。

尽管这使使用为node.js编写的模块变得容易，但它会将这些巨大的polyfill添加到包中。在许多情况下，这些polyfill是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

* 尽可能尝试使用与前端兼容的模块
* 可以为node.js核心模块手动添加一个polyfill，错误信息将提示如何实现该目标

#### Chunk和模块ID

添加了用于长期缓存的新算法，在生产模式下默认启用这些功能

`chunkIds: 'deterministic', moduleIds: 'deterministic'`

#### Chunk ID

你可以不用使用`import(/* webpackChunkName: "name" */ "module")`在开发环境来为chunk命名，生产环境还是有必要的。webpack内部有chunk命名规则，不再是以id(0,1,2)命名了

#### Tree Shaking

1. webpack5能够处理对嵌套模块的tree shaking
```javascript
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner }

// user.js
import * as module from './module';
console.log(module.inner.a);
```
在生产环境中，inner模块暴露的`b`会被删除

2. webpack5能够处理多个模块之前的关系
```javascript
import { something } from './something';

function usingSomething() {
    return something;
}

export function test() {
    return usingSomething();
}
```
当设置`'sideEffects': false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`'./something'`

3. webpack5能处理对Commonjs的tree shaking

#### Output

webpack 4 默认只能输出ES5代码

webpack 5 开始新增一个属性`output.ecmaVersion`，可以生成ES5和ES6/ES2015代码

如：`output.ecmaVersion: 2015`

#### SplitChunk
```javascript
// webpack 4
miniSize: 30000;

// webpack 5
miniSize: {
    javascript: 30000,
    style: 50000
}
```

#### Caching
```javascript
// 配置缓存
cache: {
    // 磁盘存储
    type: "filesystem",
    buildDependencies: {
        // 当配置修改时，缓存失效
        config: [__filename]
    }
}
```
缓存将存储到`node_modules/.cache/webpack`

#### 监视输出文件

之前webpack总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

#### 默认值

* `entry: "./src/index.js"`
* `output.path: path.resolve(__dirname, "dist")`
* `output.filename: "[name].js`
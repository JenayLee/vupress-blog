# Flutter

Flutter是Google开发的移动UI框架，用以构建iOS和Android上通用的原生用户界面。Flutter和现有的React Native和weex的区别是Flutter不需要js引擎，不需要桥接，运行的就是原生代码，所以速度很快，多端适配也很容易。Flutter不需要js引擎是因为它是用dart语言编写的，dart语法和JavaScript很相像。

## 移动开发技术

跨平台框架(指Android和IOS两个平台)，根据其原理，主要分为三类：

- H5+原生(Cordova、Ionic、微信小程序)
- JavaScript开发+原生渲染(React Native、Weex、快应用)
- 自绘+原生(QT for mobile、Flutter)

### H5+原生混合开发

这类框架主要原理是将APP的一部分需要动态变动的内容通过H5来实现，通过原生的网页
加载控件WebView(Android)和WKWebView(IOS)来加载。
采用混合模式开发的APP即为`混合应用`或`Hybrid APP`。

WebView实质上就是一个浏览器内核，其JavaScript依然运行在一个权限受限的沙箱中，
所以对于大多数系统能力都没有访问权限，如无法访问文件系统、不能使用蓝牙等。
所以对于H5不能实现的功能，都需要原生去做。

混合框架一般都会在原生代码中预先实现一些访问系统能力的API，然后暴露给WebView以供
JavaScript调用，这样一来，WebView就成为了JavaScript与原生API之间通信的桥梁，主要
负责JavaScript与原生之间传递调用信息，而消息的传递必须遵守一个标准的协议，他规定了
消息的格式与含义，我们把依赖于WebView的用于在JavaScript与原生之间通信并实现了某种
消息传输协议的工具称之为`WebView JavaScript Bridge`，简称`JSBridge`，它也是混合
框架的核心。

### React Native和Weex

React Native是React在原生移动应用平台的衍生产物，React中虚拟DOM最终会映射为浏览器DOM树。而RN中虚拟DOM会通过JavaScriptCore映射为原生控件树。

JavaScriptCore是一个JavaScript解释器，它在React Native中主要有两个作用：

1. 为JavaScript提供运行环境

2. 是JavaScript与原生应用之间通信的桥梁，作用和JSBridge一样，事实上，在IOS中，很多JSBridge的实现都是基于JavaScriptCore。

而RN中虚拟DOM映射为原生控件的过程中分两步：

1. 布局消息传递；将虚拟DOM布局信息传递给原生

2. 原生根据布局信息通过对应的原生控件渲染控件树

### Flutter和QT mobile

Flutter和QT mobile一样都没有使用原生控件，相反都实现了一个自绘引擎，使用自身的布局、绘制系统。

### 对比

从框架角度对移动开发中三种跨平台技术比较如下：

技术类型 | UI渲染方式 | 性能 | 开发效率 | 动态化 | 框架代表
---|---|---|---|---|---|
H5+原生 | WebView渲染 | 一般 | 高 | 支持 | Cordova、Ionic
JavaScript+原生渲染 | 原生控件渲染 | 好 | 高 | 支持 | RN、Weex
自绘UI+原生 | 调用系统API渲染 | 好 | Flutter高、QT低 | 默认不支持 | QT、Flutter

动态化主要指是否支持动态下发代码和是否支持热更新。

## Dart和JavaScript对比

#### 1. 开发效率高

Dart运行时和编译器支持Flutter的两个关键特性的组合：

`基于JIT的快速开发周期`：flutter在开发阶段采用，采用JIT模式，这样避免了每次改动都要进行编译，极大的节省了开发时间。

`基于AOT的发布包`：flutter在发布时可以通过AOT生成高效的ARM代码以保证应用性能。而JavaScript则不具有这个能力。

#### 2. 高性能

Flutter旨在提高流畅、高保真的UI体验。为了实现这一点，Flutter中需要能够在每个动画帧中运行大量的代码。这意味着需要一种既能提供高性能的语言，而不会出现会丢帧的周期性暂停，而Dart支持AOT，在这一点上可以做的比JavaScript好。

#### 3. 快速内存分配

Flutter框架使用函数式流，这使得它在很大程度上依赖于底层的内存分配器。当然Chrome V8的JavaScript引擎在内存分配上已经做得很好，而Dart也正好满足。

#### 4. 类型安全

由于Dart是类型安全的语言，支持静态类型检测，所以可以在编译前发现一些类型的错误，并排除潜在问题。而JavaScript是一个弱类型语言，给JavaScript代码添加静态类型检测的扩展语言和g工具有微软的TypeScript和Facebook的Flow。

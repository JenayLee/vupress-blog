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
---|---|--|---|---|---|
H5+原生 | WebView渲染 | 一般 | 高 | 支持 | Cordova、Ionic
JavaScript+原生渲染 | 原生控件渲染 | 好 | 高 | 支持 | RN、Weex
自绘UI+原生 | 调用系统API渲染 | 好 | Flutter高、QT低 | 默认不支持 | QT、Flutter

动态化主要指是否支持动态下发代码和是否支持热更新。

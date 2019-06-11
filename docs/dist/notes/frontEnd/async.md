# 异步编程

JavaScript是`单线程`工作，也就是只有一个脚本执行完成后才能执行下一个脚本，
两个脚本不能同时执行，如果某个脚本耗时很长，后面的脚本都必须排队等着，
会拖延整个程序的执行，那么如何让程序可以多线程工作呢？，以下为几种异步编程
方式的总结：

* 回调函数
* 事件监听
* 发布订阅模式
* promise
* Generator(ES6)
* async(ES7)

异步编程传统的解决方案是：`回调函数`和`事件监听`。

初始示例：假设有两个函数，f1和f2，f1是一个需要一定时间的函数。

``` javascript
function f1() {
  setTimeout(function(){
    console.log('先执行f1')
  }, 1000)
}
function f2() {
  console.log('再执行f2')
}
```

## 回调函数

因为f1是一个需要一定时间的函数，所以可以将f2写成f1的`回调函数`，将同步操作变成异步操作，
f1不会阻塞程序的运行，f2也无需空空等待，例如jQuery的ajax。

回调函数的demo：

``` javascript
function f1(f2) {
  setTimeout(function(){
    console.log('先执行f1')
  },1000)
  f2()
}
function f2() {
  console.log('再执行f2')
}
```

总结：回调函数易于实现、便于理解，但是多次回调会导致代码高度耦合

## 事件监听

脚本的执行不取决代码的顺序，而取决于某一个事件是否发生。

``` javascript
$(document).ready(function(){
  console.log('DOM 已经ready')
})
```

## 发布订阅模式

发布/订阅模式是利用一个消息中心，发布者发布一个消息给消息中心，订阅者从消息中心
订阅该消息。类似于vue的父子组件之间的传值。

``` javascript
// 订阅done事件
$('#app').on('done', function(data){
  console.log(data)
})
// 发布事件
$('#app').trigger('done', 'haha')
```

## Promise

Promise实际就是一个对象，从它可以获得异步操作的消息，Promise对象有三种状态，
pending(进行中)、fulfilled(已成功)和rejected(已失败)。Promise的状态一旦改变
之后，就不会在发生任何变化，将回调函数变成了链式调用。

Promise封装异步请求demo：

``` javascript
export default function getMethods(url){
  return new Promise(function(resolve, reject){
    axios.get(url).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

getMethods('/api/xxx').then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
```

## Generator

Generator函数是一个状态机，封装了多个内部状态。执行Generator函数会返回一个遍历器对象，
使用该对象的next()方法，可以遍历Generator函数内部的每一个状态，直到return语句。

形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名
之间有一个星号；二是，函数体内部使用yield表达式，yield是暂停执行的标记。

next()方法遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，
作为返回对象的value属性值。

``` javascript
function *generatorDemo() {
  yield 'hello';
  yield 1 + 2;
  return 'ok';
}
var demo = generatorDemo()

demo.next() // { value: 'hello', done: false }
demo.next() // { value: 3, done: false }
demo.next() // { value: 'ok', done: false }
demo.next() // { value: undefined, done: true }
```

## async

async函数返回的是一个Promise对象，可以使用then方法添加回调函数，async函数内部
return语句返回的值，会成为then方法回调函数的参数。当函数执行的时候，一旦遇到
await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

await命令后面返回的是Promise对象，运行结果可能是rejected，所以最好把await命令
放在try...catch代码块中。

``` javascript
async function demo() {
  try {
    await new Promise(function(resolve, reject){
      // something
    })
  } catch(err) {
    console.log(err)
  }
}

demo().then(data => {
  console.log(data)
})
```

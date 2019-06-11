# 优化

## 图片加载卡顿优化

#### 1. 懒加载

常见的图片懒加载是指加载时只渲染屏幕可见区域及周围的图片，当页面滚动时再加载需要显示的图片。

#### 2. 缩略图+预加载+懒加载

当用户滚动图片时，改变下一站预渲染的图片为用户可见区域的第一张，对图片进行逐个的预加载，
但用户的滚动条匀速直线不停的往下运动时，效果依然很差。而结合使用缩略图，性能几乎可以满足用户需求。

## 前端性能优化

#### 1. 使用局部变量

查找变量会从作用域链的顶端开始一层一层的向下找。显然，查找的层数越多，花费的时间越多。
所以为了提高查找的速度，应该尽量使用局部变量(到目前为止，局部变量是JavaScript读写最快的标识符)。

``` javascript
(function(window, undefined){
  var jQuery = function(){}
  // ...
  window.jQuery = window.$ = jQuery;
})(window);
```

这样写的优势：

- window和undefined都是为了减少变量查找所经过的scope作用域。
当window通过传递给闭包内部之后，在闭包内部，可以把它当成一个局部变量使用，
显然比window scope(作用域链最顶端)下查找快一些。
- 在jQuery压缩版本的jquery.min.js中可以将局部变量window替换成单个字母，
减少文件大小，提高加载速度`(function(e,undefined){ var t,n,r=typeof undefined,i=e.location,o=e.document`。
- undefined也是JavaScript种的全局属性。将undefined作为参数传递给闭包，因为没给它传递值，它的值就是undefined，这样闭包内部在使用它的时候就可以把它当做局部变量使用，从而提高查找速度。undefined并不是JavaScript的保留字或关键字。
- undefined在某些低版本浏览器(IE8及以下)中值是可以被修改的(在ECMAScript中，
undefined是可读/写的变量，可以给它赋任意值，这个错误在ECMAScript5中做了修正)，
将undefined作为参数并且不给它传值可以防止因undefined的值被修改而产生的错误。

#### 2. 避免增长作用域链

在JavaScript中，有两种语句可以临时增加作用域链：with、try-catch
with可以使对象的属性可以像全局变量来使用，它实际上是将一个新的变量对象添加到执行环境
作用域的顶部，这个变量对象包含了指定对象的所有属性，因此可以直接访问。
这样看似很方便，但是增长了作用域链，原来函数中的局部变量不在处于作用域链的顶端，
因此在访问这些变量的时候要查找到第二层才能找到它。当with语句块结束后，作用域链将回到原来的状态。鉴于with的这个缺点，所以不推荐使用。
try-catch中的catch从句和with类似，也是在作用域链的顶端增加了一个对象，该对象包含了由catch指定命名的异常对象，但是因为catch语句只有错误的时候才执行，因此影响比较少。

#### 3. 字符串连接优化

由于字符串是不可变的，多以在进行字符串连接时，需要创建临时字符串。频繁创建、销毁临时字符串会导致性能低下。IE8+中该问题得到了优化，在低版本浏览器中，可以用数组的join来代替。

#### 4. 条件判断

条件分支层数比较深时，switch性能比if会更好。或者使用数组。其他方面的优化，譬如：

``` javascript
if(condition1) {
  return v1
} else {
  return v2
}
// 改成
if(condition1) {
  return v1
}
return v2
```

#### 5. 快速循环

- 循环总次数使用局部变量

``` javascript
var divList = document.getElementsBtTagName('div'), len = divList.length;
for(var i=0; i<len; i++){

}
// 这样写避免了每次循环的属性查找
```

- 如果可以，递减代替递增

``` javascript
for(var i=0; i<len; i++) {

}
// 改成
for(var i=len-1;i--;){

}

var i=0;
while(i<len) {
  i++;
}
// 改成
var i = len-1;
while(i--){

}
// i=0时会直接跳出，循环次数比较多时还是很有用的
```

#### 6. 高效存取数据

JavaScript中4种地方可以存取数据：字面量值；数组元素；变量；对象属性。
字面量值和变量中存取数据是最快的，从数组元素和对象属性中存取数据相对较慢，并且
随着深度增加，存取速度会越来越慢，譬如obj.item.value就比obj.item慢。
某些情况下我们可以将对象、数组属性存成局部变量来提高速度，例如：

``` javascript
for(var i=0;i<arr.length;i++){

}
// 改成
var len = arr.length;
for(var i=0;i<len;i++){

}
```

``` javascript
var divList = document.getElementsBtTagName('div');
for(var i=0;i<divList.length;i++){

}
// 改成
var divList = document.getElementsBtTagName('div');
for(var i=0,len = divList.length;i<len;i++){

}
```

#### 7. 事件委托

事件委托就是利用冒泡的原理，将原本应该添加在某些元素身上的监听事件，添加到其父元素身上，
来达到提高性能的效果。

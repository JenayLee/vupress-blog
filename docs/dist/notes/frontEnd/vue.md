# Vue

## 响应式原理

当一个Vue实例创建时，vue会遍历data选项的属性，用`Object.defineProperty`将他们转为getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。

每个组件实例都有相应的watcher程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。
![watcher](/JenayLee/images/watcher.jpg)

## 状态共享

随着组件的细化，就会遇到多组件状态共享的情况，`Vuex`当然可以解决这类问题，不过就像`Vuex`官方文档所说，如果应用不够大，为避免代码繁琐冗余，最好不要使用它。而vue.js2.6
新增加的Observable API，可以应对一些简单的跨组件数据状态共享的情况。

如下例子，我们将在组件外创建一个`store`，然后在`App.vue`组件里使用store.js提供的`store`和`mutation`方法，同理其他组件也可以这样使用，从而实现多个组件共享数据状态。

首先创建一个store.js，包含一个`store`和`mutations`，分别用来指向数据和处理方法。

``` javascript
 import Vue from "vue";
 export const store = Vue.observable({ count: 0});
 export const mutations = {
   setCount(count) {
     store.count = count;
   }
 }
```

然后在`App.vue`里面引入这个store.js，在组件里面使用引入的数据和方法

``` html
 <template>
  <div id="app">
    <img width="25%" src="./asstes/logo.png">
    <p>count: {{count}}</p>
    <button @click="setCount(count+1)">+1</button>
    <button @click="setCount(count-1)">-1</button>
  </div>
 </template>
 <script>
  import { store, mutations} from './store';
  export default {
    name: "App",
    computed: {
      count() {
        return store.count;
      }
    },
    methods: {
      setCount: mutations.setCount
    }
  }
 </script>
```

## 长列表性能优化

我们应该都知道`vue`会通过`object.defineProperty`对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要`vue`来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止`vue`劫持我们的数据呢？可以通过`object.freeze`方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

``` javascript
export default {
  data: () => ({
    user: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
}
```

另外需要说明的是，这里只是冻结了`users`的值，引用不会被冻结，当我们需要`reactive`数据的时候，我们可以重新给`users`赋值。

``` javascript
export default {
  data: ()=> ({
    users: {}
  }),
  aysnc created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  },
  methods: {
    // 改变值不会触发视图响应
    this.data.users[0] = newValue;
    // 改变引用依然会触发视图响应
    this.data.users = newArray;
  }
}
```

## 作用域插槽

利用好作用域插槽可以做一些很有意思的事情，比如定义一个基础布局组件A，只负责布局，
不管数据逻辑，然后另外定义一个组件B负责数据处理，布局组件A需要数据的时候就去B里面
取。假设，某一天我们的布局变了，我们只需要去修改组件A就行，而不用去修改组件B，从而
就能充分复用组件B的数据处理逻辑。案例如下：

这里涉及到一个最重要的点就是父组件要去获取子组件里面的数据，之前是利用`slot-scope`，
自vue2.6.0起，提供了更好的支持`slot`和`slot-scope`特性的API替代方案。

比如，我们定一个名为current-user的组件:

``` html
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

父组件引用`current-user`的组件，但想用名替代姓:

``` html
<current-user>{{ user.firstName }}</current-user>
```

这种方式不会生效，因为`user`对象是子组件的数据，在父组件里面我们获取不到，这个
时候我们就可以通过`v-slot`来实现。
首先在子组件里面，将`user`作为一个`<slot>`元素的特性绑定上去：

``` html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

之后，我们就可以在父组件引用的时候，给`v-slot`带一个值来定义我们提供的插槽prop的
名字：

``` html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName}}
  </template>
</current-user>

<!--缩写-->
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName}}
</current-user>
```

## 属性事件传递

写过高阶组件的可能都会碰到过将加工过的属性向下传递的情况，如果碰到属性较多时，
需要一个个去传递，非常不友好并且费时，有没有一次性传递的呢(比如react里面的
`{...this.props}`)?答案就是`v-bind`和`v-on`。

举个例子，假如有一个基础组件`BaseList`，只有基础的列表展示功能，现在我们想在
这基础上增加排序功能，这个时候我们就可以创建一个高阶组件`SortList`。

``` html
<!-- SortList -->
<template>
  <BaseList v-bind='$props' v-on='$listeners'>
    <!-- ... -->
  </BaseList>
</template>
<script>
  import BaseList from './BaseList';
  // 包含了基础的属性定义
  import BaseListMixin from './BaseListMixin';
  // 封装了排序的逻辑
  import sort from './sort.js';

  export default {
    props: BaseListMixin.props,
    components: {
      BaseList
    }
  }
</script>
```

可以看到传递属性和事件的方便性，而不用一个个去传递

## 函数式组件

函数式组件，既无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性
能高，特别适合用来只依赖外部数据传递而变化的组件。

写法如下：

1. 在`template`标签里面标明`functional`
2. 只接受`props`值
3. 不需要`script`标签

``` html
<!-- App.vue -->
<template>
  <div id="app">
    <List :items="['Wonderwoman', 'Ironman']"
          :item-click="item=>(clicked=item)"/>
    <p>Clicked hero: {{ clicked }}</p>
  </div>
</template>
<script>
  import List from "./List";
  export default {
    name: "App",
    data: () => ({ clicked: ""}),
    components: { List }
  }
</script>
```

``` html
<!-- List.vue 函数式组件 -->
<template functional>
  <div>
    <p v-for="item in props.items" @click="props.itemClick(item)">
      {{item}}
    </p>
  </div>
</template>
```

## 监听组件的生命周期

比如有父组件`Parent`和子组件`Child`，如果父组件监听到子组件挂载`mounted`就做
一些逻辑处理，常规的写法可能如下：

``` html
<!-- Parent.vue -->
<Child @mounted="doSomething"/>

<!-- Child.vue -->
mounted() {
  this.$emit("mounted");
}
```

这里提供一种特别简单的方式，子组件不需要任何处理，只需要在父组件引用的时候通过
`@hook`来监听即可，代码重写如下：

``` html
<Child @hook:mounted="doSomething"/>
```

当然这里不仅仅是可以监听`mounted`,还包括其他的生命周期事件，例如：`created`,`updated`等。
>>>>>>> c14882ea3d92e105207c962a4fc7b69a718f5795

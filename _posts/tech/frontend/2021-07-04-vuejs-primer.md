---
layout: post
title: Vue.js简明教程
date: 2021-07-04 12:05:07 +0800
categories: [艺搜科技,编程]
tags: [Vue.js]
---

https://cn.vuejs.org/v2/guide/

```
var app = new Vue({
 el: '#app',  #el 表示挂载绑定的html元素
```

## 元素属性绑定

元素的属性，可以用v-bind绑定

缩写，可以不用前面的v-bind，如:href=

```
<a v-bind:href="url">点我</a>
<a :href="url">点我</a>
```

## 渲染

html页面中值的显示用2个大括号包围起来 <div id="app"> {{ message }} </div> 这些渲染的代码可以放在单文件组件的template元素里面

## 条件判断

v-if，如果想用v-if同时控制多个html元素，可将这些html元素放在一个<template>元素里面，如

```
<template v-if="ok">
```

在组件上用v-for（key是必须存在的） :

```
<my-component v-for="item in items" :key="item.id"></my-component>
```

v-for 还支持一个可选的第二个参数，即当前项的索引。

也可以将第2个参数作为键名

用第三个参数作为索引

## 事件

```
<a v-on:click="doSomething">执行事件</a>  可以@click缩写
<a @click="doSomething">...</a>
```

会执行在methods中定义的事件函数

## 向组件传递数据

用props，包括向嵌套的子组件传递数据也是用props

```
<blog-post
 v-for="post in posts"
 v-bind:key="post.id"
 v-bind:post="post"
></blog-post>
```

其中blog-post是一个组件，post是一个对象：

```
props: ['post'],    在props中的变量不要用驼峰命名，可以用my_data这种形式。
```

https://cn.vuejs.org/v2/guide/components.html

不带参数的v-bind，可以传递一个对象的所有属性，下面假设有id和title2个属性：

```
<blog-post v-bind="post"></blog-post>
```

等价于：

```
<blog-post
 v-bind:id="post.id"
 v-bind:title="post.title"
></blog-post>
```

https://cn.vuejs.org/v2/guide/components-props.html

## 给组件传一个数组

```
<elesos-component :my_data='@json($tag_name_arr)'></elesos-component>
```

其中的my_data是在props里面声明的变量。

## 其它

如何给button 绑定事件，并获取button的值：

```
<el-button v-for="(value, name, index) in my_data" v-bind:value="name" @click="process_click(name)" type="success" plain>{{name}}{{value}}</el-button>
```

声明变量

```
props: ['my_data'],
```

事件函数

```
process_click:function (name) {
               console.log(name);            
}
```

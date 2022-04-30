---
layout: post
title: Laravel 快速上手
date: 2022-04-30 05:30:00 +0800
categories: [Laravel]
tags: [Laravel]
---
路由：routes/web.php

## 搭建认证系统
```
composer require laravel/ui
php artisan ui vue --auth   #生成vue版的
npm install 
npm run dev 
php artisan migrate #建立用户表
php artisan migrate:rollback  //如果出错就回滚
```
现在系统就有了登录和注册功能了。

数据库操作流程
```
php artisan make:controller PostController
php artisan make:model Post
```
这个Post默认对应表posts，如果你的表名不是这种复数形式，就需要

protected $table = 'article_house';// 与模型关联的表名 
默认还需要表有created_at 和 updated_at 这2个列，如果没有

public $timestamps = false;
## 添加路由
```
//添加认证路由， 给路由添加中间件auth
//给路由命名，方便以后生成url或重定向
Route::get('/post', 'PostController@article_auth')->middleware('auth')->name('finance_auth');
```
## 使用组件
在resources\js\components里面新建一个User.vue

在app.js里面注册
```
Vue.component('user-component',  require('./components/User').default);
```
使用Element 组件库(https://element.eleme.cn/#/zh-CN/component/quickstart)

npm i element-ui -S           #就是--save,--save选项表示将信息写到package.json的dependencies节点中
npm i element-ui --save-dev   #--save-dev 将保存到devDependencies节点。https://docs.npmjs.com/cli/install
在app.js里面引入Element
```
 
 import ElementUI from 'element-ui';
 import 'element-ui/lib/theme-chalk/index.css';
 Vue.use(ElementUI);

 new Vue({
    el: '#app' 
 });
```
下面我们只要随便复制一些 element-ui 组件的代码，放到vue 文件中就行了

修改了组件代码，需要npm install && npm run dev

## 问题
* 页面加载js和css文件404
原因是没有运行npm install和npm run dev
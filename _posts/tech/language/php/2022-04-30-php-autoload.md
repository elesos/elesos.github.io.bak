---
layout: post
title: Php 类的自动加载
date: 2022-04-30 05:30:00 +0800
categories: [PHP]
tags: [PHP]
---
通过 spl_autoload_register() 函数可以注册任意数量的自动加载器

使用时自动去加载。

尝试从 MyClass1.php 和 MyClass2.php 文件中加载 MyClass1 和 MyClass2 类

 
<?php
spl_autoload_register(function ($class_name) {
    require_once $class_name . '.php';
});

$obj  = new MyClass1();
$obj2 = new MyClass2();
## 附
* 匿名函数
也叫闭包函数，临时的创建一个没有指定名称的函数。

* use关键字用法
继承变量
```
 
<?php
$message = 'hello';

// 没有 "use"
$example = function () {
    var_dump($message);//值未定义
};
echo $example();

// 继承 $message
$example = function () use ($message) {
    var_dump($message);
};
echo $example();
```
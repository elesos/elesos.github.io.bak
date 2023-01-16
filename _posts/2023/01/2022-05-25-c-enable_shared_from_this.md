---
layout: post
title: C++特性：enable_shared_from_this
date: 2022-05-25 22:30:00 +0800
categories: [c]
tags: [c]
---


模板类

能让一个对象（假设其名为 t ，已被一个 std::shared_ptr 对象 pt 管理）安全地生成其他额外的 std::shared_ptr 实例（假设名为 pt1, pt2, ... ） ，它们与 pt 共享对象 t 的所有权。

若一个类T继承 std::enable_shared_from_this<T> ，则会为该类 T 提供成员函数： shared_from_this 。

当T类型对象 t 被一个为名为 pt 的 std::shared_ptr<T> 类对象管理时，
调用 T::shared_from_this 成员函数，会返回一个新的 std::shared_ptr<T> 对象，它与 pt 共享 t 的所有权。

异步函数可能会使用到异步调用之前就存在的变量。为了保证该变量在异步函数执期间一直有效，

我们可以传递一个指向自身的share_ptr给异步函数，这样在异步函数执行期间share_ptr所管理的对象就不会析构，所使用的变量也会一直有效了


It enables you to get a valid shared_ptr instance to this, when all you have is this. 

https://blog.csdn.net/caoshangpa/article/details/79392878
https://stackoverflow.com/questions/712279/what-is-the-usefulness-of-enable-shared-from-this
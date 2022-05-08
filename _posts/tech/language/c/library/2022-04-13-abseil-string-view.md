---
layout: post
title: abseil系列2 string_view介绍
date: 2022-04-13 23:30:00 +0800
categories: [abseil]
tags: [abseil]
---

C++17 标准中已经将string_view 加入到了标准库中。

类似string.

由于 string_view 不持有底层数据，string_view 的有效生命期只能依赖于底层数据的生命期，当底层数据不存在时，string_view 也就失效了，此时再使用 string_view 很可能出错。例如把函数的返回值赋值给 string_view 通常不是一个好的做法，因为这种情形下很容易出现生命期问题：
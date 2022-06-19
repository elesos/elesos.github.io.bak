---
layout: post
title: Qt和Electron的区别
date: 2021-07-02 22:12:31 +0800
categories: [艺搜科技,编程]
tags: [qt]
---

Qt适合一些性能要求高的桌面应用，比如你要做个类似绘声绘影的视频编辑器，那你用electron要么是没法做，要不就是体验非常烂。

Electron适合一些偏业务的应用，对性能没有很多要求，主要是业务逻辑和UI展示，比较轻量级的应用。

也可以QtWidgets + libcef + 若干 C++ 第三方库。



# Chromium Embedded Framework CEF

https://github.com/chromiumembedded/cef


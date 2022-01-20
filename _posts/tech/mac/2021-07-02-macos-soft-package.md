---
layout: post
title: MacOS 软件打包问题
date: 2021-07-02 21:31:21 +0800
categories: [艺搜科技,编程]
tags: [mac]
---

编译的python打包时提示:bundle format unrecognized, invalid, or unsuitable

In subcomponent lib/python3.8

需要对每一个库都签名.

```
codesign --force --verify --verbose --sign "Apple Development: xxx" xxx.app
```

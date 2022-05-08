---
layout: post
title: IOS开发，用Storyboard或xib做界面，还是用代码写界面
date: 2022-05-02 05:30:00 +0800
categories: [ios]
tags: [ios]
---
个人开发的话建议使用Storyboard

团队开发的话Storyboard就不是很方便啦，还是XIB或者代码比较适合！

iOS5之后Apple提供了一种全新的方式来制作UI，那就是StoryBoard。简单理解来说，可以把StoryBoard看做是一组viewController对应的xib，以及它们之间的转换方式的集合。在StoryBoard中不仅可以看到每个ViewController的布局样式，也可以明确地知道各个ViewController之间的转换关系。相对于单个的xib，其代码需求更少，也由于集合了各个xib，使得对于界面的理解和修改的速度也得到了更大提升。

storyboard：大家可以理解为是升级版的xib，可以同时管理多个xib文件并处理场景与场景之间的跳转。


storyboard+纯代码

一般都是两者结合

界面的大体布局用Storyboard/xib，如果界面复杂，内部的小细节会用纯代码

Storyboard/xib不便于团队合作，容易冲突，而且处理起来很麻烦
---
layout: post
title: Qt 示例解析
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [qt]
---
基于6.2.1 官方示例

Next

https://doc.qt.io/qt-6/qtconcurrent-imagescaling-example.html
QFuture class represents the result of an asynchronous computation.
QPromise class provides a way to store computation results to be accessed by QFuture
异步下载




8，Tablet Example

QTabletEvent ：Qt will first send a tablet event, then if it is not accepted by any widget, it will send a mouse event. 



7，Touch Dials Example

触摸事件 https://doc.qt.io/qt-6/qtouchevent.html#details

6.Touch Knobs Example

触摸事件，需要根据widget和graphics items分别设置下属性setAttribute(Qt::WA_AcceptTouchEvents);或  setAcceptTouchEvents(true);

不是笔记本的触摸板



5.Scribble Example 画图应用

菜单的使用addAction，事件处理，获取鼠标位置 

初始化时将图片设置比窗口大，避免调整窗口大小时也调整图片的大小，update部分重绘

Finger Paint Example：跟这个示例功能差不多，但用的是touch screen触摸事件



4，Getting Started Programming with Qt Widgets 实现一个记事本

用到文本文件读写



3，Calculator Example

```
const char *member接收SLOT(pointClicked()
```

 which button sent the signal using [QObject::sender](https://doc.qt.io/qt-6/qobject.html#sender)().

 MC=clearMemory
 MR=readMemory
 MS=setMemory
 M+=addToMemory



2，Mouse Button Tester  鼠标事件


1.2  Analog Clock Window Example

设置了timer,调renderLater，最后到renderNow

关联类Raster Window Example ： QBackingStore用于管理window


1.1，Analog Clock Example

QPainter的使用

y坐标向下部分为0->200

先平移到（100，100），scale变大变小。

用3个点画了一个3角形，刚开始指向12点

12小时，一小时为30度，旋转的是坐标系统。所以每次点不变。


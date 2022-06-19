---
layout: post
title: Qt QSS使用
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [qt]
---

https://blog.csdn.net/u010780613/article/details/50510581

简单来说，每个qss语句由`选择器`和一条或者多`申明`构成，每条`申明`都是`键值对`的形式，`键`是`选择器`的`属性`，`值`是对这个属性的`设置`。选择器放在`{}`外面，生命在`{}`里面，不同是声明设置之间用`;`隔开。声明的键和值之间用`:`分隔。

```text
selector {declaration1; declaration2; ... declarationN }
```

可以多个选择器对应一个申明语句 选择器之间用逗号隔开。

```text
QPushButton,QLabel,QLineEdit {color:#222; background-color:#fff;}
```

https://doc.qt.io/qt-5/stylesheet-reference.html


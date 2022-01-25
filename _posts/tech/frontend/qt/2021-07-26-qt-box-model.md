---
layout: post
title: Qt box model
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [Qt]
---
https://doc.qt.io/qt-5/stylesheet-customizing.html#the-box-model



QFrame是基本控件的基类，QWidget是QFrame基类。



x()：左上角的坐标，geometry.x()：不包括标题栏、边框的客户区，frameGeometry.x()：左上角的坐标

width()：客户区的宽度，geometry.width()：客户区的宽度

frameGeometry.width()：窗口真正的宽度（包括边框和标题栏）



QApplication::desktop()->availableGeometry 可以获取可操作区域


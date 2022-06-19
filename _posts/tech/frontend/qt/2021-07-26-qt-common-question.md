---
layout: post
title: Qt 常见问题
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [qt]
---



2.Project ERROR: Unknown module(s) in QT: winextras

https://github.com/qt/qtwinextras



1，class QWheelEvent' has no member named 'delta'

https://stackoverflow.com/questions/66268136/how-to-replace-the-deprecated-function-qwheeleventdelta-in-the-zoom-in-z

use  event->angleDelta().y()


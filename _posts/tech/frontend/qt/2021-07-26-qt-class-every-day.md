---
layout: post
title: 一天一个Qt类
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [Qt]
---


#### QComboBox 

by default a [QStandardItemModel](https://doc.qt.io/qt-5/qstandarditemmodel.html) stores the items and a [QListView](https://doc.qt.io/qt-5/qlistview.html) subclass displays the popuplist. 

将这个QListWidget设置为QComboBox的View，而将QListWidget的Model设置为QComboBox的Model



QStackedWidget 显示一个界面，常与tab搭配使用

QButtonGroup将相同功能的按键，设为一个分组，然后可以进行 单选 或 多选

QToolButton用在QToolBar里面，只显示图标，QToolButton的一种经典用法是选择工具。例如，绘图程序中的“笔”工具。就是工具栏上面那些按钮。

#### QListView和QListWidget的区别

QListView是基于Model，而QListWidget是基于Item，往QListView中添加条目需借助QAbstractListModel，而在QListWidget中添加条目可以直接additem

QListWidget继承于QListView


#### QGraphicsItem

实现自己的，要实现2个方法

QGraphicsScene ，used together with [QGraphicsView]

1，创建继承自**QGraphicsView**的窗口

2，创建继承自**QGraphicsScene**的画布

3、将画布设置给View窗口QGraphicsView::setScene(self.scene)

4，在画布Scene上添加元素：自定义item，继承自**QGraphicsItem**该类，并通过QGraphicsScene::addItem(item)的方法将item添加到画布


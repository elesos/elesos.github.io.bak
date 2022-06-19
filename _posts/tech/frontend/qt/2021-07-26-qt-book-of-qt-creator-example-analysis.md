---
layout: post
title: 《Qt creator快速入门》 示例解析
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [qt]
---
2.2.2

qt发布时需要复制libgcc_s_seh-1.dll,libstdc++-6.dll,libwinpthread-1.dll和qwindows.dll(放在platforms目录下)

2.2.3 

设置应用程序图标

3  
有QWidget类图

3.1.2 

![](/assets/book/qt_position.png)


## 示例 
8.

11-01\myscene



7，

10-01\mydrawing

```
drawArc
```

角度需要用度数*16， 0度指向3时，角度为正时逆时针。

文字渐变

6.

06-08\myeventfilter

为何要实现事件过滤器

this表示要在本部件 中监视textEdit和spinBox的事件，在eventFilter中截获并处理 2个子部件的事件。返回true表示已处理，不希望再被处理。

如果不用事件过滤器，就需要子类化2个部件，然后实现对应的事件处理函数才行。《Qt Creator快速入门》P129

```
  QKeyEvent myEvent(QEvent::KeyPress,Qt::Key_Up,Qt::NoModifier);
```

表示一个向上方向键被按下的事件



5.

06-05\mykeyevent

4，

06-04\mykeyevent

键盘事件

3.06-03\mymouseevent

```
//鼠标移动事件默认按下鼠标按键移动后才会 触发，
 //如果需要不按鼠标按键也可以触发移动事件就需要在构造函授添加
  //代码：setMouseTracking(true);
```

全屏处理



2，

06-02\myevent

子类实现event和keyPressEvent，父类添加eventFilter处理函数，并在构造函数中给子类安装installEventFilter

event.png

顺序：先是eventFilter，然后是焦点部件的event,然后是焦点部件的事件处理函数，比如keyPressEvent。





事件：可以被QObject子类接收和处理，5种处理事件的方法：

1，重新实现paintEvent等事件处理函数

2，重新实现notify,   page116 《Qt Creator快速入门》

3，向QApplication安装事件过滤器

4，重新实现event函数

5，在对象上安装事件过滤器，比如widge含有一个lineEdit，则lineEdit->installEventFilter(this)表示在widget上为lineEdit安装事件过滤器。一般用于拦截。

常用1和5


1，

06-01\myevent

```
 event->ignore(); 
```

如果忽略就会传递到父对象。

![](/assets/book/event.png)
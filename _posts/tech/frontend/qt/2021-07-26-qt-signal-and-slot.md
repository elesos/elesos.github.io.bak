---
layout: post
title: Qt 信号与槽
date: 2021-07-26 11:21:13 +0800
categories: [艺搜科技,编程]
tags: [Qt]
---


```
connect(sender, SIGNAL(signal()), receiver, SLOT(slot()));
```

- 一个信号可以连接多个槽
- 一个信号可以连接另外一个信号

```
connect(spinNum, SIGNAL(valueChanged(int)), this, SIGNAL (refreshInfo(int));
```

- 信号与槽的参数个数和类型需要一致

所谓信号槽，实际就是观察者模式。

### 在UI界面上关联信号与槽

ui中选中比如一个 chkBoxUnder 组件，右键调出其快捷菜单。在快捷菜单中单击菜单项“Go to slot…”



头文件声明的函数名上面，右键，选择“Refactor重构”→“Add Definition in elesos.cpp”，就可以自动在cpp中生成定义。



在 UI 设计器里，单击上方工具栏里的“Edit Signals/Slots”按钮，窗体进入信号与槽函数编辑状态

将鼠标移动到按钮上方，再按下鼠标左键，移动到窗体的空白区域释放左键，这时出现信号与槽的关联设置对话框。左侧的列表框里信号，右边的列表框里显示了槽函数（如果没有显示，把复选框勾选上）。

http://c.biancheng.net/view/1822.html

https://www.cnblogs.com/schips/p/framework-cpp-qt-02-ui-layout-manage.html

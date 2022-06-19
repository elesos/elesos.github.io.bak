---
layout: post
title: C语言中volatile关键字的作用
date: 2022-04-30 05:30:00 +0800
categories: [c]
tags: [c]
---
volatile:禁止优化

volatile本意是“易变的” ，用volatile声明的变量表示该变量随时可能发生变化，与该变量有关的运算，不要进行编译优化，以免出错

用volatile定义的变量每次都必须从内存中读取，而不能重复使用放在cache或寄存器中的备份。

如：

 
volatile char a;
a=0;
while(!a){
//do some things;
}
doother();
如果没有 volatile， doother()不会被执行

一般供其它程序检测的变量需要加volatile；共享的标志一般也应该加volatile

## 参考
https://blog.csdn.net/tigerjibo/article/details/7427366
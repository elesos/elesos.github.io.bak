---
layout: post
title: Java 简明教程
date: 2022-05-02 05:30:00 +0800
categories: [java]
tags: [java]
---

三个不同版本：

Java SE：Standard Edition

Java EE：Enterprise Edition

Java ME：Micro Edition

这三者之间有啥关系呢？

JavaEE > Jave SE > JaveME
 ┌───────────────────────────┐
 │Java EE                                               │
 │    ┌────────────────────┐      │
 │    │Java SE                                 │      │
 │    │    ┌─────────────┐      │      │
 │    │    │   Java ME                │      │      │
 │    │    └─────────────┘      │      │
 │    └────────────────────┘      │
 └───────────────────────────┘
Java SE就是标准版，包含标准的JVM和标准库，而Java EE是企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。

Java ME就和Java SE不同，它是一个针对嵌入式设备的“瘦身版”，Java SE的标准库无法在Java ME上使用，Java ME的虚拟机也是“瘦身版”。

毫无疑问，Java SE是整个Java平台的核心，而Java EE是进一步学习Web应用所必须的。我们熟悉的Spring等框架都是Java EE开源生态系统的一部分。不幸的是，Java ME从来没有真正流行起来，反而是Android开发成为了移动平台的标准之一，因此，没有特殊需求，不建议学习Java ME。

首先要学习Java SE，掌握Java语言本身、Java核心开发技术以及Java标准库的使用；

如果继续学习Java EE，那么Spring框架、数据库开发、分布式架构就是需要学习的；

JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。

java：这个可执行程序其实就是JVM

jar：用于把一组.class文件打包成一个.jar文件，便于发布；

某个类定义的public static void main(String[] args)是Java程序的固定入口方法。

定义变量的时候，如果加上final修饰符，这个变量就变成了常量：

final double PI = 3.14; // PI是一个常量

使用var定义变量，类似c++的auto，会自动推算类型

字符串String可以用"""..."""表示多行字符串

引用类型的变量（除了基本类型外，基本都是引用类型）可以指向一个空值null，它表示不存在，即该变量不指向任何对象。例如：

String s1 = null;

数组int[] ns = new int[5];

int[] ns = { 68, 79, 91, 85, 62 };

next https://www.liaoxuefeng.com/wiki/1252599548343744/1255943455934400

https://www.liaoxuefeng.com/wiki/1252599548343744/1260454548196032
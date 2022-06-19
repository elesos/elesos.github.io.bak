---
layout: post
title: What do the numbers in a man page mean
date: 2022-05-21 05:30:00 +0800
categories: [linux]
tags: [linux]
---

当man找到一个匹配时，就不再往下找了

使用man -s 2 read， 就强制man只搜索section 2中的文件

什么是section?

Unix的man page是按照节(section)来组织的.当我们使用man ls的时候，会看到ls(1)，这个括号中的1就表示位于section 1。

 1      User Commands
 3      C Library Functions
$ man 1 printf
$ man 3 printf
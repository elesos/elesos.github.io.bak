---
layout: post
title: 查看运行程序 进程所在目录 路径
date: 2022-05-02 05:30:00 +0800
categories: [C]
tags: [C]
---
首先通过命令ps获得进程PID：如4285，然后执行下述命令

ls -l /proc/4285
其中exe所在行即为可执行文件的全路径
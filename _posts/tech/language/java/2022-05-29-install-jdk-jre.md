---
layout: post
title: 安装Java运行环境 jdk jre
date: 2022-05-29 05:30:00 +0800
categories: [java]
tags: [java]
---

下载rpm

https://www.oracle.com/java/technologies/javase-downloads.html
检验系统原版本

java -version
进一步查看JDK信息：

rpm -qa | grep java
如果之前安装过jre,需要卸载

rpm -e --nodeps jre-1.7.0_25-fcs.x86_64
否则会出现下述错误：

conflicts with file from package jre-1.7.0_25-fcs.x86_64
## 安装JDK

rpm -ivh jdk-7-linux-x64.rpm
JDK默认安装在/usr/java中。

运行javac试试
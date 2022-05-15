---
layout: post
title: Raspberry 树莓派 系统安装
date: 2022-05-15 05:30:00 +0800
categories: [艺搜科技,系统]
tags: [rpi]
---
官方系统：Raspbian，可以用NOOBS安装。

NOOBS 包含Raspbian 和LibreELEC. Raspbian 是有界面的系统，基于Debian Buster

1, https://www.sdcard.org/downloads/formatter_4/index.html
下载 SD Card Formatter 5.0.1 Setup.exe 并安装

2，解压 noobs zip并全部剪切到sd卡上
3，连上鼠标键盘显示器开机即可。
## 使用镜像安装
下载镜像

安装 Win32DiskImager 后以管理员身份运行 https://sourceforge.net/projects/win32diskimager/

Raspbian默认账号：pi 密码：raspberry

## 常用操作
开启ssh服务
systemctl enable ssh
systemctl start ssh #https://www.raspberrypi.org/documentation/remote-access/ssh/
## 参考
https://www.raspberrypi.org/downloads/


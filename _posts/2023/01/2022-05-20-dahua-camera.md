---
layout: post
title: 大华 乐橙 摄像头 相关
date: 2022-05-20 22:30:00 +0800
categories: [摄像头]
tags: [摄像头]
---




不要随便恢复出厂设置。大华如果初始化时没有预留手机号，只能通过xml导出的方式进行摄像头的密码重置。而且一次只能导出一个摄像头，导出后等待客服发结果xml才能点下一步。

大华摄像头密码重置后，可以通过浏览器直接访问http://192.168.0.103/ ，nvr也一样。nvr和摄像头的密码可以不同。

rtsp流

rtsp://username:password@ip:port/cam/realmonitor?channel=1&subtype=0 
其中:

username: 用户名。例如admin。 
password: 密码。例如admin。 
ip: 为设备IP。例如 10.7.8.122。 
port: 端口号默认为554，若为默认可不填写。 
channel: 通道号（就是有几路摄像头，比如我的有4个），起始为1。例如通道2，则为channel=2。 
subtype: 码流类型，主码流为0（即subtype=0，这个一般清晰些），辅码流为1（即subtype=1）。 
如果不需认证，则用户名和密码无需指定，使用如下格式即可：

rtsp://ip:port/cam/realmonitor?channel=1&subtype=0
## 管理工具
pc版：https://www.dahuatech.com/service/downloadlists/840.html 下载乐橙PC客户端即可

手机版：“乐橙”app
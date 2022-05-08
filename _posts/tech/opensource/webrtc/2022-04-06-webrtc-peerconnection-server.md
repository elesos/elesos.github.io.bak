---
layout: post
title: WebRTC 源码解析之peerconnection_server
date: 2022-04-06 23:30:00 +0800
categories: [WebRTC]
tags: [WebRTC]
---



测试peerconnection_server， 运行后，打开server_test.html

fd_set fdset;
FD_ZERO(&fdset); /*将set清零使集合中不含任何fd，清空fdset与所有文件句柄的联系*/
FD_SET(fd, &fdset); /*将fd加入set集合，建立文件句柄fd与fdset的联系*/
FD_CLR(fd, &fdset); /*将fd从set集合中清除，清除文件句柄fd与fdset的联系*/
FD_ISSET(fd, &fdset); /*在调用select()函数后，用FD_ISSET来检测fd是否在set集合中，当检测到fd在set中则返回真，否则，返回假（0）*/
以上式子中的fd为socket句柄。

宏FD_SET设置文件描述符集fdset中对应于文件描述符fd的位(设置为1)，宏FD_CLR清除文件描述符集fdset中对应于文件描述符fd的位（设置为0），宏FD_ZERO清除文件描述符集fdset中的所有位(既把所有位都设置为0)。使用这3个宏在调用select前设置描述符屏蔽位，在调用select后使用FD_ISSET来检测文件描述符集fdset中对应于文件描述符fd的位是否被设置。



首先初始化



socket流程

tcp服务器：bind,listen,accept， udp的不需要listen和accept

tcp客户端：connect，udp不需要connect

示例里面是调用Create() 函数，创建套接字，Listen绑定并监听，.send()发送数据
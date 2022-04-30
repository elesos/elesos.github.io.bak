---
layout: post
title: SSH 服务 安装
date: 2022-04-30 05:30:00 +0800
categories: [SSH]
tags: [SSH]
---
## CentOS
```
yum search ssh
yum install openssh-server
service sshd status
```
## Ubuntu
判断是否安装ssh服务，可以通过如下命令进行：

ssh localhost
ssh: connect to host localhost port 22: Connection refused
如上所示，表示没有还没有安装：

apt-get install openssh-server
启动服务：

sudo /etc/init.d/ssh start  
ssh默认的端口是22,配置在/etc/ssh/sshd_config下, 先不注释22端口，而是在下面再加一行
```
Port 22
Port 50000
```
编辑防火墙配置启用50000端口。

这样SSH端口将同时工作在22和50000上。如果连接成功了，则再次编辑sshd_config的设置，将里边的Port22删除，即可。

之所以先设置成两个端口，测试成功后再关闭一个端口，是为了防止在修改conf的过程中，万一出现掉线、断网、误操作等未知情况时候，还能通过另外一个端口连接上去调试以免发生连接不上必须派人去机房，导致问题更加复杂麻烦。
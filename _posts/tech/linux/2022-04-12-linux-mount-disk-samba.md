---
layout: post
title: Linux 挂载 Windows上的硬盘
date: 2022-04-12 23:30:00 +0800
categories: [linux操作]
tags: [linux操作]
---

## Windows

先创建一个共享目录，高级共享，并修改权限为完全控制

## Linux

```
yum install samba
yum install samba-client    # smbclient   -L 192.168.100.111  -U win_user 列出win机器的共享资源 
mount -t cifs //172.30.xxx/share_ljh /home/xxx/share/ -o username=xxx,password=xxx
```
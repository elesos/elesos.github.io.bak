---
layout: post
title: VMware 安装 CentOS
date: 2022-04-30 05:30:00 +0800
categories: [VMware]
tags: [VMware]
---
配置VMware
点击“创建新的虚拟机”并且选择“自定义（高级）”

“硬件兼容性”选择当前最高的版本

继续，选择“我以后再安装操作系统”

选择“Linux”和“CentOS 64-bit”

后面大多默认即可。

网络类型：默认NAT，选择这个之后不用怎么设置就能上网了。如果设置为桥接则需要独立IP。

选择“Create a new virtual disk”

磁盘容量可以设置大一点。

然后为了拷贝方便，可以选择“Split virtual disk into multiple files”

最后点击“Customize Hardware...”,删除不常用的软驱和打印机。

## 安装CentOS
https://www.centos.org/download/ 下载Minimal IOS

点击“编辑虚拟机设置”，将光盘镜像加载进来:在cd那里选择Use ISO image file

然后点击“打开此虚拟机电源”

选择“Install CentOS 7”

安装完成首次进入系统后，运行shutdown -h now关机，去掉加载的iso镜像，然后将此时状态拍成快照，方便以后恢复。然后关闭VMware，将虚拟机文件打包备份，方便以后拷贝到其它机器上运行。

以后在本机也可以将此状态的虚拟机进行克隆。

配置桥接静态ip
注意虚拟机vmware本身也要设置桥接才行！
```
vim /etc/sysconfig/network-scripts/ifcfg-ens33 #https://gitee.com/elesos/assets/raw/master/2020/09/ifcfg-ens33

 
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
IPADDR=172.30.156.250   #指定ip地址,可参考局域网内其它机器ip地址信息。同时ping一下想要设置的ip，看看是否占用
NETMASK=255.255.255.0   #子网掩码
GATEWAY=172.30.156.1   #默认网关
DNS1=172.30.226.253   #DNS
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=2533e63a-e995-4032-8e42-007aee81e69b
DEVICE=ens33
ONBOOT=yes   #开机启动
```
不能有BOOTPROTO="dhcp"

查看ip: centos7:
```
ip addr
```
## 问题
首次安装后，无法上网： 在虚拟机上安装默认没有打开网卡, 网卡默认 onboot=”no”，需要改为 onboot=”yes”。
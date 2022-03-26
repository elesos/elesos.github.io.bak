---
layout: post
title: 如意云路由刷PandoraBox
date: 2015-10-24 23:30:00 +0800
categories: [路由器]
tags: [路由器]
---
本文可能已过时

## 准备固件

http://downloads.openwrt.org.cn/PandoraBox/RY-1/
此处用的是PandoraBox-ralink-ry1-r273-20140415.bin 艺搜下载
不要下载3M的PandoraBox-ralink-ry1-r286-20140417.bin
## 使用uboot刷机
拔掉路由器WAN口网线，电脑网线连接LAN口。
路由器断电后，用笔捅住reset键不放，然后给路由器上电后倒数10秒钟后再松开笔。
## 修改IP
将ip改为192.168.1网段

![](/assets/other/router/1.png)

## 开始刷写
打开浏览器(建议用firefox)输入192.168.1.1后上传固件“PandoraBox-ralink-ry1-r273-20140415.bin”进行升级。

![](/assets/other/router/2.png)

![](/assets/other/router/3.png)

![](/assets/other/router/4.png)



完成后，可以将电脑IP更改为自动获取。

然后按Ctrl+F5强制刷新192.168.1.1页面，即可看见如下图所示登录页面：

![](/assets/other/router/5.png)

其中用户名为root密码admin
## ssh登录
![](/assets/other/router/6.png)
## 刷回如意云
可以直接在“备份/升级”里选中如意云固件“xRouter_RY-1A_Build20140422_V1.5.1.8.bin”艺搜下载进行刷写。

![](/assets/other/router/7.png)

如何检测是否结束：可搜下无线网络，检测是否有“xRouter”类似的热点。
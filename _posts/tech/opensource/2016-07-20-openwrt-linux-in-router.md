---
layout: post
title: OpenWrt：路由器上的Linux
date: 2016-7-20 23:30:00 +0800
categories: [路由器]
tags: [路由器]
---
官网：https://openwrt.org/

适用于嵌入式设备的一个Linux发行版，可用来刷路由器。

相对原厂固件而言，OpenWrt不是一个单一、静态的固件，而是提供了一个可添加软件包的可写的文件系统。

这使用户可以自由的选择应用程序和配置，而不必受设备提供商的限制，并且可以使用一些适合某方面应用的软件包来定制你的设备。

对于开发者来说，OpenWrt是一个框架，开发者不必麻烦的构建整个固件就能得到想要的应用程序；对于用户来说，这意味着完全定制的能力，与以往不同的方式使用设备。

它是一个嵌入式的 Linux 发行版，（主流路由器固件有 dd-wrt,tomato,openwrt三类），而不是试图建立一个单一的、静态的系统。OpenWrt的包管理提供了一个完全可写的文件系统，从应用程序供应商提供的选择和配置，并允许您自定义的设备，以适应任何应用程序。

对于开发人员，OpenWrt 是使用框架来构建应用程序，而无需建立一个完整的固件来支持；对于用户来说，这意味着其拥有完全定制的能力，可以用前所未有的方式使用该设备。

而且OpenWRT支持各种处理器架构，无论是对ARM，X86，PowerPC或者MIPS都有很好的支持。 其多达3000多种软件包，囊括从工具链(toolchain)，到内核(linux kernel)，到软件包(packages)，再到根文件系统(rootfs)整个体系，使得用户只需简单的一个make命令即可方便快速地定制一个具有特定功能的嵌入式系统来制作固件。

鉴于开源软件在国内的发展态势，目前国内有基于OpenWRT改进而来的OpenWRT-DreamBox。这个版本的OpenWRT集成了很多常用功能（包括脱机下载等），而通过这个版本的OpenWRT便可以把一个路由器的功能发挥到淋漓尽致。

哪些路由器对OpenWrt支持较好？https://www.zhihu.com/question/30771491


国内的Pandorabox,前身是Dreambox


## 参考
http://zh.wikipedia.org/wiki/OpenWrt

http://baike.baidu.com/view/1671581.htm

https://www.zhihu.com/question/49787104
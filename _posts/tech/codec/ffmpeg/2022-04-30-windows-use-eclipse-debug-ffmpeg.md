---
layout: post
title: 1111
date: 2022-04-30 05:30:00 +0800
categories: [ffmpeg]
tags: [ffmpeg]
---
## 环境与软件
win7 32位

所有软件下载：关注公众号toprank520回复暗语 dq3f 获取下载链接，解压密码elesos

## 第一步：安装MinGW
安装mingw-get-inst-20120426.exe(安装时选中c++编译器和Mingw Developer Toolkit，其它默认)

https://gitee.com/elesos/assets/raw/master/2021/03/14.jpeg

https://gitee.com/elesos/assets/raw/master/2021/03/15.jpeg
## 第二步：配置编译环境
将yasm-1.2.0-win32.exe更名为yasm.exe后直接放在 /usr/local/bin（windows路径为C:\MinGW\msys\1.0\local\bin）

将下面3个压缩包里bin目录中的文件解压后放在/usr/local/bin下
 glib_2.28.8-1_win32.zip：GLib (Run-time)
 gettext-runtime_0.18.1.1-2_win32.zip：gettext-runtime (Run-time)
 pkg-config_0.26-1_win32.zip：pkg-config (tool)
配置好后，效果如下：

https://gitee.com/elesos/assets/raw/master/2021/03/16.jpeg
## 第三步：配置SDL
为了编译出ffplay，还需要配置SDL

下载编译好的SDL库文件SDL-devel-1.2.15-mingw32.rar并解压，

接下来无论是下载的还是自己编译的，都需要修改bin目录下的 sdl-config文件：

把 prefix=/usr/local/cross-tools/i686-w64-mingw32该成： prefix=c:/MinGW

并去掉2处-mwindows

解压后，将bin，include和lib目录下的文件分别拷贝到/usr/local对应目录下（注：直接拷贝include目录下的SDL文件夹），

为了编译时ffmpeg能识别SDL并开启 SDL support，需要将bin，include和lib目录下的文件再拷贝一份到C:\MinGW\的对应目录中。
## 第四步：编译
下一步开始编译,不编译shared版本

注：软件安装时统一加上--prefix=/usr/local
### 编译faac
 ./configure --prefix="/usr/local" --enable-static --disable-shared --with-mp4v2=no
 make
 make install
https://gitee.com/elesos/assets/raw/master/2021/03/17.jpeg
### 编译fdk-aac
configure FFmpeg时需要加上--enable-libfdk_aac
 ./configure --prefix="/usr/local" --disable-shared
 make
 make install
### 编译x264
 ./configure --prefix=/usr/local --enable-static --enable-shared
 make
 make install
### 配置ffmpeg
如果未配置SDL，需要添加--disable-ffplay，下面内容可以全部复制后粘贴到命令行中。
 PKG_CONFIG_PATH="/usr/local/lib/pkgconfig" LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" ./configure --enable-gpl \
  --disable-optimizations --disable-asm --enable-libfaac --enable-libfdk_aac \
  --enable-libx264 --enable-nonfree --enable-static --disable-shared
去掉-enable-shared --prefix=/usr/local选项，并加上--disable-optimizations --disable-asm选项

不用make
## 第五步：利用eclipse编译ffmpeg
eclipse运行需要先安装JRE；

打开eclipse：

File-New-C project,选择Makefile project下的Empty Project.右侧选Mingw GCC

https://gitee.com/elesos/assets/raw/master/2021/03/18.jpeg

再拷贝上面configure之后的ffmpeg源码到工程根目录下，F5刷新后选择Project-Build All.

https://gitee.com/elesos/assets/raw/master/2021/03/19.jpeg
## 第六步：调试FFmpeg
右键Binaries下的ffmpeg_g.exe选择Debug as->Local C/C++ Application，选择gdb/mi

https://gitee.com/elesos/assets/raw/master/2021/03/20.jpeg

设置调试参数需要先执行一遍上面的操作，然后右击ffmpeg_g.exe选Debug as-> Debug Configuration，
在Arguments选项卡的Program arguments方框里可以输入调试参数。

https://gitee.com/elesos/assets/raw/master/2021/03/21.jpeg

如果调试时ffmpeg导常终止，不能进入Main函数中，如下图所示：

https://gitee.com/elesos/assets/raw/master/2021/03/22.jpeg

请将x264动态链接库(C:\MinGW\msys\1.0\local\bin\libx264-129.dll)拷贝到工程根目录下。

再次调试结果如下：

https://gitee.com/elesos/assets/raw/master/2021/03/23.jpeg

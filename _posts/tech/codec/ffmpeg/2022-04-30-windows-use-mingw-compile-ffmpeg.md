---
layout: post
title: 在Windows下利用MinGW编译FFmpeg
date: 2022-04-30 05:30:00 +0800
categories: [FFmpeg]
tags: [FFmpeg]
---
## 环境与软件
win7 32位

所有软件下载：

https://gitee.com/elesos/assets/raw/master/2021/03/1.jpg

下载：关注公众号toprank520回复暗语 ia1t 获取下载链接，解压密码elesos

## 第一步：安装MinGW
安装mingw-get-inst-20120426.exe(安装时选中c++编译器和Mingw Developer Toolkit，其它默认)

https://gitee.com/elesos/assets/raw/master/2021/03/6.jpeg

https://gitee.com/elesos/assets/raw/master/2021/03/7.jpeg
## 第二步：配置编译环境
将yasm-1.2.0-win32.exe更名为yasm.exe后直接放在 /usr/local/bin（windows路径为C:\MinGW\msys\1.0\local\bin）

将下面3个压缩包里bin目录中的文件解压后放在/usr/local/bin下
 glib_2.28.8-1_win32.zip：GLib (Run-time)
 gettext-runtime_0.18.1.1-2_win32.zip：gettext-runtime (Run-time)
 pkg-config_0.26-1_win32.zip：pkg-config (tool)
配置好后，效果如下：

https://gitee.com/elesos/assets/raw/master/2021/03/8.jpeg
## 第三步：配置SDL
为了编译出ffplay，还需要配置SDL

下载编译好的SDL库文件SDL-devel-1.2.15-mingw32.rar并解压，

接下来无论是下载的还是自己编译的，都需要修改bin目录下的 sdl-config文件：

把 prefix=/usr/local/cross-tools/i686-w64-mingw32该成： prefix=c:/MinGW

并去掉2处-mwindows，原因见后面的附录。

解压后，将bin，include和lib目录下的文件分别拷贝到/usr/local对应目录下（注：直接拷贝include目录下的SDL文件夹），

为了编译时ffmpeg能识别SDL并开启 SDL support，需要将bin，include和lib目录下的文件再拷贝一份到C:\MinGW\的对应目录中。
## 第四步：编译
下一步开始编译,不编译shared版本

注：软件安装时统一加上--prefix=/usr/local
### 编译faac
 ./configure --prefix="/usr/local" --enable-static --disable-shared --with-mp4v2=no
 make
 make install
https://gitee.com/elesos/assets/raw/master/2021/03/9.jpeg
### 编译fdk-aac
configure FFmpeg时需要加上--enable-libfdk_aac
 ./configure --prefix="/usr/local" --disable-shared
 make
 make install
### 编译x264
 ./configure --prefix=/usr/local --enable-static --enable-shared
 make
 make install
### 编译ffmpeg
如果未配置SDL，需要添加--disable-ffplay
 PKG_CONFIG_PATH="/usr/local/lib/pkgconfig" LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" ./configure --enable-gpl  \
  --enable-libfaac --enable-libfdk_aac --enable-libx264 --enable-nonfree --enable-shared --prefix=/usr/local
去掉--disable-optimizations --disable-asm选项，并加上-enable-shared --prefix=/usr/local选项
 make 
 make install
执行结束后会在/usr/local/bin目录下生成：.dll和 .lib文件(如avformat-54.dll与avformat.lib)

https://gitee.com/elesos/assets/raw/master/2021/03/10.jpeg

在MinGW Shell输入ffmpeg结果如下图所示：

https://gitee.com/elesos/assets/raw/master/2021/03/11.jpeg

但如果在cmd中运行，会提示缺少pthread动态库：

https://gitee.com/elesos/assets/raw/master/2021/03/12.jpeg

请将pthreads-w32-2-9-1-release.zip解压后，将Pre-built.2/dll/x86下的pthreadGC2.dll放到ffmpeg所在目录即可。再次运行，结果如下所示：

https://gitee.com/elesos/assets/raw/master/2021/03/13.jpeg
## 附录
如果编译出来的ffmpeg运行后马上返回命令提示符，没有任何输出，输入ffmpeg -v

也什么信息都没有，连编译配置信息都没有。

原因：是因为SDL库导致的，修改sdl-config文件，去掉2处-mwindows 然后重新编译。

其它原因：需要你拷贝C:\MinGW\bin目录下的libiconv-2.dll到ffmpeg.exe所在目录。

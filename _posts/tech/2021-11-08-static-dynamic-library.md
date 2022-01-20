---
layout: post
title: 动态库与静态库介绍
date: 2021-11-08 20:43:44 +0800
categories: [艺搜科技,编程]
tags: [动态库]
---

# Mac 静态库，动态库与 Framework

静态库即静态链接库（Windows 下的 .lib，Linux 和 Mac 下的 .a）

动态库即动态链接库（Windows 下的 .dll，Linux 下的 .so，Mac 下的 .dylib/.tbd）

除了上面提到的 .a 和 .dylib/.tbd 之外，Mac OS/iOS 平台还可以使用 Framework。Framework 实际上是一种打包方式，将库的二进制文件，头文件和有关的资源文件打包到一起，方便管理和分发。

我们自己做出来的 Framework 哪怕是动态的，最后也还是要拷贝到 App 中

动态库的加载顺序

首先会加载系统级别的dylib, 目录在设备的/usr/lib/, 文件:libsqlite3.dylib、libc++.1.dylib... 然后加载系统级别的framework, 目录在设备的/System/Library/Frameworks, 文件:Foundation.framework 再引入runtime、gcd存放的dylib, 目录在设备的/usr/lib/, 文件:libSystem.B.dylib、libobjc.A.dylib 再引入自己注入的dylib, @executable_path/(目录存放在当前可执行文件底下)

在库刚出现的时候，我们将自己创建的 Library 提供给对方的时候，不仅需要将 .a 文件提供给对方，还需要同时提供 Header，用以开发人员在高级语言层面能够直观的使用该库提供的功能。后来，我们的模块越来越大，不仅仅包含代码文件，还加入了资源文件，Apple 引入了 framework 的概念用来将一个独立功能模块所需提供的内容打包提供。

A framework is a bundle (a structured directory) that contains a dynamic shared library along with associated resources, such as nib files, image files, and header files.

framework 本质上只是一种 Bundle 存在的形式，类似于一种目录结构，其并无动静之分。 内部包含的库文件，如果是静态库，其被称作为静态 Framework，如果内部为动态库，就被称作动态 Framework

## bundle

bundle 和 dylib 没有区别 一般类 Unix 系统叫做 .so 库，不过苹果官方建议叫做 .bundle



bundle 你可以理解就是mac里面的一种文件夹，有使用到图片、音视频等资源文件，可以将这些文件打包成.bundle文件供静态库使用。

framework 是库

**mac下有些动态库的快捷方式不能删除。因为默认链接时会用到。不会用到带版本号的库。**



# Windows 静态库lib和动态dll的区别

动态库的时候，编译后往往提供两个文件：一个引入库（.lib）文件（也称“导入库文件”）和一个DLL（.dll）文件。当然到了后面会告诉你如果只提供一个DLL文件，使用显示连接的方式也可以调用，只是稍加麻烦而已。

虽然引入库的后缀名也是“lib”，但是，动态库的引入库文件和静态库文件有着本质的区别。对一个DLL文件来说，其引入库文件（.lib）包含该DLL导出的函数和变量的符号名，而.dll文件包含该DLL实际的函数和数据。在使用动态库的情况下，在编译链接可执行文件时，只需要链接该DLL的引入库文件，该DLL中的函数代码和数据并不可复制到可执行文件，直到可执行程序运行时，才去加载所需的DLL，将该DLL映射到进程的地址空间中，然后访问DLL中导出的函数。


pdb文件

PDB文件是用来帮助软件的调试的。（Program Data Base），是VS编译链接时生成的文件。一般情况下PDB文件是在Debug模式下才会生成。


一个静态库sqlite3.a，被SensorSDk.dylib包含进去了。同时又被另一个VblUitls.dylib包含进去了。到时程序用到这2个dylib时会不会出问题啊.不会。


here is 2 kind of files with .lib extension :

the static library (for static linking) The import library (for dynamic linking)


how to tell if a .lib file is a static library or an import library of a .dll? 或者如何识别库是DEBUG还是RELEASE构建？

```
lib /LIST test.lib  里面有可能显示是Release还是Debug ，如zlibstatic.dir\Release\gzwrite.obj  或者用7zip打开压缩包看看
dumpbin /ARCHIVEMEMBERS test.lib
```

If it's a static library, lib will show you a pile of .obj files inside. Otherwise, it's am import lib.

如果lib单独存在，一般是静态库，如果跟dll在一起，那一一般是import lib

lib可能是动态库的import lib也可能是独立的静态库。windows上第3方库一般可通过cmake生成vs工程，然后进行编译。

如果不能用cmake生成vs工程，就需要自己写CMakeLists.txt才行

Run next command to compile: cl /c /EHsc sqlite3.c 其中/c选项是Compile without linking https://docs.microsoft.com/en-us/cpp/build/reference/cl-invokes-the-linker?view=msvc-160

Run next command to create static library: lib sqlite3.obj

# 静态库 动态库 常用操作

查看库的架构，平台

```
file libz.so.1.2.11
libz.so.1.2.11: ELF 32-bit LSB shared object, ARM, version 1 (SYSV), dynamically linked, not stripped   # ELF:Executable and Linkable Format可执行与可链接格式

objdump -f <file>
```

查看库依赖

```
ldd
readelf -d 你的程序 | grep NEEDED
```

mac上：

```
lipo -info libyuv.a 
```

在动态链接库中查找某一个函数是否存在:

```
nm -D yourLib.so |grep yourFunction

objdump -T *.so 
Mac ：
objdump -t Api.dylib | grep get_clientsign
```

.so files are dynamic libraries. The suffix stands for "shared object"

.a files are static libraries. The suffix stands for "archive", because they're actually just an archive (made with the ar command -- a predecessor of tar that's now just used for making libraries) of the original .o object files.

.la ('libtool' library )files are text files used by the GNU "libtools" package to describe the files that make up the corresponding library. It is a textual file that includes a description of the library.

by libtool allowing to understand what happens with:

```
Library dependencies
Actual file names
Library version and revision
```

参考

http://stackoverflow.com/questions/4514745/how-do-i-view-the-list-of-functions-a-linux-shared-library-is-exporting
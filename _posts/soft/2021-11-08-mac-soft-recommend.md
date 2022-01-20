---
layout: post
title: mac软件 推荐
date: 2021-11-08 20:51:11 +0800
categories: [艺搜软件]
tags: [软件]
---

### Best Notepad++ Alternatives for Mac

Atom [https://atom.io](https://atom.io/) https://www.macupdate.com/app/mac/53196/atom

Emacs https://www.gnu.org/software/emacs/

Brackets developed by Adobe http://brackets.io/

Visual Studio Code

参考

跨平台 https://www.guru99.com/notepad-plus-plus-alternative.html

https://www.macupdate.com/blog/post/81-notepad-plus-plus-alternative-for-mac



### Mac app contents folder

https://stackoverflow.com/questions/16747890/what-is-the-path-to-the-mac-osx-application-contents-folder

[[NSBundle mainBundle] bundlePath] will give you the path of the MyApp.app directory. You can then add Contents to that path.


http://blog.sina.com.cn/s/blog_6de000c20102v9ch.html

右键点击一个 App，在菜单中选择 Show Contents，则可以浏览 App 的内部结构。

_CodeSignature, CodeResources：一般为 Mac App Store 上架程序所包含。里面含有数字签名，以防止非法篡改。

Frameworks：一般放置了此程序所使用的第三方 Framework (使用的 Apple Framework 都包含在你的系统里)， 某种程度上，可以理解为 Windows 程序中的 dll 动态链接库。


Info.plist： 包含了一个程序的基本信息，比如最低系统版本要求，版本号，Copyright，等等标示。也可能包含程序的类型信息，比如这个文件如果含有一个 LSUIElement 并且值为 TRUE 的片段，则这个程序在执行后，不会在 Dock 上显示图标或图标下有表示此程序正在运行的小亮点。(当然，通过修改一个程序的 plist，添加 LSUIElement，则可以让一个程序运行时不在 Dock 上显示图标)。plist 是一个标准的 XML 文档，可以用任何文本编辑器修改。

MacOS 文件夹：则是包含了此应用程序的真正的可执行文件(类似 Windows 下的 exe 文件)，当然，一些程序可能包含不只一个的可执行文件。

PkgInfo 是一个可选的，8个字节长度的文件，可保存程序类型和创建者签名。(当然这些可以写在 Info.plist 中)。这个文件通常包含四字节的程序类型信息(通常为 APPL)和四个字节的签名信息，比如 System Preferences.app 的 PkgInfo 就是 APPLsprf。

Resources：顾名思义，就是资源文件，包含图标，图片，语言包，以及其它各种文件，这个没有严格的限制。


Mac App 的安装方式，常见的有，拖拽一个 App 文件到 Applications 文件夹完成安装。还有一种是后缀为 .pkg 文件的安装文件，这类安装方式是通过 Mac OS X Installer 解开 pkg 文件，按照 pkg 文件中的 BOM 文件的指令，将 pkg 文件中的内容安装到系统不同的位置上去。还有一类，.mpkg 格式的安装文件，这个和 .pkg 安装文件过程类似，只不过 .mpkg 指向的是一组 .pkg 文件的组合而已。


/System/Library 则是系统级别用用程序配置，数据的所在地，除非你特别明白每一个项目的作用，否则不要进行任何修改，一旦误操作，将会对系统产生致命后果。



### mac录屏

Screencast
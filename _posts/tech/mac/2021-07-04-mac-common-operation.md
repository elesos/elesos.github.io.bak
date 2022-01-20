---
layout: post
title: Mac常用操作
date: 2021-07-04 11:02:50 +0800
categories: [艺搜科技,操作系统]
tags: [mac]
---

# 截屏

同时按住以下三个按键：Shift、Command 和 4。如果在屏幕角落看到缩略图，请点按缩略图以编辑截屏。或者等待截屏存储到桌面。

# FTP 工具

ForkLift 考虑一下，AppStore 里，免费。而且可以从左右来回拖动很方便

FileZilla: open source,FileZilla Server is a free open source FTP and FTPS Server. https://sourceforge.net/projects/filezilla/

# 终端工具

https://iterm2.com/downloads.html

# 终端 跳到开头 结尾

```
vim里面 fn + leftArraw或fn + rightArrow
Ctrl+A：到行首（达到Home键的效果） Ctrl+E：到行尾（达到End键的效果）
```

# 切换tab 页面

切换标签页  按住Shift＋Command，然后按左、右箭头。

# 向后删除

向后删除（就像PC上键盘的delete），是按住【fn】再按【delete】

# 在当前目录打开终端

依次点击访达菜单上的访达-服务-服务偏好设置...,在列表中勾选上新建位于文件位置的终端窗口;


选中文件夹，右键列表中选中服务-新建位于文件位置的终端窗口;

缺陷，就是必须先选中某个文件夹，没办法在空白处点击打开。

# 显示隐藏文件

```
Cmd + Shift +。 （点）
```

如果您需要再次隐藏这些文件，您只需再次按下该组合即可。

# 最小化窗口快捷键

Command-H：隐藏最前面的应用的窗口。

https://support.apple.com/zh-cn/HT201236

# 剪切文件

选中文件，按“Command+C”复制，然后按“Command+Option+V”将其移动到目标目录。

其中Command对应windows键盘上的Windows键(键盘左下角Ctrl和Alt之间的那个)；Option对应windows键盘上的Alt键；

## 参考

https://sspai.com/post/28389 https://blog.csdn.net/qq_22122811/article/details/74626670

# 快速关闭显示器

按下键盘上的 Control+Shift+光驱弹出按钮（右上角）来快速关闭显示器。

当我们回来时，按下 Mac 键盘的任意键便可以重新激活系统。



# Mac path variable

```
 /etc/paths
```

cat ~/.zprofile

# Mac 联调测试

1， 先把自己的库生成一份最新的。

2，然后把库更新到依赖库的程序里面，生成新的程序A

3，把程序拷贝到桌面上。

4，在库工程上edit scheme,run, executeable里面选桌面的app

5，在build products path里面设置桌面程序的目录到app/conents/MacOS。

6，然后运行库工程就可以运行A进行联调了。

# Mac下Python多版本管理

```
brew install pyenv
```

查看当前激活的是那个版本的Python pyenv version 

查看已经安装了那些版本的Python pyenv versions 

安装指定版本的Python

pyenv install 3.5.0



安装完成后必须rehash

pyenv rehash

用local进行指定版本切换，一般开发环境使用。 pyenv local 2.7.10


pyenv uninstall 2.7.3
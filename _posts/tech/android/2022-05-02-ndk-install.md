---
layout: post
title: NDK 安装
date: 2022-05-02 05:30:00 +0800
categories: [ndk]
tags: [ndk]
---


下载，其中x86_64代表64位系统 https://dl.google.com/android/repository/android-ndk-r20-windows-x86_64.zip

r11c: https://dl.google.com/android/repository/android-ndk-r11c-windows-x86.zip #Windows 32-bit

https://dl.google.com/android/repository/android-ndk-r11c-windows-x86_64.zip #Windows 64-bit

https://dl.google.com/android/repository/android-ndk-r11c-linux-x86_64.zip #Linux 64-bit

https://dl.google.com/android/repository/android-ndk-r11c-darwin-x86_64.zip #Mac OS X 64-bit

## Linux
如果想要直接运行ndk-build命令

export NDK_ROOT=/home/soft/android-ndk-r9d
export PATH=$PATH:$NDK_ROOT
## 下载老版本
打开 https://archive.org/web/ 然后输入 http://developer.android.com/tools/sdk/ndk/index.html 然后选择日期，比如2013年的6月

r9d对应 

https://web.archive.org/web/20140715083043/https://developer.android.com/tools/sdk/ndk/index.html


ndk-build 命令在 r13 中默认使用 Clang。将在后续版本中移除 GCC。（参见r12b的公告）

## 参考
https://developer.android.com/ndk/downloads/

https://developer.android.com/ndk/downloads/revision_history

https://stackoverflow.com/questions/54785091/whats-the-use-of-llvm-in-android-ndk-toolchains
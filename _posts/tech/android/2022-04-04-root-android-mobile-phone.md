---
layout: post
title: Android手机root
date: 2022-04-04 23:30:00 +0800
categories: [Android]
tags: [Android]
---
## 红米6A
打开USB调试：全部参数->连续点击"miui版本"一栏，直到弹出“您已进入开发者模式”

先要解BL锁，BootLoader锁的简称，刷rec就是刷recovery

在开发者选项里面->设备解锁状态

http://www.miui.com/unlock/index.html 下载工具解锁

退出fastboot模式：按电源键
TWRP：TeamWin Recovery Project，是一个Recovery 工具，可以刷机，每款手机出厂的时候都会有一个rec，但是一般原厂的rec功能单一，不能满足我们的需求，所以需要刷入功能强大的第三方rec。

Fastboot模式：比recovery更底层的刷机模式（俗称引导模式），线刷, 进入快捷键：开机+音量减

recovery是一个小型Linux操作系统,类似于U盘重装系统时的WinPE,是一种卡刷，就是将包放在sd卡上，然后在recovery中刷机,音量加+开机键进入recovery

当你不能进入recovery的时候，不要紧张，你还能进fastboot, 所有的设备都存在Recovery， 但并非所有设备都提供Fastboot。
```
adb reboot bootloader //重启手机到Fastboot
fastboot flash recovery twrp-3.3.1-0-cactus.img //刷新recovery， https://twrp.me/xiaomi/xiaomiredmi6a.html，点击Americas或者Europe都可以跳到下载页面，下载到一个.img文件
fastboot reboot
```
先选语言，再Cancel就不用输入密码了

http://www.miui.com/download-348.html#497 注意选择上面的机型，下载刷机包
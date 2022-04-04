---
layout: post
title: 小米路由器刷openwrt
date: 2018-10-15 23:30:00 +0800
categories: [路由器]
tags: [路由器]
---
本文已验证成功。

Current Stable Release - OpenWrt 18.06.1，released on August, 18th 2018.


there is also a  PandoraBox (http://downloads.openwrt.org.cn/PandoraBox/Xiaomi-Mini-R1CM/stable/)firmware for Xiaomi Mini router. 我们暂时不用这个固件。
 

前提步骤：

1，保证有外网

2，电脑连上lan口



The next few steps involve first loading the development version of the firmware, 首先需要加载开发版固件

then loading a firmware version which provides SSH access with the last step being loading the OpenWRT firmware onto the router 然后加载提供了ssh的固件，用它去加载openwrt固件。



小米路由器MINI(R1CM)  can see this in web,  MiWiFi 稳定版 2.22.9



开启小米路由器的SSH功能之后用户可以获得root权限


## 小结
https://openwrt.org/toh/xiaomi/mini 页面打不开了，最新的不知是不是  https://openwrt.org/toh/xiaomi/miwifi_mini ?

u盘先格式成fat32，里面不要放任何文件

1，http://www1.miwifi.com/miwifi_download.html

下载开发固件升级miwifi.bin ，因为稳定版不能刷ssh固件

断开小米路由器的电源，将U盘插入USB接口；

按住reset按钮之后重新接入电源，指示灯变为黄色闪烁状态即可松开reset键；

等待3-5秒安装完成之后，小米路由器会自动重启

U盘记得及时拔出来

2，再格式化下u盘，用手机app连上刷了开发固件的路由器，

http://d.miwifi.com/rom/ssh（或者通过http://www1.miwifi.com/miwifi_open.html的开启ssh工具）下载ssh固件miwifi_ssh.bin

断开小米路由器的电源，将U盘插入USB接口；

按住reset按钮之后重新接入电源，指示灯变为黄色闪烁状态即可松开reset键；

等待3-5秒后安装完成之后，小米路由器会自动重启

wait a while

root@192.168.31.1  

U盘记得及时拔出来
```
BusyBox v1.19.4 (2018-06-21 09:07:05 UTC) built-in shell (ash)
Enter 'help' for a list of built-in commands.

 -----------------------------------------------------
       Welcome to XiaoQiang!
 -----------------------------------------------------
  $$$$$$\  $$$$$$$\  $$$$$$$$\      $$\      $$\        $$$$$$\  $$\   $$\
 $$  __$$\ $$  __$$\ $$  _____|     $$ |     $$ |      $$  __$$\ $$ | $$  |
 $$ /  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ /  $$ |$$ |$$  /
 $$$$$$$$ |$$$$$$$  |$$$$$\         $$ |     $$ |      $$ |  $$ |$$$$$  /
 $$  __$$ |$$  __$$< $$  __|        $$ |     $$ |      $$ |  $$ |$$  $$<
 $$ |  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ |  $$ |$$ |\$$\
 $$ |  $$ |$$ |  $$ |$$$$$$$$\       $$$$$$$$$  |       $$$$$$  |$$ | \$$\
 \__|  \__|\__|  \__|\________|      \_________/        \______/ \__|  \__|

are u ok
```

```
uname -a
Linux XiaoQiang 2.6.36 #1 MiWiFi-R1CM-2.21.109 Thu Jun 21 09:31:24 UTC 2018 mips GNU/Linux
```

## 最后刷openwrt
Get the latest firmware, eg: # cd /tmp; wget <link to firmware-image as shown above>
wget  http://downloads.openwrt.org/releases/18.06.1/targets/ramips/mt7620/openwrt-18.06.1-ramips-mt7620-miwifi-mini-squashfs-sysupgrade.bin

Check the MTD layout: # cat /proc/mtd
If you find a line “OS1” go ahead with flashing: 
```
# mtd -r write <firmware-image you downloaded> OS1
  mtd -r write /tmp/openwrt-18.06.1-ramips-mt7620-miwifi-mini-squashfs-sysupgrade.bin OS1
```
Unlocking OS1 ...

Writing from /tmp/openwrt-18.06.1-ramips-mt7620-miwifi-mini-squashfs-sysupgrade.bin to OS1 ...    
 
Rebooting ...


After flashing is complete, the router will reboot. When finished you can login using telnet or web-interface on a LAN-connected client（就是pc） to host 192.168.1.1. User: root, no password.

SSH will be enabled after you set a password (using passwd or LuCI web interface), telnet will be disabled.

Please note that the OpenWrt binary defaults to the red color of the led 默认红灯是正常的 instead of the orange/blue during and after finishing the boot.

如果ping 不通192.168.1.1等路由器一直红灯时再重启下即可

## 参考
http://en.miui.com/thread-64391-1-1.html 已404了


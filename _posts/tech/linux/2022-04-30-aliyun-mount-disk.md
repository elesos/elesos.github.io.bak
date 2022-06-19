---
layout: post
title: 阿里云Linux系统挂载数据盘
date: 2022-04-30 05:30:00 +0800
categories: [linux]
tags: [linux]
---
Linux云服务器数据盘未做分区和格式化，可以根据以下步骤进行分区以及格式化。
## 查看数据盘
在没有分区和格式化数据盘之前，使用 “df –h”命令是无法看到数据盘的，可以使用“fdisk -l”命令查看。如下图：

https://gitee.com/elesos/assets/raw/master/2021/03/1.jpeg

注：若您执行fdisk -l命令，发现没有 /dev/xvdb 表示您的云服务无数据盘，那么您无需进行挂载，此时本教程对您不适用。
==对数据盘进行分区==
执行 fdisk /dev/xvdb 命令，对数据盘进行分区； 根据提示，依次输入“n”，“p”“1”，两次回车，“wq”，分区就开始了，很快就会完成。

https://gitee.com/elesos/assets/raw/master/2021/03/2.jpeg
## 查看新的分区
使用“fdisk -l”命令可以看到新的分区xvdb1已经建立完成了。

https://gitee.com/elesos/assets/raw/master/2021/03/3.jpeg
## 格式化新分区
使用“mkfs.ext3 /dev/xvdb1”命令对新分区进行格式化，格式化的时间根据硬盘大小有所不同。 (也可自主决定选用 ext4 格式)
## 添加分区信息
使用
 echo '/dev/xvdb1  /mnt ext3    defaults    0  0' >> /etc/fstab

命令写入新分区信息。

然后使用“cat /etc/fstab”命令查看，出现以下信息就表示写入成功。

https://gitee.com/elesos/assets/raw/master/2021/03/4.jpeg

注： 如果需要把数据盘单独挂载到某个文件夹，可以修改以上命令中的/mnt部分
## 挂载新分区
使用“mount -a”命令挂载新分区，然后用“df -h”命令查看，出现以下信息就说明挂载成功，可以开始使用新的分区了。

https://gitee.com/elesos/assets/raw/master/2021/03/5.jpeg

## 其它
系统盘，重新初始化云盘后将恢复到镜像的初始状态。相当于重装系统了。

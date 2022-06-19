---
layout: post
title: 腾讯云 Linux 挂载数据盘
date: 2022-04-30 05:30:00 +0800
categories: [linux]
tags: [linux]
---
## 查看已挂载的硬盘
运行fdisk -l查看硬盘信息。

硬盘从未初始化时，需要先创建文件系统，

## 硬盘格式化
运行mkfs.ext4 device_name（/dev/vdb）命令格式化并创建 ext4 文件系统。也可以选择其他文件系统类型，如 ext3 。

## 挂载硬盘
建议用下面的自动挂载
```
mkdir /data/part1 -p  # 创建示例挂载点
mount /dev/vdc1 /data/part1 # 将vdc1挂载到/data/part1处
```
## 设置自动挂载
将分区信息添加到 /etc/fstab 中。如果没有添加则云服务器重启或重新开机后都不能自动挂载数据盘。
```
cp /etc/fstab /etc/fstab.backup
vi /etc/fstab
```
使用弹性云盘软链接（推荐）输入：
```
device_name                                                       mount_point     file_system_type     fs_mntops  fs_freq  fs_passno  
```
示例：
```
/dev/disk/by-id/virtio-disk-bm42ztpm-part1   /data/part1          ext3                     defaults,      nofail 0  1
```
执行 ls -l /dev/disk/by-id/ 命令，可以看到弹性云盘与设备名的对应关系

最后三个字段分别是文件系统安装选项、文件系统转储频率和启动时的文件系统检查顺序。一般使用示例中的值 (defaults,nofail 0 1)即可。

更多信息，输入 man fstab 查看。

运行 mount -a 命令，如果运行通过则说明文件正常，刚刚创建的文件系统会在下次启动时自动安装。

## 参考
https://cloud.tencent.com/document/product/362/6735
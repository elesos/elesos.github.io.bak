---
layout: post
title: Docker 常用操作
date: 2022-04-04 23:30:00 +0800
categories: [docker]
tags: [docker]
---
修改docker存储路径：

先查看当前位置：
```
docker info | grep "Docker Root Dir"
```
停止服务
```
service docker stop
或systemctl stop docker
```
然后移动整个/var/lib/docker目录到新的目录：
```
mv /var/lib/docker /data
ln -s /data/docker /var/lib
```
再启动docker

法二
如果要用overlay2驱动，得格式化数据目录，假设 /dev/sda9 挂载在/data目录上面
```
umount /dev/sda9     如果busy加-l参数
mkfs.xfs -f  -n ftype=1 /dev/sda9 //如果报mkfs.xfs:  contains a mounted filesystem，注释掉/etc/fstab里面相应行，重启.
```
格式化后 UUID会变，用 blkid /dev/sda9 查看uuid，然后替换/etc/fstab里面的uuid后，打开注释并执行：
```
mount -a
mkdir /etc/docker
vim /etc/docker/daemon.json 

{

 "storage-driver": "overlay2",

 "data-root": "/data/docker",

 "storage-opts": [

   "overlay2.override_kernel_check=true"

 ]

}
```
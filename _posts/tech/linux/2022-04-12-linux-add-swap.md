---
layout: post
title: Linux 增加虚拟内存
date: 2022-04-12 23:30:00 +0800
categories: [Linux操作]
tags: [Linux操作]
---

```
free -m //先看下Swap内存的情况
mkdir -p /var/_swap_
cd /var/_swap_
#1M * 1000 ~= 1GB of swap memory
dd if=/dev/zero of=swapfile bs=1M count=1000
mkswap swapfile
chmod 0600 swapfile
swapon swapfile
echo "/var/_swap_/swapfile none swap sw 0 0" >> /etc/fstab
free -m //可以看到Swap内存的变化
```
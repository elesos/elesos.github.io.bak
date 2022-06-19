---
layout: post
title: Linux 远程终端如何传输文件
date: 2022-04-12 23:30:00 +0800
categories: [linux操作]
tags: [linux操作]
---

```
yum install lrzsz -y
apt install lrzsz  #Ubuntu
```

传出来

```
sz filename
```

接收

```
rz -be
```
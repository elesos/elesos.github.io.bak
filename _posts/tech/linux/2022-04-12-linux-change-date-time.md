---
layout: post
title: Linux 如何修改日期和时间
date: 2022-04-12 23:30:00 +0800
categories: [linux操作]
tags: [linux操作]
---

先设置日期

```
date -s 20080103
```

再设置时间

```
date -s 18:24:30
```

为了永久生效，需要将修改的时间写入CMOS。

查看CMOS的时间：

```
clock -r 
```

将当前系统时间写到CMOS中去

```
clock -w
```
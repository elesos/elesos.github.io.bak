---
layout: post
title: Linux chmod命令 使用手册
date: 2022-04-12 23:30:00 +0800
categories: [linux命令]
tags: [linux命令]
---

权限分别是owner/group/others三种身份各自的read/write/execute权限：

```
r=4
w=2
x=1
```

最终权限通过累加得到， 例如当权限为： [rwxrwx---] 时：

```
owner = rwx = 4+2+1 = 7
group = rwx = 4+2+1 = 7
others= --- = 0+0+0 = 0
```

即权限也可以表示为770

u, g, o代表三种身份,a代表 all 即全部的身份

如果是10进制

```
256 128 64 | 32 16 8 | 4 2 1 =全部权限为511（=777）
r    w       r  w      r w  = 438
r    w   x   r     x   r   x= 493
```

windows上用ls看到的权限是错的。windows没有执行权限，但ls上依然显示，它的执行权限被w替代了
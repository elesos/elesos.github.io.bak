---
layout: post
title: Linux find命令
date: 2022-04-12 23:30:00 +0800
categories: [linux命令]
tags: [linux命令]
---

```
!number //运行第几条指令
```

如何清除history

```
history -c
```

禁用history

```
export HISTSIZE=0
```

历史命令都保存在.bash_history文件中，默认1000条，修改记录条数：

```
vim /etc/profile
export HISTSIZE=5000
export HISTFILESIZE=5000
```

加上时间戳：

```
export HISTTIMEFORMAT='%F %T '   这个效果是
2020-01-16 06:04:30 cat /etc/issue
```

或

```
HISTTIMEFORMAT="[%Y-%m-%d %H:%M:%S] "
```

让 history 不记住某些特定的命令：

```
export HISTCONTROL=ignorespace
```

并在运行命令时，在不想被记住的命令前面输入一个空格。

## 参考

https://linuxtoy.org/archives/history-command-usage-examples.html
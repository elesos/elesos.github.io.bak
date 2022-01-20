---
layout: post
title: Shell简明教程
date: 2021-08-17 13:37:33 +0800
categories: [艺搜科技,编程]
tags: [Shell]
---

## 逻辑运算符

```
&& ：如果这个命令执行成功 && 那么执行这个命令
|| ：如果这个命令执行失败了 || 那么就执行这个命令
[ -f "/etc/shadow" ] && echo "This computer uses shadow passwords"  #如果/etc/shadow文件存在，则打印，注意此时没有if关键字！
```

判断mailfolder是否可读，如果不可读则或操作生效，打印错误信息后脚本退出:

```
mailfolder=/var/spool/mail/james
[ -r "$mailfolder" ] || { echo "Can not read $mailfolder" ; exit 1; }
```

## 比较字符串

```
if [ "$VAR1" = "$VAR2" ]; then
   echo "字符串是相等的。"
else
   echo "字符串是不相等的。"
fi
```

## 常用功能

### 获得上级目录

```
path=$(dirname "$PWD")  上一级目录
path=$(dirname $(dirname "$PWD")) 上上级目录
```

## 特殊符号

自动化变量

- $@ 所有命令行的参数值。如果你运行showrpm a.rpm b.rpm c.rpm，那么 "$@"(有引号) 就包含 3 个字符串，即a.rpm, b.rpm和 c.rpm
- $* 传递给脚本或函数的所有参数
- $# 传递给脚本或函数的参数个数
- $0 当前脚本的文件名
- $n 传递给脚本或函数的参数。n是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2
- $? 上个命令的退出状态，或函数的返回值

## 常见问题

### Windows下怎么执行shell脚本

安装Git Bash，运行./test.sh执行

- 每个脚本都应该在文件开头加上set -e

用来控制脚本执行，只要有一行语句的执行出错就会退出。

```
set -e causes the shell to exit if any subcommand or pipeline returns a non-zero status.
set +x # all executed commands are printed to the terminal. 便于调试观察
```

- if [ $foo -ge 3 ]; 与if test $foo -ge 3; 是一样的，中括号可以用test代替。
- 假设有voipServer_control.sh，

```
filename=`basename $0`
BIN=${filename%_*} #BIN从filename中获取得到voipServer
```

- /bin/bash^M: bad interpreter: No such file or directory

```
sed -i -e 's/\r$//' scriptname.sh
```
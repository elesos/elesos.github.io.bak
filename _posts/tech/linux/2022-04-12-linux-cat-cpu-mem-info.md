---
layout: post
title: Linux 查看cpu与内存信息
date: 2022-04-12 23:30:00 +0800
categories: [Linux操作]
tags: [Linux操作]
---

假设cpu cores为4，physical id 有两个，core id有8个，siblings的值为8，总共有16个processor。

则2个物理处理器，每个处理器又有4个处理核心（cpu cores），每个cpu core又可划分为2个逻辑处理器，总共就有16个processor

![](/assets/linux/1.gif)


## 查看物理CPU个数

```
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l  
```

## 查看每个物理CPU中core的个数(即核数)

```
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

## 查看CPU信息（型号）

```
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```

## 查看使用CPU最多的10个进程

```
ps -aux | sort -k3nr | head -n 10  #或者top （然后按下大写P）
```

其中head 的

```
-n<行数> 显示的行数
```

## 查看内存信息

```
cat /proc/meminfo
```

查看使用内存最多的10个进程

```
ps -aux | sort -k4nr | head -n 10 # 或者top （然后按下大写M）
```

## ps

Process Status的缩写

linux上进程有5种状态:

```
1. 运行R (正在运行或在运行队列中等待) 
2. 中断S (休眠中, 受阻, 在等待某个条件的形成或接收到信号) 
3. 不可中断D  (收到信号不唤醒和不可运行, 进程必须等待直到有中断发生) 
4. 僵死Z  (进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放) 
5. 停止T  (进程收到SIGSTOP, SIGSTP, SIGTIN, SIGTOU信号后停止运行
```

ps输出格式:

```
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root     13333 14.3  0.4 325084 141932 ?       Sl   Aug16 867:37 ./transcoding
VSZ:使用掉的虚拟内存量 (Kbytes) 
RSS ：占用的固定内存量 (Kbytes)
TTY:在哪个终端上面运作，若与终端无关，则显示 ? tty1-tty6 是本机上面的登入者程序，若为 pts/0 等等的，则表示由网络连接进主机的程序。
STAT：该程序目前的状态
START：启动的时间
TIME ：实际使用CPU运作的时间
```

## top

第一行：

```
01:06:48 当前时间
up 63 days, 20:17 #系统运行时间，时间格式为时:分
3 users 当前登录用户数
load average: 0.06, 0.60, 0.48 #系统负载，三个数值分别为 1分钟、5分钟、15分钟前到现在的平均值。
```

第二行:进程信息

```
Tasks: 29 total 进程总数
1 running 正在运行的进程数
28 sleeping 睡眠的进程数
0 stopped 停止的进程数
0 zombie 僵尸进程数
```

第三行:CPU信息

```
Cpu(s): 0.3% us #用户空间占用CPU百分比
1.0% sy  #内核空间占用CPU百分比
0.0% ni #用户进程空间内改变过优先级的进程占用CPU百分比
98.7% id 空闲CPU百分比
0.0% wa 等待输入输出的CPU时间百分比
```

最后2行：内存信息

```
Mem: 191272k total 物理内存总量
17616k free 空闲内存总量
173656k used 使用的物理内存总量 
22052k buffers 用作内核缓存的内存量
Swap: 192772k total 交换区总量 
192772k free 空闲交换区总量
0k used 使用的交换区总量 
123988k cached 缓冲的交换区总量。
```

进程信息区：

```
PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND 
22447 root    20   0  148436   2308   1428 R   0.3  0.0   0:03.06 top          

PR 优先级
NI nice值。负值表示高优先级，正值表示低优先级
VIRT 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
RES 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
SHR 共享内存大小，单位kb
S 进程状态
TIME+ 进程使用的CPU时间
```

## 参考

https://blog.csdn.net/sycflash/article/details/6643492

http://blog.is36.com/check_top_of_linux_memory_CPU_in_process/

http://www.cnblogs.com/skyaspnet/archive/2010/12/29/1920350.html

http://blog.csdn.net/sanshiqiduer/article/details/1933625

http://www.cnblogs.com/peida/archive/2012/12/19/2824418.html
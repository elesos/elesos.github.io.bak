---
layout: post
title: CentOS 配置Yum源
date: 2022-04-30 05:30:00 +0800
categories: [linux]
tags: [linux]
---
注意:先下载wget再通过mv备份:

yum install wget -y
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
下载 repo：
```
cd /etc/yum.repos.d/
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo  # 网易163
mv CentOS6-Base-163.repo CentOS-Base.repo
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo #阿里云的
```
centos7的：

http://mirrors.163.com/.help/CentOS7-Base-163.repo
更新 cache

yum clean all  && yum makecache && yum update -y
## 参考
http://mirrors.163.com/.help/centos.html

http://mirrors.aliyun.com/help/centos
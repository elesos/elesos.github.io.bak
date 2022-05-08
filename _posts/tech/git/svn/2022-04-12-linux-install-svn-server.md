---
layout: post
title: Linux 搭建 SVN 服务器
date: 2022-04-12 23:30:00 +0800
categories: [Linux操作]
tags: [Linux操作]
---

svn不仅可以用于程序开发，还可以做很多事情，如备份文档

## 安装

```
yum install -y subversion //CentOS
apt-get install subversion //Ubuntu
```

## 建立项目

```
mkdir -p ~/svn            //建立svn根目录，用于存放多个项目
```

新建项目proj1：

```
svnadmin create ~/svn/proj1
```

再建立1个项目proj2：

```
svnadmin create ~/svn/proj2
```

## 配置

将proj1/conf下的authz、passwd和svnserve.conf拷贝至~/svn/根目录下进行修改

### 添加用户

注意：不需要在linux中添加用户

在passwd里添加用户后，也需要在authz里面添加用户！

### 权限

用于设置哪些用户可以访问哪些目录

```
vim ~/svn/authz 
[groups]
admin=test1
devteam1=test2,test3 //用户以逗号分隔
devteam2=test4

[/]
@admin=rw
*=

[proj1:/]
@devteam1=rw
*=

[proj2:/]
@devteam2=rw
*=
```

注： 用户名必须是“passwd”文件中已经定义的用户名

```
*=表示除了有权限的用户之外，其他任何人都禁止访问本目录。
```

配置svnserve.conf

```
[general]

anon-access=none     # 使非授权用户无法访问

auth-access=write    #使授权用户有写权限 

password-db=~/svn/passwd    #密码文件 

authz-db=~/svn/authz     #访问控制文件
```

以后建立的其它项目可以直接使用此配置，如：

```
cp ~/svn/svnserve.conf  ~/svn/proj2/conf/svnserve.conf
```

## 启动

```
svnserve -d -r ~/svn （注意不是~/svn/proj1，而是根目录）
```

-d表示以守护模式运行

svn默认监听3690端口，如果已经有svn在运行了，可以使用“--listen-port=”指定其它端口

```
svnserve -d -r  ~/svn/  --listen-port 3391
```

这样同一台服务器便可以运行多个svnserver了
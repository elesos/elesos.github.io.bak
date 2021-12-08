---
layout: post
title: 搭建git服务器
date: 2021-07-08 23:48:33.000000000 +09:00
categories: [git]
tags: [git]
---
## 本地服务器

```
git init --bare star.git
cd star.git
pwd
/c/Users/elesos/laravel_code/aa/star.git
```

then

```
git clone /c/Users/elesos/laravel_code/aa/star.git
```

## 在Linux上搭建git服务器

后面注释部分为Ubuntu平台

```
yum install git  #apt install git
```

创建一个git用户，用来运行git服务

```
useradd git  #adduser git
passwd git
```

先选定一个目录作为Git仓库，假定是/srv/sample.git，在/srv目录下输入命令：

```
git init --bare sample.git   #Git会创建一个裸仓库，裸仓库没有工作区，并且服务器上的Git仓库通常都以.git结尾。
chown -R git:git sample.git
```

将你的id_rsa.pub上传到git服务器，然后用cat命令将内容拷贝到授权文件authorized_keys中。

```
su git 
```

如果.ssh目录不存在，可以运行ssh-keygen -t rsa -C "yourname"

```
touch /home/git/.ssh/authorized_keys   #注意authorized_keys文件权限为git
cat id_ras.pub >> authorized_keys   #注意a single '>' will overwrite all the contents of the second file you specify. A double '>' will append it。
```

If you want to add others to your access list, they simply need to give you their id_rsa.pub key and you append it to the authorized keys file.一行一个 打开RSA认证

```
vim /etc/ssh/sshd_config
RSAAuthentication yes     
PubkeyAuthentication yes     
AuthorizedKeysFile  .ssh/authorized_keys
service sshd restart
```

现在，可以通过git clone命令克隆远程仓库了：

```
git clone git@server:/srv/sample.git
git clone git@192.168.8.34:/data/git/learngit.git
```

如果团队很小，把每个人的公钥收集起来放到服务器的/home/git/.ssh/authorized_keys文件里就是可行的。如果团队有几百号人，可以用Gitosis来管理公钥。

### 管理权限

有很多视源代码如生命，而且视员工为窃贼的公司，会在版本控制系统里设置一套完善的权限控制，每个人是否有读写权限会精确到每个分支甚至每个目录下。

因为Git是为Linux源代码托管而开发的，所以Git也继承了开源社区的精神，不支持权限控制。不过，因为Git支持钩子（hook），所以，可以在服务器端编写一系列脚本来控制提交等操作，达到权限控制的目的。Gitolite就是这个工具。

这里不介绍Gitolite了，不要把有限的生命浪费到权限斗争中。

### 权限参考

用户home目录755权限 rwx r-x r-x

.ssh目录700权限 rwx --- ---

authorized_keys 600权限 rx- --- ---

## 参考

https://github.com/elesos/progit/blob/master/zh/04-git-server/01-chapter4.markdown 有GitWeb的介绍

[https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E5%9C%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E6%90%AD%E5%BB%BA-Git](https://git-scm.com/book/zh/v2/服务器上的-Git-在服务器上搭建-Git)


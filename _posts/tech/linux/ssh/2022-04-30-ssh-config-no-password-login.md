---
layout: post
title: SSH配置免密登录
date: 2022-04-30 05:30:00 +0800
categories: [ssh]
tags: [ssh]
---
* authorized_keys文件的作用是什么？
用来做SSH免密码登录的，在客户端生成一个公钥和私钥，然后将公钥传至Linux服务端，保存到authorized_keys文件，这样，客户端在SSH远程登录的时候，就不需要输入密码验证了。

在a机器上

ssh-keygen -t rsa # ssh-keygen –b 2048 –t rsa  #过程中会要求输入密码，为了ssh访问过程无须密码，可以直接回车 
然后将pub内容复制到b机器的 ~/.ssh/authorized_keys（没有就创建）
```
chmod 600 ~/.ssh/authorized_keys
ssh-copy-id -i ~/.ssh/id_rsa.pub 172.29.0.89 
```
如果有端口：

ssh-copy-id -i ~/.ssh/id_rsa.pub "root@172.29.0.89 -p 60022"
之后就可以通过ssh 172.29.0.89而不用输入密码了。

如果想彼此都不用输入密码，就在另一台机器上执行相同的操作

参考
http://unix.stackexchange.com/questions/29401/is-it-possible-to-run-ssh-copy-id-on-port-other-than-22